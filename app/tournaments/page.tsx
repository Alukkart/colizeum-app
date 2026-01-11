import {TournamentsList} from "@/components/tournaments-list";

export default async function TournamentsPage() {
    return (
        <main className="min-h-screen bg-background pt-24">
            <TournamentsList />
        </main>
    )
}
