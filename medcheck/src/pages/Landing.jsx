import { NavigationBar, FirstHero, SecondHero } from "@/layouts"

export default function Landing() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-white text-slate-900 selection:bg-[#0208F9] selection:text-white">
      <header className="sticky top-0 z-[100]">
        <NavigationBar />
      </header>
      <main className="flex-1 relative z-0">
        <FirstHero />
        <SecondHero />
      </main>
    </div>
  )
}
