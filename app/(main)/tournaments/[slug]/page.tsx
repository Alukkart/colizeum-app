import {TournamentDetail} from "@/components/tournament-detail";
import {Api} from "@/service/api-client";

interface Props {
    params: Promise<{ slug: string }>
}

export default async function TournamentPage({ params }: Props) {
    const { slug } = await params

    const tournament = await Api.tournaments.getTournament(slug)

    console.log("Rendering tournament page for:", tournament?.name)

    return (
        <main className="min-h-screen bg-background pt-24">
            <TournamentDetail tournament={tournament} />
        </main>
    )
}