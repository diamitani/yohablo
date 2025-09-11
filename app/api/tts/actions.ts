"use server"

import { synthesizeSpeech, commonSpanishVoices } from "@/lib/services/google-tts-service"

// Pre-recorded audio mapping from the knowledge base
const AUDIO_FILES: Record<string, string> = {
  // Numbers
  cero: "/audio/numbers/cero.mp3",
  uno: "/audio/numbers/uno.mp3",
  dos: "/audio/numbers/dos.mp3",
  tres: "/audio/numbers/tres.mp3",
  cuatro: "/audio/numbers/cuatro.mp3",
  cinco: "/audio/numbers/cinco.mp3",
  seis: "/audio/numbers/seis.mp3",
  siete: "/audio/numbers/siete.mp3",
  ocho: "/audio/numbers/ocho.mp3",
  nueve: "/audio/numbers/nueve.mp3",
  diez: "/audio/numbers/diez.mp3",
  once: "/audio/numbers/once.mp3",
  doce: "/audio/numbers/doce.mp3",
  trece: "/audio/numbers/trece.mp3",
  catorce: "/audio/numbers/catorce.mp3",
  quince: "/audio/numbers/quince.mp3",
  dieciseis: "/audio/numbers/dieciseis.mp3",
  diecisiete: "/audio/numbers/diecisiete.mp3",
  dieciocho: "/audio/numbers/dieciocho.mp3",
  diecinueve: "/audio/numbers/diecinueve.mp3",
  veinte: "/audio/numbers/veinte.mp3",
  treinta: "/audio/numbers/treinta.mp3",
  cuarenta: "/audio/numbers/cuarenta.mp3",
  cincuenta: "/audio/numbers/cincuenta.mp3",
  sesenta: "/audio/numbers/sesenta.mp3",
  setenta: "/audio/numbers/setenta.mp3",
  ochenta: "/audio/numbers/ochenta.mp3",
  noventa: "/audio/numbers/noventa.mp3",
  cien: "/audio/numbers/cien.mp3",

  // Colors
  rojo: "/audio/colors/rojo.mp3",
  azul: "/audio/colors/azul.mp3",
  verde: "/audio/colors/verde.mp3",
  amarillo: "/audio/colors/amarillo.mp3",
  negro: "/audio/colors/negro.mp3",
  blanco: "/audio/colors/blanco.mp3",
  morado: "/audio/colors/morado.mp3",
  rosa: "/audio/colors/rosa.mp3",
  gris: "/audio/colors/gris.mp3",
  marrón: "/audio/colors/marron.mp3",
  anaranjado: "/audio/colors/anaranjado.mp3",

  // Pronouns
  yo: "/audio/pronouns/yo.mp3",
  tú: "/audio/pronouns/tu.mp3",
  él: "/audio/pronouns/el.mp3",
  ella: "/audio/pronouns/ella.mp3",
  nosotros: "/audio/pronouns/nosotros.mp3",
  vosotros: "/audio/pronouns/vosotros.mp3",
  ellos: "/audio/pronouns/ellos.mp3",
  ellas: "/audio/pronouns/ellas.mp3",
  usted: "/audio/pronouns/usted.mp3",
  me: "/audio/pronouns/me.mp3",
  te: "/audio/pronouns/te.mp3",
  lo: "/audio/pronouns/lo.mp3",
  la: "/audio/pronouns/la.mp3",
  nos: "/audio/pronouns/nos.mp3",
  los: "/audio/pronouns/los.mp3",
  las: "/audio/pronouns/las.mp3",

  // Places
  casa: "/audio/places/casa.mp3",
  escuela: "/audio/places/escuela.mp3",
  parque: "/audio/places/parque.mp3",
  tienda: "/audio/places/tienda.mp3",
  banco: "/audio/places/banco.mp3",
  iglesia: "/audio/places/iglesia.mp3",
  hospital: "/audio/places/hospital.mp3",
  restaurante: "/audio/places/restaurante.mp3",
  biblioteca: "/audio/places/biblioteca.mp3",
  cine: "/audio/places/cine.mp3",
  "oficina de correos": "/audio/places/oficina-correos.mp3",

  // Verbs
  hablar: "/audio/verbs/hablar.mp3",
  comer: "/audio/verbs/comer.mp3",
  vivir: "/audio/verbs/vivir.mp3",
  ser: "/audio/verbs/ser.mp3",
  estar: "/audio/verbs/estar.mp3",
  tener: "/audio/verbs/tener.mp3",
  hacer: "/audio/verbs/hacer.mp3",
  ir: "/audio/verbs/ir.mp3",
  caminar: "/audio/verbs/caminar.mp3",
  estudiar: "/audio/verbs/estudiar.mp3",
  beber: "/audio/verbs/beber.mp3",
  leer: "/audio/verbs/leer.mp3",
  escribir: "/audio/verbs/escribir.mp3",
  abrir: "/audio/verbs/abrir.mp3",
}

