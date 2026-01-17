import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ZonesSection } from "@/components/zones-section"
import { TournamentsSection } from "@/components/tournaments-section"
import { RankingsSection } from "@/components/rankings-section"
import { NewsSection } from "@/components/news-section"
import { ContactsSection } from "@/components/contacts-section"
import { Api } from "@/service/api-client"

export const dynamic = "force-dynamic"

export default async function HomePage() {
    const { zones } = await Api.zones.getZones()
    const { tournaments } = await Api.tournaments.getTournaments(1, 6)
    const { players } = await Api.players.getPlayers(1, 6)
    const { news } = await Api.news.getNews(1, 6)

    return (
        <main className="min-h-screen">
            <HeroSection/>
            <AboutSection/>
            <ZonesSection zones={zones}/>
            <TournamentsSection tournaments={tournaments}/>
            <RankingsSection players={players}/>
            <NewsSection news={news}/>
            <ContactsSection/>
        </main>
    )
}
