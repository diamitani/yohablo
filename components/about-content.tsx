import { Card, CardContent } from "@/components/ui/card"
import { TeamSection } from "@/components/team-section"

export function AboutContent() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Our Story</h2>
        <p className="text-muted-foreground mb-4">
          Yo Hablo was founded with a simple mission: to make Spanish language learning accessible, engaging, and
          culturally relevant for students of all ages. We recognized that traditional language learning methods often
          fail to connect with today's youth, so we created an innovative approach that leverages the universal language
          of music and hip hop.
        </p>
        <p className="text-muted-foreground">
          Our team of educators, musicians, and language experts work together to create lessons that not only teach
          Spanish vocabulary and grammar but also introduce students to the rich cultural contexts in which the language
          is used.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">Our Mission</h3>
            <p className="text-muted-foreground">
              To make Spanish language learning accessible and engaging through the universal language of music and hip
              hop, breaking down barriers to language acquisition and fostering cultural understanding.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">Our Vision</h3>
            <p className="text-muted-foreground">
              A world where language barriers are broken down through cultural exchange and innovative educational
              methods, where students are excited to learn new languages and connect with diverse communities.
            </p>
          </CardContent>
        </Card>
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-4">Our Values</h2>
        <ul className="space-y-4">
          <li>
            <h3 className="text-xl font-bold">Cultural Respect</h3>
            <p className="text-muted-foreground">
              We honor and celebrate the diverse cultures where Spanish is spoken, ensuring our content is authentic and
              respectful.
            </p>
          </li>
          <li>
            <h3 className="text-xl font-bold">Educational Innovation</h3>
            <p className="text-muted-foreground">
              We continuously seek new and effective ways to teach language, embracing technology and creative
              approaches.
            </p>
          </li>
          <li>
            <h3 className="text-xl font-bold">Accessibility</h3>
            <p className="text-muted-foreground">
              We believe language learning should be available to all students, regardless of background or resources.
            </p>
          </li>
          <li>
            <h3 className="text-xl font-bold">The Power of Music</h3>
            <p className="text-muted-foreground">
              We recognize music's unique ability to connect people across languages and cultures, making it the perfect
              vehicle for language learning.
            </p>
          </li>
        </ul>
      </section>

      <TeamSection />
    </div>
  )
}
