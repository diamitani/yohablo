import { notFound } from "next/navigation"
import { PageHeader } from "@/components/page-header"
import { FlashcardSystem } from "@/components/flashcard-system"

// Sample flashcard data for different lessons
const FLASHCARD_DATA: Record<string, Array<{ id: string; word: string; pronunciation: string; category: string }>> = {
  numeros: [
    { id: "1", word: "Cero", pronunciation: "SEH-roh", category: "Numbers" },
    { id: "2", word: "Uno", pronunciation: "OO-noh", category: "Numbers" },
    { id: "3", word: "Dos", pronunciation: "dohs", category: "Numbers" },
    { id: "4", word: "Tres", pronunciation: "trehs", category: "Numbers" },
    { id: "5", word: "Cuatro", pronunciation: "KWAH-troh", category: "Numbers" },
    { id: "6", word: "Cinco", pronunciation: "SEEN-koh", category: "Numbers" },
    { id: "7", word: "Seis", pronunciation: "says", category: "Numbers" },
    { id: "8", word: "Siete", pronunciation: "see-EH-teh", category: "Numbers" },
    { id: "9", word: "Ocho", pronunciation: "OH-choh", category: "Numbers" },
    { id: "10", word: "Nueve", pronunciation: "noo-EH-veh", category: "Numbers" },
    { id: "11", word: "Diez", pronunciation: "dee-ehs", category: "Numbers" },
  ],
  colores: [
    { id: "1", word: "Rojo", pronunciation: "ROH-hoh", category: "Colors" },
    { id: "2", word: "Azul", pronunciation: "ah-SOOL", category: "Colors" },
    { id: "3", word: "Verde", pronunciation: "VEHR-deh", category: "Colors" },
    { id: "4", word: "Amarillo", pronunciation: "ah-mah-REE-yoh", category: "Colors" },
    { id: "5", word: "Negro", pronunciation: "NEH-groh", category: "Colors" },
    { id: "6", word: "Blanco", pronunciation: "BLAHN-koh", category: "Colors" },
    { id: "7", word: "Morado", pronunciation: "moh-RAH-doh", category: "Colors" },
    { id: "8", word: "Rosa", pronunciation: "ROH-sah", category: "Colors" },
    { id: "9", word: "Gris", pronunciation: "grees", category: "Colors" },
    { id: "10", word: "Marrón", pronunciation: "mah-ROHN", category: "Colors" },
  ],
  familia: [
    { id: "1", word: "Madre", pronunciation: "MAH-dreh", category: "Family" },
    { id: "2", word: "Padre", pronunciation: "PAH-dreh", category: "Family" },
    { id: "3", word: "Hermano", pronunciation: "ehr-MAH-noh", category: "Family" },
    { id: "4", word: "Hermana", pronunciation: "ehr-MAH-nah", category: "Family" },
    { id: "5", word: "Abuelo", pronunciation: "ah-BWEH-loh", category: "Family" },
    { id: "6", word: "Abuela", pronunciation: "ah-BWEH-lah", category: "Family" },
    { id: "7", word: "Tío", pronunciation: "TEE-oh", category: "Family" },
    { id: "8", word: "Tía", pronunciation: "TEE-ah", category: "Family" },
    { id: "9", word: "Primo", pronunciation: "PREE-moh", category: "Family" },
    { id: "10", word: "Prima", pronunciation: "PREE-mah", category: "Family" },
  ],
  lugares: [
    { id: "1", word: "Casa", pronunciation: "KAH-sah", category: "Places" },
    { id: "2", word: "Escuela", pronunciation: "ehs-KWEH-lah", category: "Places" },
    { id: "3", word: "Parque", pronunciation: "PAHR-keh", category: "Places" },
    { id: "4", word: "Tienda", pronunciation: "tee-EHN-dah", category: "Places" },
    { id: "5", word: "Hospital", pronunciation: "ohs-pee-TAHL", category: "Places" },
    { id: "6", word: "Biblioteca", pronunciation: "bee-blee-oh-TEH-kah", category: "Places" },
    { id: "7", word: "Restaurante", pronunciation: "rehs-tah-oo-RAHN-teh", category: "Places" },
    { id: "8", word: "Banco", pronunciation: "BAHN-koh", category: "Places" },
    { id: "9", word: "Cine", pronunciation: "SEE-neh", category: "Places" },
    { id: "10", word: "Iglesia", pronunciation: "ee-GLEH-see-ah", category: "Places" },
  ],
}

export default function FlashcardsPage({ params }: { params: { slug: string } }) {
  const flashcards = FLASHCARD_DATA[params.slug]

  if (!flashcards) {
    return notFound()
  }

  const lessonTitles: Record<string, string> = {
    numeros: "Numbers (Números)",
    colores: "Colors (Colores)",
    familia: "Family (Familia)",
    lugares: "Places (Lugares)",
  }

  const lessonTitle = lessonTitles[params.slug] || "Spanish Vocabulary"

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title={`${lessonTitle} Flashcards`}
        description="Practice vocabulary with these interactive flashcards. Click to flip and test your knowledge!"
      />
      <div className="mt-8">
        <FlashcardSystem lessonTitle={lessonTitle} flashcards={flashcards} />
      </div>
    </div>
  )
}

export function generateStaticParams() {
  return [{ slug: "numeros" }, { slug: "colores" }, { slug: "familia" }, { slug: "lugares" }]
}
