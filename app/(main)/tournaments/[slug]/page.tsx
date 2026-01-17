import {TournamentDetail} from "@/components/tournament-detail";

interface Props {
    params: Promise<{ slug: string }>
}

export default async function TournamentPage({ params }: Props) {
    const { slug } = await params

    return (
        <main className="min-h-screen bg-background pt-24">
            <TournamentDetail slug={slug} />
        </main>
    )
}