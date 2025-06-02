export function MissionSection() {
  return (
    <section className="py-20 bg-primary/5 dark:bg-primary/10">
      <div className="container px-4 md:px-6">
        <div className="max-w-6xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center p-8 lg:p-12">
            <div className="space-y-6">
              <div className="inline-block rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
                Our Mission
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Empowering Language Learning Through Music
              </h2>
              <p className="text-muted-foreground md:text-xl leading-relaxed">
                Yo Hablo is dedicated to creating innovative Spanish language learning resources that leverage the power
                of hip hop and music to make language acquisition engaging, effective, and culturally relevant.
              </p>
            </div>
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Why Hip Hop?</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Hip hop is a powerful educational tool that resonates with learners of all ages. The rhythm,
                  repetition, and rhyme patterns in hip hop music create the perfect conditions for language acquisition
                  and retention.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Our Approach</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We combine catchy music with comprehensive curriculum materials, including worksheets, flashcards, and
                  interactive exercises. Our AI-powered tools provide personalized learning experiences that adapt to
                  each student's needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