interface TTSRequest {
  text: string
  voice?: string
  languageCode?: string
  ssmlGender?: "FEMALE" | "MALE" | "NEUTRAL"
}

interface TTSResponse {
  success: boolean
  audioUrl?: string
  error?: string
  provider?: string
}

export async function generateTTS({
  text,
  voice = "es-US-Neural2-A",
  languageCode = "es-US",
  ssmlGender = "FEMALE",
}: TTSRequest): Promise<TTSResponse> {
  try {
    console.log(`Generating TTS for text: "${text}" with voice: ${voice}`)

    // Check if we have a pre-recorded file first
    const normalizedText = text.toLowerCase().trim()
    if (AUDIO_FILES[normalizedText]) {
      console.log(`Using pre-recorded audio for: ${normalizedText}`)
      return {
        success: true,
        audioUrl: AUDIO_FILES[normalizedText],
        provider: "pre_recorded",
      }
    }

    // Use Google Cloud TTS for dynamic generation
    const result = await synthesizeSpeech({
      text,
      voiceName: voice,
      languageCode,
      ssmlGender,
      audioEncoding: "MP3",
    })

    if (result.success) {
      return {
        success: true,
        audioUrl: result.audioUrl,
        provider: "google_cloud_tts",
      }
    } else {
      return {
        success: false,
        error: result.error || "TTS generation failed.",
        provider: "google_cloud_tts",
      }
    }
  } catch (error) {
    console.error("Error in generateTTS action:", error)
    return {
      success: false,
      error: `Failed to generate TTS: ${error instanceof Error ? error.message : "Unknown error"}`,
      provider: "google_cloud_tts",
    }
  }
}

export async function getAvailableVoices(): Promise<{ id: string; name: string; provider: string }[]> {
  return commonSpanishVoices.map((voice) => ({
    id: voice.name,
    name: `${voice.name.includes("ES") ? "Spain" : voice.name.includes("MX") ? "Mexico" : "US"} ${voice.gender === "FEMALE" ? "Female" : "Male"}`,
    provider: "google",
  }))
}

export async function generateVocabularyAudio(
  word: string,
  languageCode = "es-US",
  voiceName?: string,
): Promise<TTSResponse> {
  try {
    console.log(`Generating vocabulary audio for word: "${word}"`)
    const selectedVoice = voiceName || "es-US-Neural2-A"
    const gender = selectedVoice.includes("Neural2-A") ? "FEMALE" : "MALE"

    return await generateTTS({
      text: word,
      voice: selectedVoice,
      languageCode: languageCode,
      ssmlGender: gender as "FEMALE" | "MALE" | "NEUTRAL",
    })
  } catch (error) {
    console.error("Error generating vocabulary audio:", error)
    return {
      success: false,
      error: `Failed to generate vocabulary audio: ${error instanceof Error ? error.message : "Unknown error"}`,
    }
  }
}

export const generateVocabularyTTS = generateVocabularyAudio
