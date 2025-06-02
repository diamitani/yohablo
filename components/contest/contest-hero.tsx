export function ContestHero() {
  return (
    <div className="relative overflow-hidden rounded-lg">
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-40">
          <source src="/videos/music-background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-indigo-900/80" />
      </div>

      <div className="relative z-10 px-6 py-12 md:py-24 text-center text-white">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Yo Hablo Spanish Video Contest</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
          Show off your Spanish skills through creative videos! Create original Spanish language performances and win
          exciting prizes.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 md:p-6 flex-1 max-w-xs">
            <h3 className="text-xl font-semibold mb-2">Individual Entries</h3>
            <p>15-30 second videos showcasing your Spanish skills</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 md:p-6 flex-1 max-w-xs">
            <h3 className="text-xl font-semibold mb-2">Class Entries</h3>
            <p>1-2 minute collaborative videos from entire classes</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 md:p-6 flex-1 max-w-xs">
            <h3 className="text-xl font-semibold mb-2">Prizes</h3>
            <p>Win gift cards, classroom supplies, and featured spotlights</p>
          </div>
        </div>
      </div>
    </div>
  )
}
