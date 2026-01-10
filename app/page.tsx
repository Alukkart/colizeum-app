import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ZonesSection } from "@/components/zones-section"
import { TournamentsSection } from "@/components/tournaments-section"
import { RankingsSection } from "@/components/rankings-section"
import { NewsSection } from "@/components/news-section"
import { ContactsSection } from "@/components/contacts-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <ZonesSection />
      <TournamentsSection />
      <RankingsSection />
      <NewsSection />
      <ContactsSection />
      <Footer />
    </main>
  )
}
