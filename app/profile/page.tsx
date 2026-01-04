import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PlayerProfile } from "@/components/player-profile"

export default function ProfilePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <PlayerProfile username="shadowblade" />
      <Footer />
    </main>
  )
}
