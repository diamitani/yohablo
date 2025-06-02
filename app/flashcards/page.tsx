import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  BookOpen,
  Users,
  Palette,
  Home,
  Clock,
  MapPin,
  Utensils,
  Shirt,
  Heart,
  Sun,
  Globe,
  Music,
  Calculator,
  Eye,
  Smile,
} from "lucide-react"

const FLASHCARD_SETS = [
  {
    slug: "numeros",
    title: "Numbers (Números)",
    description: "Learn Spanish numbers from 0 to 101",
    icon: Calculator,
    cardCount: 102,
    difficulty: "Beginner",
    color: "bg-blue-50 text-blue-700",
    category: "Basic Vocabulary",
  },
  {
    slug: "colores",
    title: "Colors (Colores)",
    description: "Master all the colors in Spanish",
    icon: Palette,
    cardCount: 15,
    difficulty: "Beginner",
    color: "bg-purple-50 text-purple-700",
    category: "Basic Vocabulary",
  },
  {
    slug: "familia",
    title: "Family (Familia)",
    description: "Learn family member names in Spanish",
    icon: Users,
    cardCount: 20,
    difficulty: "Beginner",
    color: "bg-green-50 text-green-700",
    category: "Relationships",
  },
  {
    slug: "lugares",
    title: "Places (Lugares)",
    description: "Common places and locations in Spanish",
    icon: MapPin,
    cardCount: 25,
    difficulty: "Beginner",
    color: "bg-orange-50 text-orange-700",
    category: "Geography",
  },
  {
    slug: "tiempo",
    title: "Time (Tiempo)",
    description: "Learn to tell time in Spanish",
    icon: Clock,
    cardCount: 30,
    difficulty: "Intermediate",
    color: "bg-red-50 text-red-700",
    category: "Time & Date",
  },
  {
    slug: "comida",
    title: "Food (Comida)",
    description: "Essential food vocabulary in Spanish",
    icon: Utensils,
    cardCount: 40,
    difficulty: "Beginner",
    color: "bg-yellow-50 text-yellow-700",
    category: "Daily Life",
  },
  {
    slug: "ropa",
    title: "Clothing (Ropa)",
    description: "Learn clothing and fashion terms",
    icon: Shirt,
    cardCount: 25,
    difficulty: "Beginner",
    color: "bg-pink-50 text-pink-700",
    category: "Daily Life",
  },
  {
    slug: "cuerpo",
    title: "Body Parts (Cuerpo)",
    description: "Learn body parts in Spanish",
    icon: Heart,
    cardCount: 30,
    difficulty: "Beginner",
    color: "bg-rose-50 text-rose-700",
    category: "Health",
  },
  {
    slug: "clima",
    title: "Weather (Clima)",
    description: "Weather conditions and seasons",
    icon: Sun,
    cardCount: 20,
    difficulty: "Beginner",
    color: "bg-sky-50 text-sky-700",
    category: "Nature",
  },
  {
    slug: "animales",
    title: "Animals (Animales)",
    description: "Learn animal names in Spanish",
    icon: Globe,
    cardCount: 35,
    difficulty: "Beginner",
    color: "bg-emerald-50 text-emerald-700",
    category: "Nature",
  },
  {
    slug: "musica",
    title: "Music (Música)",
    description: "Musical instruments and terms",
    icon: Music,
    cardCount: 20,
    difficulty: "Intermediate",
    color: "bg-violet-50 text-violet-700",
    category: "Arts",
  },
  {
    slug: "casa",
    title: "House (Casa)",
    description: "Rooms and furniture vocabulary",
    icon: Home,
    cardCount: 30,
    difficulty: "Beginner",
    color: "bg-amber-50 text-amber-700",
    category: "Daily Life",
  },
  {
    slug: "adjetivos",
    title: "Adjectives (Adjetivos)",
    description: "Descriptive words and personality traits",
    icon: Smile,
    cardCount: 50,
    difficulty: "Intermediate",
    color: "bg-teal-50 text-teal-700",
    category: "Grammar",
  },
  {
    slug: "verbos",
    title: "Verbs (Verbos)",
    description: "Common action words in Spanish",
    icon: Eye,
    cardCount: 60,
    difficulty: "Intermediate",
    color: "bg-indigo-50 text-indigo-700",
    category: "Grammar",
  },
  {
    slug: "escuela",
    title: "School (Escuela)",
    description: "Classroom and education vocabulary",
    icon: BookOpen,
    cardCount: 25,
    difficulty: "Beginner",
    color: "bg-cyan-50 text-cyan-700",
    category: "Education",
  },
]

export default function FlashcardsPage() {
  const totalCards = FLASHCARD_SETS.reduce((sum, set) => sum + set.cardCount, 0)
  const categories = [...new Set(FLASHCARD_SETS.map((set) => set.category))]

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Spanish Flashcards"
        description="Practice Spanish vocabulary with interactive flashcards. Choose from our comprehensive collection of topics!"
      />

      {/* Statistics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{FLASHCARD_SETS.length}</div>
            <div className="text-sm text-muted-foreground">Flashcard Sets</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{totalCards}</div>
            <div className="text-sm text-muted-foreground">Total Cards</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{categories.length}</div>
            <div className="text-sm text-muted-foreground">Categories</div>
          </CardContent>
        </Card>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge key={category} variant="outline" className="text-sm">
              {category}
            </Badge>
          ))}
        </div>
      </div>

      {/* Flashcard Sets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FLASHCARD_SETS.map((set) => {
          const IconComponent = set.icon
          return (
            <Card key={set.slug} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${set.color}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{set.title}</CardTitle>
                    <CardDescription>{set.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{set.difficulty}</Badge>
                    <span className="text-sm text-muted-foreground">{set.cardCount} cards</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {set.category}
                    </Badge>
                  </div>
                  <Link href={`/flashcards/${set.slug}`}>
                    <Button className="w-full">Start Practicing</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Help Section */}
      <Card className="mt-12">
        <CardHeader>
          <CardTitle>How to Use Flashcards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="font-semibold mb-2">1. Choose a Set</div>
              <p className="text-muted-foreground">
                Select a flashcard set that matches your learning level and interests.
              </p>
            </div>
            <div className="text-center">
              <div className="font-semibold mb-2">2. Practice</div>
              <p className="text-muted-foreground">Click through the cards, test yourself, and learn new vocabulary.</p>
            </div>
            <div className="text-center">
              <div className="font-semibold mb-2">3. Review</div>
              <p className="text-muted-foreground">Come back regularly to review and reinforce your learning.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
