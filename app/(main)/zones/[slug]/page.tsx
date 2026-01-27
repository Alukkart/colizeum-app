import {ZoneDetailClient} from "@/components/zone-detail-client"
import {Api} from "@/service/api-client";


export default async function ZoneDetailPage({params}: { params: Promise<{ slug: string }> }) {
    const {slug} = await params;

    const zone = await Api.zones.getZone(slug);

    return (
        <main className="min-h-screen bg-background">
            <ZoneDetailClient zone={zone}/>
        </main>
    )
}
