export interface WorksheetQuestion {
  id: string
  question: string
  answer: string
  type: "fill-blank" | "multiple-choice"
  options?: string[]
}

export interface WorksheetData {
  title: string
  content: WorksheetQuestion[]
  type: string
}

export const worksheetData: Record<string, WorksheetData> = {
  numeros: {
    title: "Numbers (0 to 101) - Fill in the Blanks",
    type: "Fill-in-the-Blank",
    content: [
      {
        id: "1",
        question: "(1) _______________, that's zero or nothing",
        answer: "cero",
        type: "fill-blank",
      },
      {
        id: "2",
        question: "Número (2) _______________ in Spanish, no bluffin'",
        answer: "uno",
        type: "fill-blank",
      },
      {
        id: "3",
        question: "Claiming king, but you (3) ______________, man why you frontin'?",
        answer: "dos",
        type: "fill-blank",
      },
      {
        id: "4",
        question: "(4) _______________ years of law school, I'll teach you somethin'",
        answer: "tres",
        type: "fill-blank",
      },
      {
        id: "5",
        question: "(5) ____________________ semesters in the CPT",
        answer: "cinco",
        type: "fill-blank",
      },
      {
        id: "6",
        question: "Had (6) _____________________ students stay and help grade papers for me",
        answer: "seis",
        type: "fill-blank",
      },
      {
        id: "7",
        question: "Turned in my grades at (7) ________________, at home by (8) ______________________",
        answer: "siete",
        type: "fill-blank",
      },
      {
        id: "8",
        question: "at home by (8) ______________________",
        answer: "ocho",
        type: "fill-blank",
      },
      {
        id: "9",
        question: "Slept (9) ___________________ hours dreamed my students got (10) ____________________...",
        answer: "nueve",
        type: "fill-blank",
      },
      {
        id: "10",
        question: "dreamed my students got (10) ____________________...",
        answer: "diez",
        type: "fill-blank",
      },
    ],
  },
  colores: {
    title: "Colors (Colores) - Fill in the Blanks",
    type: "Fill-in-the-Blank",
    content: [
      {
        id: "1",
        question: "(1) _____________________ my money is green, and I'm not talking Monopoly",
        answer: "verde",
        type: "fill-blank",
      },
      {
        id: "2",
        question: "(2) _____________________- black is what they call me cuz they fear me",
        answer: "negro",
        type: "fill-blank",
      },
      {
        id: "3",
        question: "(3) _____________________ - bluer than the ocean that helps me think and see clearly",
        answer: "azul",
        type: "fill-blank",
      },
      {
        id: "4",
        question: "(4) _____________________ - like white paper I use when I gotta print",
        answer: "blanco",
        type: "fill-blank",
      },
      {
        id: "5",
        question: "(5) _____________________ - grapes, violets, plums, Wildcats we getting it",
        answer: "morado",
        type: "fill-blank",
      },
      {
        id: "6",
        question: "(6) _____________________- like oranges in Florida, man yum yum yum",
        answer: "anaranjado",
        type: "fill-blank",
      },
      {
        id: "7",
        question: "(7) _____________________ - for roses, strawberries, stop signs and fi-re trucks",
        answer: "rojo",
        type: "fill-blank",
      },
      {
        id: "8",
        question: "(8) _____________________ for pecans, and almonds, and wheat bread, and pretzels, on my plate",
        answer: "marrón",
        type: "fill-blank",
      },
      {
        id: "9",
        question: "(9) _____________________ for the sun shining and ripe bananas man",
        answer: "amarillo",
        type: "fill-blank",
      },
      {
        id: "10",
        question: "(10) _____________________ for gray sharks, silver metals, African elephants",
        answer: "gris",
        type: "fill-blank",
      },
    ],
  },
  food: {
    title: "Time to Eat (Ya Comí) - Fill in the Blanks",
    type: "Fill-in-the-Blank",
    content: [
      {
        id: "1",
        question: "(1) _______________ is breakfast, gotta start my day right",
        answer: "desayuno",
        type: "fill-blank",
      },
      {
        id: "2",
        question: "Tengo (2) _______________ a comer, that's a smoothie delight",
        answer: "ganas",
        type: "fill-blank",
      },
      {
        id: "3",
        question: "(3) _______________ (strawberries), (4) __________________ (apples) too",
        answer: "fresas",
        type: "fill-blank",
      },
      {
        id: "4",
        question: "(4) __________________ (apples) too",
        answer: "manzanas",
        type: "fill-blank",
      },
      {
        id: "5",
        question: "(5) _____________________ (raspberries), I love my fruits",
        answer: "frambuesas",
        type: "fill-blank",
      },
      {
        id: "6",
        question: "(6) ______________________, or vegetables, for my saaaaaalad.",
        answer: "verduras",
        type: "fill-blank",
      },
      {
        id: "7",
        question: "Or (7) ______________________, with spinach that (8) ______________________.",
        answer: "espinacas",
        type: "fill-blank",
      },
      {
        id: "8",
        question: "with spinach that (8) ______________________.",
        answer: "me gusta",
        type: "fill-blank",
      },
      {
        id: "9",
        question: "(9) ______________________, carrots, you know that I need a lotta",
        answer: "zanahorias",
        type: "fill-blank",
      },
      {
        id: "10",
        question: "(10) ______________________ (cucumbers) and (11) ______________________ (oranges)",
        answer: "pepinos",
        type: "fill-blank",
      },
    ],
  },
  prepositions: {
    title: "Prepositions (We in There Tho) - Fill in the Blanks",
    type: "Fill-in-the-Blank",
    content: [
      {
        id: "1",
        question: "(1) ________________________ is behind, (2) ________________________ below",
        answer: "detrás",
        type: "fill-blank",
      },
      {
        id: "2",
        question: "(2) ________________________ below",
        answer: "debajo",
        type: "fill-blank",
      },
      {
        id: "3",
        question: "(3) ________________________ is in, yo we in there tho",
        answer: "en",
        type: "fill-blank",
      },
      {
        id: "4",
        question: "First we start with (4) ________________________ or (5) ________________________.",
        answer: "en",
        type: "fill-blank",
      },
      {
        id: "5",
        question: "or (5) ________________________.",
        answer: "dentro",
        type: "fill-blank",
      },
      {
        id: "6",
        question: "(6) ________________________ for one thing, (7) ________________________ for more like 4, 5...",
        answer: "en",
        type: "fill-blank",
      },
      {
        id: "7",
        question: "(7) ________________________ for more like 4, 5...",
        answer: "entre",
        type: "fill-blank",
      },
      {
        id: "8",
        question: "Throw in the preposition followed by (8) ________________________, now let's start.",
        answer: "el",
        type: "fill-blank",
      },
      {
        id: "9",
        question: "(9) ________________________is near, (10) ________________________ far away.",
        answer: "cerca",
        type: "fill-blank",
      },
      {
        id: "10",
        question: "(10) ________________________ far away.",
        answer: "lejos",
        type: "fill-blank",
      },
    ],
  },
  house: {
    title: "House & Rooms (Chill en Mi Casa) - Fill in the Blanks",
    type: "Fill-in-the-Blank",
    content: [
      {
        id: "1",
        question: "Come into my house, (1) ____________________",
        answer: "casa",
        type: "fill-blank",
      },
      {
        id: "2",
        question: "Fenced in entrance, (2) ____________________",
        answer: "entrada",
        type: "fill-blank",
      },
      {
        id: "3",
        question: "Walk through the door, or (3) ____________________",
        answer: "puerta",
        type: "fill-blank",
      },
      {
        id: "4",
        question: "Shoes go on the rug, or (4) ____________________",
        answer: "alfombra",
        type: "fill-blank",
      },
      {
        id: "5",
        question: "Walk into (5) ____________________, the kitchen",
        answer: "cocina",
        type: "fill-blank",
      },
      {
        id: "6",
        question: "In (6) ____________________, or oven, a chicken",
        answer: "horno",
        type: "fill-blank",
      },
      {
        id: "7",
        question: "Set up the table, (7) ____________________",
        answer: "mesa",
        type: "fill-blank",
      },
      {
        id: "8",
        question: "I'm a sit in (8) ____________________",
        answer: "silla",
        type: "fill-blank",
      },
      {
        id: "9",
        question: "(9) _________________________, that's the fridge next to the freezer",
        answer: "refrigerador",
        type: "fill-blank",
      },
      {
        id: "10",
        question: "Next the living room, call it (10) _________________________",
        answer: "sala",
        type: "fill-blank",
      },
    ],
  },
  family: {
    title: "Family (Meet the Fam Bam) - Fill in the Blanks",
    type: "Fill-in-the-Blank",
    content: [
      {
        id: "1",
        question: "Meet the fam bam, (1) _________________________________",
        answer: "familia",
        type: "fill-blank",
      },
      {
        id: "2",
        question: "I love my sisters man, those (2) _________________________________",
        answer: "hermanas",
        type: "fill-blank",
      },
      {
        id: "3",
        question: "Meet the fam bam, (3) _________________________________",
        answer: "familia",
        type: "fill-blank",
      },
      {
        id: "4",
        question: "I love my brothers man, those (4) _________________________________",
        answer: "hermanos",
        type: "fill-blank",
      },
      {
        id: "5",
        question: "Peace to my heart, my mom, (5) _________________________________",
        answer: "madre",
        type: "fill-blank",
      },
      {
        id: "6",
        question: "Debate politics with my dad, (6) _________________________________",
        answer: "padre",
        type: "fill-blank",
      },
      {
        id: "7",
        question: "Two older brothers, those are (7) _________________________________",
        answer: "hermanos",
        type: "fill-blank",
      },
      {
        id: "8",
        question: "Far as sisters, (8) _________________________________, yeah I got four",
        answer: "hermanas",
        type: "fill-blank",
      },
      {
        id: "9",
        question: "Mad (9) _________________________________ or uncles, but none of them named Tom",
        answer: "tíos",
        type: "fill-blank",
      },
      {
        id: "10",
        question: "My closest (10) _________________________________ or aunts were sisters of my mom",
        answer: "tías",
        type: "fill-blank",
      },
    ],
  },
  weather: {
    title: "Weather (¿Qué Qué Qué?) - Fill in the Blanks",
    type: "Fill-in-the-Blank",
    content: [
      {
        id: "1",
        question: "It's feeling like a real hot day, (1) ___________________________",
        answer: "hace calor",
        type: "fill-blank",
      },
      {
        id: "2",
        question: "We need that (2) ___________________________",
        answer: "lluvia",
        type: "fill-blank",
      },
      {
        id: "3",
        question: "It's chilla in K thrilla, (3) ___________________________",
        answer: "hace frío",
        type: "fill-blank",
      },
      {
        id: "4",
        question: "In the Chi, windy city, (4) ___________________________",
        answer: "hace viento",
        type: "fill-blank",
      },
      {
        id: "5",
        question: "[Voice 1:] 'Yo, yo this weather wack!' (5) ______________________________________________________",
        answer: "hace mal tiempo",
        type: "fill-blank",
      },
      {
        id: "6",
        question: "[Voice 2:] 'Summertiiime is back!' (6) ______________________________________________________",
        answer: "hace buen tiempo",
        type: "fill-blank",
      },
      {
        id: "7",
        question: "When the sun is in the sky, (7) ___________________________",
        answer: "hace sol",
        type: "fill-blank",
      },
      {
        id: "8",
        question: "(8) ___________________________ is summer time, fall is (9) ___________________________",
        answer: "verano",
        type: "fill-blank",
      },
      {
        id: "9",
        question: "fall is (9) ___________________________",
        answer: "otoño",
        type: "fill-blank",
      },
      {
        id: "10",
        question: "All that (10) ___________________________ in the sky, yeah we call that snow",
        answer: "nieve",
        type: "fill-blank",
      },
    ],
  },
  animals: {
    title: "Animals (Bienvenido a la Selva) - Fill in the Blanks",
    type: "Fill-in-the-Blank",
    content: [
      {
        id: "1",
        question: "Let's walk (1) _____________________, (2) _____________________",
        answer: "despacio",
        type: "fill-blank",
      },
      {
        id: "2",
        question: "(2) _____________________",
        answer: "lento",
        type: "fill-blank",
      },
      {
        id: "3",
        question: "Let's walk (3) _____________________, (4) _____________________",
        answer: "rápido",
        type: "fill-blank",
      },
      {
        id: "4",
        question: "(4) _____________________",
        answer: "veloz",
        type: "fill-blank",
      },
      {
        id: "5",
        question: "Use fish, use (5) _____________________, it's the same thang",
        answer: "pez",
        type: "fill-blank",
      },
      {
        id: "6",
        question: "(6) _____________________, bird, lo mismo mayne",
        answer: "pájaro",
        type: "fill-blank",
      },
      {
        id: "7",
        question: "A Jordan fan so I love (7) _____________________",
        answer: "toro",
        type: "fill-blank",
      },
      {
        id: "8",
        question: "And a Bears fan, salute to (8) _____________________",
        answer: "oso",
        type: "fill-blank",
      },
      {
        id: "9",
        question: "No (9) _____________________ round me, I don't mess with them pigs",
        answer: "cerdo",
        type: "fill-blank",
      },
      {
        id: "10",
        question: "That (10) _____________________? Bugs Bunny for the kids",
        answer: "conejo",
        type: "fill-blank",
      },
    ],
  },
  places: {
    title: "Places (The Corner) - Fill in the Blanks",
    type: "Fill-in-the-Blank",
    content: [
      {
        id: "1",
        question: "Ahora (x4), estamos en (1) ____________________ que vengan ahora",
        answer: "esquina",
        type: "fill-blank",
      },
      {
        id: "2",
        question: "Ahora (x4), estamos en (2) ____________________ ahora",
        answer: "esquina",
        type: "fill-blank",
      },
      {
        id: "3",
        question: "Random buildings here and there, (3) ____________________",
        answer: "edificios",
        type: "fill-blank",
      },
      {
        id: "4",
        question: "Me and my boys go shopping, (4) ____________________",
        answer: "tienda",
        type: "fill-blank",
      },
      {
        id: "5",
        question: "Me and T Dott shoot shots at (5) ____________________",
        answer: "parque",
        type: "fill-blank",
      },
      {
        id: "6",
        question: "(6) ____________________, church, He always got me bro (prayers up)",
        answer: "iglesia",
        type: "fill-blank",
      },
      {
        id: "7",
        question: "Carver is (7) ____________________  where I put all my plata (that's money)",
        answer: "banco",
        type: "fill-blank",
      },
      {
        id: "8",
        question: "You ballin' in New York, living in (8) ____________________ (that's house)",
        answer: "casa",
        type: "fill-blank",
      },
      {
        id: "9",
        question: "Where I live is (9) ____________________",
        answer: "apartamento",
        type: "fill-blank",
      },
      {
        id: "10",
        question: "(10) ____________________  - solo, solo, solo, solooooooooo!",
        answer: "solo",
        type: "fill-blank",
      },
    ],
  },
  time: {
    title: "Time (Time Ain't Hard to Tell) - Fill in the Blanks",
    type: "Fill-in-the-Blank",
    content: [
      {
        id: "1",
        question: "If it's 1, start with (1) ______________________, don't forget",
        answer: "es la",
        type: "fill-blank",
      },
      {
        id: "2",
        question: "Use (2) ______________________ for hours 2 to 12 as the first step",
        answer: "son las",
        type: "fill-blank",
      },
      {
        id: "3",
        question: "Then comes the hour, the word (3) ___________ will follow",
        answer: "hora",
        type: "fill-blank",
      },
      {
        id: "4",
        question: "Add (4) ______________________ like the soul is engaging, one of hip hop's favorites",
        answer: "de la",
        type: "fill-blank",
      },
      {
        id: "5",
        question: "For morning, (5) ______________________ is the expression",
        answer: "mañana",
        type: "fill-blank",
      },
      {
        id: "6",
        question: "For afternoon, we use (6) ______________________ before dawn",
        answer: "tarde",
        type: "fill-blank",
      },
      {
        id: "7",
        question: "After sunset we use (7) ______________________, it's dark for real",
        answer: "noche",
        type: "fill-blank",
      },
      {
        id: "8",
        question: "How bout half past twelve? You'd do well to use (8) ______________________ here",
        answer: "son las",
        type: "fill-blank",
      },
      {
        id: "9",
        question: "Time ain't hard to tell, for hour add (9) ______________________",
        answer: "doce",
        type: "fill-blank",
      },
      {
        id: "10",
        question: "Then add (10) ______________________, with no delay",
        answer: "treinta",
        type: "fill-blank",
      },
    ],
  },
}
