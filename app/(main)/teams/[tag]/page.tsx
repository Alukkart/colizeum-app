import { TeamDetail } from "@/components/team-detail"
import {Api} from "@/service/api-client";

export default async function TeamPage({ params }: { params: Promise<{ tag: string }> }) {
    const { tag } = await params

    const team = await Api.teams.getTeam(tag)

    return (
        <main className="min-h-screen bg-background">
            <TeamDetail team={team} />
        </main>
    )
}
