import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function TeamSection() {
  return (
    <section className="py-12 bg-secondary/30 rounded-xl">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Team</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Meet the passionate educators and innovators behind Yo Hablo
            </p>
          </div>
        </div>

        {/* Coordination Team */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">COORDINATION TEAM</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Julian Hill */}
            <Card className="overflow-hidden">
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/team-julian-hill.png" alt="Julian Hill" />
                      <AvatarFallback>JH</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-xl font-bold">Julian Hill (aka Señor Hill)</h4>
                      <p className="text-muted-foreground">Co-Founder, Lead Creative</p>
                    </div>
                  </div>
                  <p className="text-sm italic">Educator and entrepreneur, repping the Keyz for sure…</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Julian (he/they) is a former Spanish teacher in Compton, CA, and a native of Kankakee, IL. They have
                  worked with youth since high school in a number of roles - day camp counselor, after-school program
                  recreation coordinator, tutor and mentor. Julian has studied Spanish abroad in Spain and Guatemala,
                  backpacked through almost all of Central and South America and has advised several Spanish-speaking
                  worker cooperatives and other companies. Yo Hablo allows Julian to mix his passion for music (former
                  violist, occasional poet) and his love for teaching and empowering youth.
                </p>
              </CardContent>
            </Card>

            {/* Patrick Senat */}
            <Card className="overflow-hidden">
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="/team-patrick-senat.png" alt="Patrick Senat" />
                      <AvatarFallback>PS</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-xl font-bold">Patrick Senat</h4>
                      <p className="text-muted-foreground">Co-Founder, Lead Strategist</p>
                    </div>
                  </div>
                  <p className="text-sm italic">
                    Community organizer, educator, futurist - keeping Brooklyn on the map.
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Patrick Senat (he/him) has always believed in the power of education. Senat graduated from Wesleyan
                  University where he co-led the Traverse Square after-school center, an education enrichment program
                  for K-12 students. After graduating college in 2008, Patrick taught World History and English to high
                  school students in Southern California. Later in 2015, Patrick would return home to Brooklyn and serve
                  as an appointed member of his Community Education Council in the New York City Department of
                  Education, the largest school district in the nation. Yo Hablo allows Patrick to champion language
                  acquisition in a culturally responsive way.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Advisory Circle */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-8">Advisory Circle</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Dallas Rico */}
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/team-dallas-rico.png" alt="Dallas Rico" />
                  <AvatarFallback>DR</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-xl font-bold">Dallas Rico</h4>
                  <p className="text-muted-foreground">TV Writer & Former Spanish Teacher</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Dallas Rico (he/him), a TV Writer, taught high school Spanish for over a decade, both on the West
                  Coast and the East Coast, in public and private schools. Though he has left the classroom to pursue a
                  career in TV writing, he is still very much passionate about Education. Yo Hablo allows Dallas to
                  continue to encourage students to learn Spanish and, in a way, to relive his teaching days.
                </p>
              </CardContent>
            </Card>

            {/* Alexandra Thomas */}
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/team-alexandra-thomas.png" alt="Alexandra Thomas" />
                  <AvatarFallback>AT</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-xl font-bold">Alexandra Thomas</h4>
                  <p className="text-muted-foreground">Ed.D., Founder of Atlanta Teaching and Learning Lab</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Alexandra Thomas (she/her) received her Doctorate in Education from the Curriculum and Teaching
                  department at Teachers College, Columbia University. She holds an M.S. in Childhood Education from
                  Lehman College and a B.S. in International Affairs from Georgia Institute of Technology. Alexandra is
                  the Founder and Director of Atlanta Teaching and Learning Lab, which provides professional learning
                  opportunities for teachers. Before starting ATL Lab, Alexandra was a Professional Development
                  Consultant at The Center for Technology and School Change at Columbia University specializing in
                  curriculum design and interdisciplinary pedagogies. She is passionate about social justice education
                  and helping learners develop into critical thinkers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
