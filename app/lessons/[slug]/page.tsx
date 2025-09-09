import { notFound } from "next/navigation"
import { PageHeader } from "@/components/page-header"
import { LessonDetail } from "@/components/lesson-detail"

// Define the lesson data structure
interface Lesson {
  id: string
  slug: string
  title: string
  description: string
  content: string
  image: string
  category: string
  level: string
  duration: string
  vocabulary: Array<{
    word: string
    translation: string
    pronunciation: string
  }>
}

// Sample lesson data
const LESSONS: Record<string, Lesson> = {
  "colors-colores": {
    id: "colors-colores",
    slug: "colors-colores",
    title: "Colors (Colores)",
    description: "Learn the names of colors in Spanish through hip-hop music",
    content: `
      # Colors in Spanish (Colores)
      
      This lesson teaches you the names of colors in Spanish through a catchy hip-hop song.
      
      ## Vocabulary
      
      - Rojo = Red
      - Azul = Blue
      - Verde = Green
      - Amarillo = Yellow
      - Negro = Black
      - Blanco = White
      - Morado = Purple
      - Rosa = Pink
      - Gris = Gray
      - Marrón = Brown
      
      ## Song Lyrics
      
      Chorus:
      Colores, colores, coloooooores
      You using English words for colors, man noooo way
      Colores, colores, coloooooores
      They call us negros but we getting free toooooday
      
      Verse:
      I'm teaching them colors in Spanish, wax on, wax off man I'm Mr. Miagi
      Verde my money is green, and I'm not talking Monopoly
      Negro - black is what they call me cuz they fear me
      Azul - bluer than the ocean that helps me think and see clearly
      Blanco - like white paper I use when I gotta print
      Morado - grapes, violets, plums, Wildcats we getting it
      Anaranjado - like oranges in Florida, man yum yum yum
      Rojo - for roses, strawberries, stop signs and fi-re trucks
      She love learning bout los colores
      Marrón for pecans, and almonds, and wheat bread, and pretzels, on my plate
      Amarillo for the sun shining and ripe bananas man
      Gris for gray sharks, silver metals, African elephants
      Rosado for pink she's blushing as I erase those pains away
    `,
    image: "/spanish-colors-rainbow-lesson.png",
    category: "Vocabulary",
    level: "Beginner",
    duration: "30 minutes",
    vocabulary: [
      { word: "Rojo", translation: "Red", pronunciation: "ROH-hoh" },
      { word: "Azul", translation: "Blue", pronunciation: "ah-SOOL" },
      { word: "Verde", translation: "Green", pronunciation: "VEHR-deh" },
      { word: "Amarillo", translation: "Yellow", pronunciation: "ah-mah-REE-yoh" },
      { word: "Negro", translation: "Black", pronunciation: "NEH-groh" },
      { word: "Blanco", translation: "White", pronunciation: "BLAHN-koh" },
      { word: "Morado", translation: "Purple", pronunciation: "moh-RAH-doh" },
      { word: "Rosa", translation: "Pink", pronunciation: "ROH-sah" },
      { word: "Gris", translation: "Gray", pronunciation: "grees" },
      { word: "Marrón", translation: "Brown", pronunciation: "mah-ROHN" },
    ],
  },
  "numbers-numeros": {
    id: "numbers-numeros",
    slug: "numbers-numeros",
    title: "Numbers (Números)",
    description: "Learn to count in Spanish with this hip-hop lesson",
    content: `
      # Numbers in Spanish (Números)
      
      This lesson teaches you how to count in Spanish through a catchy hip-hop song.
      
      ## Vocabulary
      
      - Cero = 0
      - Uno = 1
      - Dos = 2
      - Tres = 3
      - Cuatro = 4
      - Cinco = 5
      - Seis = 6
      - Siete = 7
      - Ocho = 8
      - Nueve = 9
      - Diez = 10
      
      ## Song Lyrics
      
      Yeah....uh...sí sí sí sí SÍ.
      Sr. Hill up in here...dig it.
      We bout to learn a thing or two, or three, or four...
      Spanish words for number you didn't know...
      
      Cero, that's zero or nothing
      Número uno in Spanish, no bluffin'
      Claiming king, but you dos, man why you frontin'?
      Tres years of law school, I'll teach you somethin'
      Cuatro semesters in the CPT
      Had cinco students stay and help grade papers for me
      Turned in my grades at seis, at home by siete
      Slept ocho hours dreamed my students got nueve...
      ...out of diez...something I love to see
    `,
    image: "/spanish-numbers-lesson.png",
    category: "Vocabulary",
    level: "Beginner",
    duration: "30 minutes",
    vocabulary: [
      { word: "Cero", translation: "Zero", pronunciation: "SEH-roh" },
      { word: "Uno", translation: "One", pronunciation: "OO-noh" },
      { word: "Dos", translation: "Two", pronunciation: "dohs" },
      { word: "Tres", translation: "Three", pronunciation: "trehs" },
      { word: "Cuatro", translation: "Four", pronunciation: "KWAH-troh" },
      { word: "Cinco", translation: "Five", pronunciation: "SEEN-koh" },
      { word: "Seis", translation: "Six", pronunciation: "says" },
      { word: "Siete", translation: "Seven", pronunciation: "see-EH-teh" },
      { word: "Ocho", translation: "Eight", pronunciation: "OH-choh" },
      { word: "Nueve", translation: "Nine", pronunciation: "noo-EH-veh" },
      { word: "Diez", translation: "Ten", pronunciation: "dee-ehs" },
    ],
  },
  "neighborhood-barrio": {
    id: "neighborhood-barrio",
    slug: "neighborhood-barrio",
    title: "Neighborhood Places (El Barrio)",
    description: "Learn vocabulary for places in a neighborhood through hip-hop",
    content: `
      # Neighborhood Places in Spanish (El Barrio)
      
      This lesson teaches you vocabulary for places in a neighborhood through a catchy hip-hop song.
      
      ## Vocabulary
      
      - La casa = House
      - La tienda = Store
      - El parque = Park
      - La escuela = School
      - La biblioteca = Library
      - El restaurante = Restaurant
      - El hospital = Hospital
      - El banco = Bank
      - El cine = Movie theater
      - La iglesia = Church
      
      ## Song Lyrics
      
      Chorus:
      The corner (x4), teaching places students can see around my corner
      Ahora (x4), estamos en la esquina que vengan ahora
      The corner (x4), teaching places students can see around my corner
      Ahora (x4), estamos en la esquina ahora
      
      Verse:
      Random buildings here and there, edificios
      Me and my boys go shopping, la tienda
      Me and T Dott shoot shots at el parque
      La iglesia, church, He always got me bro (prayers up)
      Carver is la escuela where I put all my plata (that's money)
      You ballin' in New York, living in la casa (that's house)
      Where I live is mi casa
      El apartamento - solo, solo, solo, solooooooooo!
      Wanted to eat, so al restaurante yo vineeee
      Saw a movie, peeped that Get Out up in el cine
      For when I'm mailing that mail, I go to la oficina de correos
      La biblioteca is where, I went to buy books bro
      Drinking that te gotta go alla en la cafetería
      Can't buy no books? La biblioteca is that way!
    `,
    image: "/spanish-city-neighborhood-lesson.png",
    category: "Vocabulary",
    level: "Beginner",
    duration: "30 minutes",
    vocabulary: [
      { word: "La casa", translation: "House", pronunciation: "lah KAH-sah" },
      { word: "La tienda", translation: "Store", pronunciation: "lah tee-EN-dah" },
      { word: "El parque", translation: "Park", pronunciation: "el PAR-keh" },
      { word: "La escuela", translation: "School", pronunciation: "lah es-KWAY-lah" },
      { word: "La biblioteca", translation: "Library", pronunciation: "lah bee-blee-oh-TEH-kah" },
      { word: "El restaurante", translation: "Restaurant", pronunciation: "el res-tow-RAN-teh" },
      { word: "El hospital", translation: "Hospital", pronunciation: "el os-pee-TAL" },
      { word: "El banco", translation: "Bank", pronunciation: "el BAN-koh" },
      { word: "El cine", translation: "Movie theater", pronunciation: "el SEE-neh" },
      { word: "La iglesia", translation: "Church", pronunciation: "lah ee-GLEH-see-ah" },
    ],
  },
}

export default function LessonPage({ params }: { params: { slug: string } }) {
  const lesson = LESSONS[params.slug]

  if (!lesson) {
    return notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title={lesson.title} description={lesson.description} />
      <div className="mt-8">
        <LessonDetail lesson={lesson} />
      </div>
    </div>
  )
}

export function generateStaticParams() {
  return Object.keys(LESSONS).map((slug) => ({ slug }))
}
