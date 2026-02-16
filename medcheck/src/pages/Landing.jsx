import { NavigationBar, FirstHero } from "@/layouts"

export default function Landing() {
  return <>
  <div className="absolute"></div>
 <header className="relative z-50">
    <NavigationBar />
  </header>
  <main className="relative z-0">
  <FirstHero></FirstHero>
  </main>
  </>
}
