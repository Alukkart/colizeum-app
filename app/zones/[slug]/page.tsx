import {ZoneDetailClient} from "@/components/zone-detail-client"


export default async function ZoneDetailPage({params}: { params: Promise<{ slug: string }> }) {
    const {slug} = await params;

    return (
        <main className="min-h-screen bg-background">
            <ZoneDetailClient slug={slug}/>
        </main>
    )
}
