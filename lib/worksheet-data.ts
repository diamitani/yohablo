import type { WorksheetItem } from "@/components/worksheet-content"

interface WorksheetData {
  [key: string]: {
    title: string
    type: "fill-in-blank" | "multiple-choice" | "matching"
    content: WorksheetItem[]
  }
}

export const worksheetData: WorksheetData = {
  numeros: {
    title: "Numbers (0 to 101) - Fill in the Blank",
    type: "fill-in-blank",
    content: [
      {
        id: "1",
        question:
          "Yeah....uh...sí sí sí sí SÍ. Sr. Hill up in here...dig it. We bout to learn a thing or two, or three, or four... Spanish words for number you didn't know... (1) _______________, that's zero or nothing",
        answer: "Cero",
      },
      {
        id: "2",
        question: "Número (2) _______________ in Spanish, no bluffin'",
        answer: "uno",
      },
      {
        id: "3",
        question: "Claiming king, but you (3) ______________, man why you frontin'?",
        answer: "dos",
      },
      {
        id: "4",
        question: "(4) _______________ years of law school, I'll teach you somethin'",
        answer: "Tres",
      },
      {
        id: "5",
        question: "(5) ____________________ semesters in the CPT",
        answer: "Cuatro",
      },
      {
        id: "6",
        question: "Had (6) _____________________ students stay and help grade papers for me",
        answer: "cinco",
      },
      {
        id: "7",
        question: "Turned in my grades at (7) ________________, at home by (8) ______________________",
        answer: "seis",
      },
      {
        id: "8",
        question: "Turned in my grades at (7) seis, at home by (8) ______________________",
        answer: "siete",
      },
      {
        id: "9",
        question: "Slept (9) _________________ hours dreamed my students got (10) ____________________...",
        answer: "ocho",
      },
      {
        id: "10",
        question: "Slept (9) ocho hours dreamed my students got (10) ____________________...",
        answer: "nueve",
      },
      {
        id: "11",
        question: "...out of (11) _____________________...something I love to see",
        answer: "diez",
      },
      {
        id: "12",
        question: "Think they ready for it, (12) _________________ studied hard, hope them grades show it",
        answer: "once",
      },
      {
        id: "13",
        question: '"My alarm broke! I couldn\'t wake up" Heard that 12 times, (13) ________________ gotta do a make-up',
        answer: "doce",
      },
      {
        id: "14",
        question: "(14) _________________ were failing, hope they prayed up",
        answer: "Trece",
      },
      {
        id: "15",
        question: "(15) __________________ could get an A or not",
        answer: "Catorce",
      },
    ],
  },
  lugares: {
    title: "Places (The Corner) - Fill in the Blank",
    type: "fill-in-blank",
    content: [
      {
        id: "1",
        question:
          "The corner (x4), teaching places students can see around my corner. Ahora (x4), estamos en (1) ____________________ que vengan ahora",
        answer: "la esquina",
      },
      {
        id: "2",
        question:
          "The corner (x4), teaching places students can see around my corner. Ahora (x4), estamos en (2) ____________________ ahora",
        answer: "la esquina",
      },
      {
        id: "3",
        question: "Random buildings here and there, (3) ____________________",
        answer: "los edificios",
      },
      {
        id: "4",
        question: "Me and my boys go shopping, (4) ____________________",
        answer: "centro comercial",
      },
      {
        id: "5",
        question: "Me and T Dott shoot shots at (5) ____________________",
        answer: "el gimnasio",
      },
      {
        id: "6",
        question: "(6) ____________________, church, He always got me bro (prayers up)",
        answer: "La iglesia",
      },
      {
        id: "7",
        question: "Carver is (7) ____________________ where I put all my plata (that's money)",
        answer: "el banco",
      },
      {
        id: "8",
        question: "You ballin' in New York, living in (8) ____________________ (that's house)",
        answer: "una casa",
      },
      {
        id: "9",
        question: "Where I live is (9) ____________________",
        answer: "apartamento",
      },
      {
        id: "10",
        question: "(10) ____________________ - solo, solo, solo, solooooooooo!",
        answer: "un estudio",
      },
      {
        id: "11",
        question: "Wanted to eat, so (11) ____________________ yo vineeee",
        answer: "el restaurante",
      },
      {
        id: "12",
        question: "Saw a movie, peeped that Get Out up in (12) ____________________",
        answer: "el cine",
      },
      {
        id: "13",
        question: "For when I'm mailing that mail, I go to (13) ____________________",
        answer: "el correo",
      },
      {
        id: "14",
        question: "(14) ____________________ is where, I went to buy books bro",
        answer: "La librería",
      },
      {
        id: "15",
        question: "Drinking that te gotta go alla en (15) ____________________",
        answer: "el café",
      },
      {
        id: "16",
        question: "Can't buy no books? (16) ____________________ is that way!",
        answer: "la biblioteca",
      },
      {
        id: "17",
        question: "Walk a few (17) ____________________, text me when you've found it",
        answer: "cuadras",
      },
      {
        id: "18",
        question:
          "The corner (x4), teaching places students can see around my corner. Ahora (x4), estamos en (18) ____________________ que vengan ahora",
        answer: "la esquina",
      },
    ],
  },
  tiempo: {
    title: "Time (Time Ain't Hard to Tell) - Fill in the Blank",
    type: "fill-in-blank",
    content: [
      {
        id: "1",
        question:
          "Time ain't hard to tell In Spanish well, I excel Teaching so that when you have exams, you won't fail If it's 1, start with (1) ______________________, don't forget",
        answer: "es la una",
      },
      {
        id: "2",
        question: "Use (2) ______________________ for hours 2 to 12 as the first step",
        answer: "son las",
      },
      {
        id: "3",
        question: "Then comes the hour, the word (3) ___________ will follow",
        answer: "y",
      },
      {
        id: "4",
        question: "Add (4) ______________________ like the soul is engaging, one of hip hop's favorites",
        answer: "de la",
      },
      {
        id: "5",
        question: "For morning, (5) ______________________ is the expression",
        answer: "mañana",
      },
      {
        id: "6",
        question: "For afternoon, we use (6) ______________________ before dawn",
        answer: "tarde",
      },
      {
        id: "7",
        question: "After sunset we use (7) ______________________, it's dark for real",
        answer: "noche",
      },
      {
        id: "8",
        question:
          "Who'd a thunk, time is up, time to take the Knowledge that I done gave ya, and to prove what You've learned to do up To now, analyze this example How bout half past twelve? You'd do well to use (8) ______________________ here",
        answer: "son las",
      },
      {
        id: "9",
        question: "Time ain't hard to tell, for hour add (9) ______________________",
        answer: "doce",
      },
      {
        id: "10",
        question: "Then add (10) ______________________, with no delay",
        answer: "y treinta",
      },
      {
        id: "11",
        question: "(11) __________________________________, ya heard me",
        answer: "Son las doce y treinta",
      },
      {
        id: "12",
        question: "You can, use (12) ______________________ instead of thirty",
        answer: "media",
      },
      {
        id: "13",
        question: "(13) __________________________ can replace 15, no that's not cheating",
        answer: "cuarto",
      },
      {
        id: "14",
        question: "Another example 8:15 in the evening (14) ________________________________ you know this well",
        answer: "Son las ocho y cuarto de la noche",
      },
    ],
  },
  colores: {
    title: "Colors (Colores) - Fill in the Blank",
    type: "fill-in-blank",
    content: [
      {
        id: "1",
        question:
          "I'm teaching them colors in Spanish, wax on, wax off man I'm Mr. Miagi. (1) _____________________ my money is green, and I'm not talking Monopoly",
        answer: "Verde",
      },
      {
        id: "2",
        question: "(2) _____________________ - black is what they call me cuz they fear me",
        answer: "Negro",
      },
      {
        id: "3",
        question: "(3) _____________________ - bluer than the ocean that helps me think and see clearly",
        answer: "Azul",
      },
      {
        id: "4",
        question: "(4) _____________________ - like white paper I use when I gotta print",
        answer: "Blanco",
      },
      {
        id: "5",
        question: "(5) _____________________ - grapes, violets, plums, Wildcats we getting it",
        answer: "Morado",
      },
      {
        id: "6",
        question: "(6) _____________________ - like oranges in Florida, man yum yum yum",
        answer: "Anaranjado",
      },
      {
        id: "7",
        question: "(7) _____________________ - for roses, strawberries, stop signs and fi-re trucks",
        answer: "Rojo",
      },
      {
        id: "8",
        question: "(8) _____________________ for pecans, and almonds, and wheat bread, and pretzels, on my plate",
        answer: "Marrón",
      },
      {
        id: "9",
        question: "(9) _____________________ for the sun shining and ripe bananas man",
        answer: "Amarillo",
      },
      {
        id: "10",
        question: "(10) _____________________ for gray sharks, silver metals, African elephants",
        answer: "Gris",
      },
      {
        id: "11",
        question: "(11) _____________________ for pink flamingos, cotton candy, and bubble gum",
        answer: "Rosado",
      },
    ],
  },
  comida: {
    title: "Food (Ya Comí) - Fill in the Blank",
    type: "fill-in-blank",
    content: [
      {
        id: "1",
        question: "(1) _______________ is breakfast, gotta start my day right",
        answer: "Desayuno",
      },
      {
        id: "2",
        question: "Tengo (2) _______________ a comer, that's a smoothie delight",
        answer: "frutas",
      },
      {
        id: "3",
        question: "(3) _______________ (strawberries), (4) __________________ (apples) too",
        answer: "Fresas",
      },
      {
        id: "4",
        question: "(3) Fresas (strawberries), (4) __________________ (apples) too",
        answer: "manzanas",
      },
      {
        id: "5",
        question: "(5) _____________________ (raspberries), I love my fruits",
        answer: "Frambuesas",
      },
      {
        id: "6",
        question: "Mix it up a bit, so I gotta get (6) ______________________, or vegetables, for my saaaaaalad.",
        answer: "verduras",
      },
      {
        id: "7",
        question: "Or (7) ______________________, with spinach that (8) ______________________.",
        answer: "ensalada",
      },
      {
        id: "8",
        question: "Or (7) ensalada, with spinach that (8) ______________________.",
        answer: "espinaca",
      },
      {
        id: "9",
        question: "(9) ______________________, carrots, you know that I need a lotta",
        answer: "Zanahorias",
      },
      {
        id: "10",
        question: "(10) ______________________ (cucumbers) and (11) ______________________ (oranges)",
        answer: "Pepinos",
      },
      {
        id: "11",
        question: "(10) Pepinos (cucumbers) and (11) ______________________ (oranges)",
        answer: "naranjas",
      },
      {
        id: "12",
        question: "Water, (12) ______________________, to wash it down keep pouring it",
        answer: "agua",
      },
      {
        id: "13",
        question: "You say tomato, in Spanish it's (13) ______________________",
        answer: "tomate",
      },
      {
        id: "14",
        question: "(14) ______________________is the word we using for broccoli",
        answer: "Brécol",
      },
      {
        id: "15",
        question: "Got eggs, or (15) ______________________, and (16) ______________________",
        answer: "huevos",
      },
      {
        id: "16",
        question: "Got eggs, or (15) huevos, and (16) ______________________",
        answer: "tocino",
      },
    ],
  },
  familia: {
    title: "Family (Meet the Fam Bam) - Fill in the Blank",
    type: "fill-in-blank",
    content: [
      {
        id: "1",
        question: "Meet the fam bam, (1) _________________________________. After this, Spanish will be familiar",
        answer: "la familia",
      },
      {
        id: "2",
        question:
          "I love my sisters man, those (2) _________________________________. She love me too, yeah I'm her brotha",
        answer: "hermanas",
      },
      {
        id: "3",
        question: "Meet the fam bam, (3) _________________________________. After this, Spanish will be familiar",
        answer: "la familia",
      },
      {
        id: "4",
        question:
          "I love my brothers man, those (4) _________________________________. We learning words for family en espanol",
        answer: "hermanos",
      },
      {
        id: "5",
        question: "Peace to my heart, my mom, (5) _________________________________",
        answer: "mi madre",
      },
      {
        id: "6",
        question: "Debate politics with my dad, (6) _________________________________",
        answer: "mi padre",
      },
      {
        id: "7",
        question: "Two older brothers, those are (7) _________________________________",
        answer: "hermanos",
      },
      {
        id: "8",
        question: "Far as sisters, (8) _________________________________, yeah I got four",
        answer: "hermanas",
      },
      {
        id: "9",
        question: "Mad (9) _________________________________ or uncles, but none of them named Tom",
        answer: "tíos",
      },
      {
        id: "10",
        question: "My closest (10) _________________________________ or aunts were sisters of my mom",
        answer: "tías",
      },
    ],
  },
  "and-teach-clothing-jobs": {
    title: "And Teach (Clothing & Jobs) - Fill in the Blank",
    type: "fill-in-blank",
    content: [
      {
        id: "1",
        question: "At home, on the phone, please bring my belt, (1) ___________________",
        answer: "el cinturón",
      },
      {
        id: "2",
        question:
          "They must have been kind of sorrowed by the shorts and the jeans, but it took an hour. And (2) ___________________, that's tea",
        answer: "la camiseta",
      },
      {
        id: "3",
        question: "(3) ___________________, earrings. And like the homie Khaled said, quinceanillo, that's ring",
        answer: "los pendientes",
      },
      {
        id: "4",
        question: "Got (4) ___________________ shirt, didn't pay for it, yeah",
        answer: "la camisa",
      },
      {
        id: "5",
        question: "Jordans, (5) ___________________, had to wait for them",
        answer: "zapatos",
      },
      {
        id: "6",
        question: "(6) ___________________, my boy wanted me to loan, I said, okay, to him",
        answer: "La chaqueta",
      },
      {
        id: "7",
        question: "I got wool or (7) ___________________, and that silver or plata",
        answer: "lana",
      },
      {
        id: "8",
        question: "And (8) ___________________, that's hat, and la corbata, what's that?",
        answer: "el gorro",
      },
      {
        id: "9",
        question: "Ataba, yo, right now, and (9) ___________________, I guess my girl look real fly",
        answer: "la falda",
      },
      {
        id: "10",
        question: "(10) ___________________ or bracelet, what they talkin' about?",
        answer: "La poseta",
      },
      {
        id: "11",
        question: "Brought those socks, (11) ___________________ with flip-flops",
        answer: "calcetines",
      },
      {
        id: "12",
        question: "I know you want (12) ___________________, lord, you're like me",
        answer: "un abogado",
      },
      {
        id: "13",
        question: "(13) ___________________, the only one that fixes Capri, right?",
        answer: "La mecánica",
      },
      {
        id: "14",
        question: "(14) ___________________ came here to teach, right?",
        answer: "La maestra",
      },
      {
        id: "15",
        question: "Yeah, double-checkin' on ya, (15) ___________________ test your blood pressure for ya",
        answer: "la doctora",
      },
    ],
  },
  "book-dun-classroom": {
    title: "Classroom (Books Dun) - Fill in the Blank",
    type: "fill-in-blank",
    content: [
      {
        id: "1",
        question: "Got (1)________________ with real ones",
        answer: "La clase",
      },
      {
        id: "2",
        question: "(2) ____________ teacher yeah ya heard of 'em",
        answer: "Maestro",
      },
      {
        id: "3",
        question: "It's Señor Hill they be learnin' from. The squad (3) ___________________ best come prepared",
        answer: "Estudiantes",
      },
      {
        id: "4",
        question: "En (4) _____________________ backpack make sure that there's",
        answer: "Mochila",
      },
      {
        id: "5",
        question: "(5) _______________________ a notebook for ya notes",
        answer: "Cuaderno",
      },
      {
        id: "6",
        question: "(6) _______________________ is paper desk (7) _______________________",
        answer: "Papel",
      },
      {
        id: "7",
        question: "(6) Papel is paper desk (7) _______________________",
        answer: "Escritorio",
      },
      {
        id: "8",
        question: "(8) _______________________ ain't it plugged in?",
        answer: "La computadora",
      },
      {
        id: "9",
        question: "(9) _______________________ poster behind (10) _______________________ table cousin",
        answer: "El cartel",
      },
      {
        id: "10",
        question: "(9) El cartel poster behind (10) _______________________ table cousin",
        answer: "La mesa",
      },
      {
        id: "11",
        question: "Keep (11) _______________________ homework comin'",
        answer: "La tarea",
      },
      {
        id: "12",
        question: "Around (12) _______________________ chair please form a circle",
        answer: "La silla",
      },
      {
        id: "13",
        question: "I closed (13) _______________________ door up in ya face",
        answer: "La puerta",
      },
      {
        id: "14",
        question: "Throw out ya waste in (14) _______________________",
        answer: "La papelera",
      },
      {
        id: "15",
        question: "(15) _______________________ window raised up",
        answer: "La ventana",
      },
    ],
  },
  "que-tiempo-hace-weather": {
    title: "Weather (¿Qué Tiempo Hace?) - Fill in the Blank",
    type: "fill-in-blank",
    content: [
      {
        id: "1",
        question: "(1) _______________ is the Spanish phrase for 'What's the weather like?'",
        answer: "Qué tiempo hace",
      },
      {
        id: "2",
        question: "(2) _______________ means 'It's hot'",
        answer: "Hace calor",
      },
      {
        id: "3",
        question: "(3) _______________ means 'It's raining'",
        answer: "Llueve",
      },
      {
        id: "4",
        question: "(4) _______________ means 'It's cold'",
        answer: "Hace frío",
      },
      {
        id: "5",
        question: "(5) _______________ means 'It's windy'",
        answer: "Hace Viento",
      },
      {
        id: "6",
        question: "(6) _______________ means 'The weather is bad'",
        answer: "Hace mal tiempo",
      },
      {
        id: "7",
        question: "(7) _______________ means 'The weather is good'",
        answer: "Hace buen tiempo",
      },
      {
        id: "8",
        question: "(8) _______________ is the Spanish word for 'summer'",
        answer: "Verano",
      },
      {
        id: "9",
        question: "(9) _______________ is the Spanish word for 'winter'",
        answer: "Invierno",
      },
      {
        id: "10",
        question: "(10) _______________ is the Spanish word for 'fall/autumn'",
        answer: "El otoño",
      },
      {
        id: "11",
        question: "(11) _______________ is the Spanish word for 'spring'",
        answer: "Primavera",
      },
      {
        id: "12",
        question: "(12) _______________ is the phrase we use to ask about the weather",
        answer: "Qué tiempo hace",
      },
    ],
  },
  "conjugation-thang": {
    title: "Present & Preterite Tense Conjugation - Fill in the Blank",
    type: "fill-in-blank",
    content: [
      {
        id: "1",
        question: "For -ar verbs in the present tense, the yo form ends in (1) _______________",
        answer: "-o",
      },
      {
        id: "2",
        question: "For -ar verbs in the present tense, the tú form ends in (2) _______________",
        answer: "-as",
      },
      {
        id: "3",
        question: "For -ar verbs in the present tense, the él/ella/usted form ends in (3) _______________",
        answer: "-a",
      },
      {
        id: "4",
        question: "For -ar verbs in the present tense, the nosotros form ends in (4) _______________",
        answer: "-amos",
      },
      {
        id: "5",
        question: "For -ar verbs in the present tense, the ellos/ellas/ustedes form ends in (5) _______________",
        answer: "-an",
      },
      {
        id: "6",
        question: "The endings we just learned are for (6) _______________ in the present tense",
        answer: "-ar verbs",
      },
      {
        id: "7",
        question: "Now let's learn the endings for (7) _______________ in the present tense",
        answer: "-er verb",
      },
      {
        id: "8",
        question: "For -er verbs in the present tense, the yo form ends in (8) _______________",
        answer: "-o",
      },
      {
        id: "9",
        question: "For -er verbs in the present tense, the tú form ends in (9) _______________",
        answer: "-es",
      },
      {
        id: "10",
        question: "For -er verbs in the present tense, the él/ella/usted form ends in (10) _______________",
        answer: "-e",
      },
      {
        id: "11",
        question: "For -er verbs in the present tense, the nosotros form ends in (11) _______________",
        answer: "-emos",
      },
      {
        id: "12",
        question: "For -er verbs in the present tense, the ellos/ellas/ustedes form ends in (12) _______________",
        answer: "-en",
      },
      {
        id: "13",
        question: "Now let's learn the endings for (13) _______________ verbs in the present tense",
        answer: "-ir",
      },
      {
        id: "14",
        question: "For -ir verbs in the present tense, the yo form ends in (14) _______________",
        answer: "-o",
      },
      {
        id: "15",
        question: "For -ir verbs in the present tense, the tú form ends in (15) _______________",
        answer: "-es",
      },
    ],
  },
  "teach-that-prepositions-extended": {
    title: "Prepositions (Teach That) - Fill in the Blank",
    type: "fill-in-blank",
    content: [
      {
        id: "1",
        question: "Under (1) ________________________________, above (2) ____________________________.",
        answer: "debajo de",
      },
      {
        id: "2",
        question: "Under (1) debajo de, above (2) ____________________________.",
        answer: "encima de",
      },
      {
        id: "3",
        question: "Near (3) ________________________________, far (4) ________________________________",
        answer: "cerca de",
      },
      {
        id: "4",
        question: "Near (3) cerca de, far (4) ________________________________",
        answer: "lejos de",
      },
      {
        id: "5",
        question: "Front (5) ________________________________, behind (6) ____________________________.",
        answer: "en frente de",
      },
      {
        id: "6",
        question: "Front (5) en frente de, behind (6) ____________________________.",
        answer: "detrás de",
      },
      {
        id: "7",
        question: "Next to (7) ______________________________, on (8) ________________________________",
        answer: "al lado de",
      },
      {
        id: "8",
        question: "Next to (7) al lado de, on (8) ________________________________",
        answer: "está sobre",
      },
      {
        id: "9",
        question: "Start it with (9) __________________, end with (10) __________________, now we can start",
        answer: "está",
      },
      {
        id: "10",
        question: "Start it with (9) está, end with (10) __________________, now we can start",
        answer: "de",
      },
      {
        id: "11",
        question: "Near is (11) __________________, (12) __________________ means it's far away",
        answer: "cerca",
      },
      {
        id: "12",
        question: "Near is (11) cerca, (12) __________________ means it's far away",
        answer: "lejos",
      },
      {
        id: "13",
        question: "When I'm talkin' about above we will use (13) __________________ mayne",
        answer: "encima",
      },
      {
        id: "14",
        question: "Undeeeeeeer, (14) ____________________________ up in my class",
        answer: "debajo",
      },
      {
        id: "15",
        question: "Sayin' next to, that's (15) ____________________________ up in my class.",
        answer: "al lado",
      },
    ],
  },
  "talkin-family-extended-2": {
    title: "Family (Talkin' Family) - Fill in the Blank",
    type: "fill-in-blank",
    content: [
      {
        id: "1",
        question: "Mi (1) _____________________________ is so fresh",
        answer: "Familia",
      },
      {
        id: "2",
        question: "Whose house? (2) _____________________________ no doubt,",
        answer: "Padres",
      },
      {
        id: "3",
        question: "(3) _____________________________ is my mother, and (4) ________________________ is my pops,",
        answer: "Madre",
      },
      {
        id: "4",
        question: "(3) Madre is my mother, and (4) ________________________ is my pops,",
        answer: "Padre",
      },
      {
        id: "5",
        question: "I moved out, with my (5) _____________________________ or my uncle,",
        answer: "Tío",
      },
      {
        id: "6",
        question: "When I'm sad it's my (6) _____________________________ or my aunty that I come to,",
        answer: "Tía",
      },
      {
        id: "7",
        question: "My (7) _____________________________, or sister, a professor, she'll teach a lesson,",
        answer: "Hermana",
      },
      {
        id: "8",
        question: "My (8) _____________________________, or brother, should be a politician, and I",
        answer: "Hermano",
      },
      {
        id: "9",
        question: "Chill with my (9) _____________________________ and my (10) ___________________________ too,",
        answer: "Hijas",
      },
      {
        id: "10",
        question: "Chill with my (9) Hijas and my (10) ___________________________ too,",
        answer: "Hijos",
      },
      {
        id: "11",
        question: "(11) _____________________________ grandpa, (12) _____________________________ grandma,",
        answer: "Abuelo",
      },
      {
        id: "12",
        question: "(11) Abuelo grandpa, (12) _____________________________ grandma,",
        answer: "Abuela",
      },
      {
        id: "13",
        question: "I have a little niece, that is my (13) _____________________________,",
        answer: "Sobrina",
      },
      {
        id: "14",
        question: "My (14) _____________________________ or nephew he likes to floss in the,",
        answer: "Sobrino",
      },
      {
        id: "15",
        question: 'Students like, "Señor Hill isn\'t (15) _____________________________ cousin?"',
        answer: "Primo",
      },
    ],
  },
  "book-dun-classroom-extended": {
    title: "Classroom (Books Dun Extended) - Fill in the Blank",
    type: "fill-in-blank",
    content: [
      {
        id: "1",
        question: "Got (1) ________________ with real ones",
        answer: "La clase",
      },
      {
        id: "2",
        question: "(2) ____________ teacher yeah ya heard of 'em",
        answer: "Maestro",
      },
      {
        id: "3",
        question: "It's Señor Hill they be learnin' from. The squad (3) ___________________ best come prepared",
        answer: "Estudiantes",
      },
      {
        id: "4",
        question: "En (4) _____________________ backpack make sure that there's",
        answer: "Mochila",
      },
      {
        id: "5",
        question: "(5) _______________________ a notebook for ya notes",
        answer: "Cuaderno",
      },
      {
        id: "6",
        question: "(6) _______________________ is paper desk (7) _______________________",
        answer: "Papel",
      },
      {
        id: "7",
        question: "(6) Papel is paper desk (7) _______________________",
        answer: "Escritorio",
      },
      {
        id: "8",
        question: "(8) _______________________ ain't it plugged in?",
        answer: "La computadora",
      },
      {
        id: "9",
        question: "(9) _______________________ poster behind (10) _______________________ table cousin",
        answer: "El cartel",
      },
      {
        id: "10",
        question: "(9) El cartel poster behind (10) _______________________ table cousin",
        answer: "La mesa",
      },
      {
        id: "11",
        question: "Keep (11) _______________________ homework comin'",
        answer: "La tarea",
      },
      {
        id: "12",
        question: "Around (12) _______________________ chair please form a circle",
        answer: "La silla",
      },
      {
        id: "13",
        question: "I closed (13) _______________________ door up in ya face",
        answer: "La puerta",
      },
      {
        id: "14",
        question: "Throw out ya waste in (14) _______________________",
        answer: "La papelera",
      },
      {
        id: "15",
        question: "(15) _______________________ window raised up",
        answer: "La ventana",
      },
      {
        id: "16",
        question: "Flag is (16) _______________________",
        answer: "La bandera",
      },
      {
        id: "17",
        question: "Computer mouse (17) _______________________ screen (18) _______________________",
        answer: "El ratón",
      },
      {
        id: "18",
        question: "Computer mouse (17) El ratón screen (18) _______________________",
        answer: "La pantalla",
      },
      {
        id: "19",
        question: "(19) _______________________ helps us find the meaning",
        answer: "El diccionario",
      },
      {
        id: "20",
        question: "The keyboard is (20) _______________________",
        answer: "El teclado",
      },
    ],
  },
  "espanoletry-adjectives-complete": {
    title: "Adjectives (Españoletry) - Fill in the Blank",
    type: "fill-in-blank",
    content: [
      {
        id: "1",
        question: "In Philly they call me bol, not the boy, that's (1) _______________________________",
        answer: "el chico",
      },
      {
        id: "2",
        question: "Play viola, write raps, draw pics (2) _______________________________",
        answer: "artístico",
      },
      {
        id: "3",
        question: "Not my brother or a friend (3) _______________________________",
        answer: "el amigo",
      },
      {
        id: "4",
        question: "Slept in Antarctica, I'm daring (4) _______________________________",
        answer: "atrevido",
      },
      {
        id: "5",
        question: "According to the fam (5) _______________________________",
        answer: "según la familia",
      },
      {
        id: "6",
        question: "Called the girl, (6) _______________________________, to come and deal with ya",
        answer: "la chica",
      },
      {
        id: "7",
        question: "I'm not, no soy, (7) _______________________________ coy pero but",
        answer: "tímido",
      },
      {
        id: "8",
        question: "Soy muy (8) _______________________________, I'm very serious",
        answer: "serio",
      },
      {
        id: "9",
        question: "Tip me (9) _______________________________, I'm hard-working",
        answer: "trabajador",
      },
      {
        id: "10",
        question: "Sneaky (10) _______________________________ he in ya yard lurking",
        answer: "artero",
      },
      {
        id: "11",
        question: "I'm social, soy (11) _______________________________",
        answer: "sociable",
      },
      {
        id: "12",
        question: "Except when I'm not sometimes (12) _______________________________",
        answer: "a veces",
      },
      {
        id: "13",
        question: "Think you type talented (13) _______________________________",
        answer: "talentoso",
      },
      {
        id: "14",
        question: "A studious Sr. Hill fan, (14) _______________________________",
        answer: "estudioso",
      },
      {
        id: "15",
        question: "Go be reserved somewhere (15) _______________________________",
        answer: "reservado",
      },
    ],
  },
  "i-look-good-extended": {
    title: "I Look Good (Extended) - Fill in the Blank",
    type: "fill-in-blank",
    content: [
      {
        id: "1",
        question: "Ella es (1) ________________________, she beautiful,",
        answer: "bella",
      },
      {
        id: "2",
        question: "They think that I'm stupid, (2) _____________________________",
        answer: "estúpido",
      },
      {
        id: "3",
        question: "(3) _____________________________ you old man, you doing too much",
        answer: "viejo",
      },
      {
        id: "4",
        question: "(4) _____________________________ we young man and too turnt up",
        answer: "joven",
      },
      {
        id: "5",
        question: "(5) _____________________________ you weak, do a few push ups",
        answer: "débil",
      },
      {
        id: "6",
        question: "(6) _____________________________ intelligent",
        answer: "inteligente",
      },
      {
        id: "7",
        question: "(7) _____________________________ he too short, man please grow up",
        answer: "bajo",
      },
      {
        id: "8",
        question: "(8) _____________________________ is tall on Locust, what what",
        answer: "alto",
      },
      {
        id: "9",
        question: "(9) _____________________________ lazy, man please wake up",
        answer: "perezoso",
      },
      {
        id: "10",
        question: "(10) _____________________________________ had long dreads draped up",
        answer: "pelo largo",
      },
      {
        id: "11",
        question: "Thinning, you bald now (11) _____________________________, dang bruh",
        answer: "calvo",
      },
      {
        id: "12",
        question: "(12) ____________________________________________ them brown eyes, yuh?",
        answer: "ojos marrones",
      },
      {
        id: "13",
        question: "(13) ______________________________________, wide mouth",
        answer: "la boca ancha",
      },
      {
        id: "14",
        question: "(14) _____________________________ fat that's what we bout, watch your mouth",
        answer: "gordo",
      },
      {
        id: "15",
        question: "(15) ___________________________________ bae dark-skinned",
        answer: "piel Morena",
      },
    ],
  },
  "the-abcds": {
    title: "The ABCDs (Spanish Alphabet) - Fill in the Blank",
    type: "fill-in-blank",
    content: [
      {
        id: "1",
        question: "A is pronounced as (1) _____ in Spanish",
        answer: "ah",
      },
      {
        id: "2",
        question: "B is pronounced as (2) _____ in Spanish",
        answer: "bay",
      },
      {
        id: "3",
        question: "C is pronounced as (3) _____ in Spanish",
        answer: "say",
      },
      {
        id: "4",
        question: "D is pronounced as (4) _____ in Spanish",
        answer: "day",
      },
      {
        id: "5",
        question: "E is pronounced as (5) _____ in Spanish",
        answer: "ay",
      },
      {
        id: "6",
        question: "F is pronounced as (6) _____ in Spanish",
        answer: "ef-fay",
      },
      {
        id: "7",
        question: "G is pronounced as (7) _____ in Spanish",
        answer: "hey",
      },
      {
        id: "8",
        question: "H is pronounced as (8) _____ in Spanish",
        answer: "a-chay",
      },
      {
        id: "9",
        question: "I is pronounced as (9) _____ in Spanish",
        answer: "eee",
      },
      {
        id: "10",
        question: "J is pronounced as (10) _____ in Spanish",
        answer: "hoe-tah",
      },
      {
        id: "11",
        question: "K is pronounced as (11) _____ in Spanish",
        answer: "ka",
      },
      {
        id: "12",
        question: "L is pronounced as (12) _____ in Spanish",
        answer: "el-ay",
      },
      {
        id: "13",
        question: "M is pronounced as (13) _____ in Spanish",
        answer: "em-ay",
      },
      {
        id: "14",
        question: "N is pronounced as (14) _____ in Spanish",
        answer: "en-ay",
      },
      {
        id: "15",
        question: "Ñ is pronounced as (15) _____ in Spanish",
        answer: "en-yay",
      },
    ],
  },
  "juli-slide-extended": {
    title: "Juli Slide (Alphabet Extended) - Fill in the Blank",
    type: "fill-in-blank",
    content: [
      {
        id: "1",
        question: "A words in Spanish include: (1) _____, ambiente, activista",
        answer: "Abolicionista",
      },
      {
        id: "2",
        question: "B words in Spanish include: (2) _____, boicot",
        answer: "Bandera",
      },
      {
        id: "3",
        question: "C words in Spanish include: (3) _____, clima, comunidad",
        answer: "Cooperar",
      },
      {
        id: "4",
        question: "D words in Spanish include: (4) _____, durar, defensa",
        answer: "Discapacidad",
      },
      {
        id: "5",
        question: "E words in Spanish include: (5) _____, equidad, enseña",
        answer: "Español",
      },
      {
        id: "6",
        question: "F words in Spanish include: (6) _____",
        answer: "Feminista",
      },
      {
        id: "7",
        question: "H words in Spanish include: (7) _____, herbal, hereda, hidrata",
        answer: "Humanidad",
      },
      {
        id: "8",
        question: "I words in Spanish include: (8) _____, intersección, incluí",
        answer: "Imaginación",
      },
      {
        id: "9",
        question: "J words in Spanish include: (9) _____, juventud, jefe, jardín",
        answer: "Justicia",
      },
      {
        id: "10",
        question: "L words in Spanish include: (10) _____, logro, leal, mente",
        answer: "Liberación",
      },
      {
        id: "11",
        question: "M words in Spanish include: (11) _____, magia, marxista",
        answer: "Migrante",
      },
      {
        id: "12",
        question: "N words in Spanish include: (12) _____",
        answer: "Naturalista",
      },
      {
        id: "13",
        question: "O words in Spanish include: (13) _____, obrera, ofensa",
        answer: "Optimista",
      },
      {
        id: "14",
        question: "P words in Spanish include: (14) _____, preciso, poder, Panteras, piensa",
        answer: "Posible",
      },
      {
        id: "15",
        question: "R words in Spanish include: (15) _____, rasta, rebellion, reflexive",
        answer: "Revolución",
      },
    ],
  },
}
