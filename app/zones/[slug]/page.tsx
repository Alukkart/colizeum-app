import {Header} from "@/components/header"
import {Footer} from "@/components/footer"
import {ZoneDetailClient} from "@/components/zone-detail-client"


export default async function ZoneDetailPage({params}: { params: Promise<{ slug: string }> }) {
    const {slug} = await params;

    return (
        <main className="min-h-screen bg-background">
            <Header/>
            <ZoneDetailClient slug={slug}/>
            <Footer/>
        </main>
    )
}
