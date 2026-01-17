import {TournamentsList} from "@/components/tournaments-list";
import {Api} from "@/service/api-client";
import {Paginator} from "@/components/paginator";

type Props = {
    searchParams: Promise<{
        page?: string
    }>
}

export default async function TournamentsPage({ searchParams }: Props) {
    const { page } = await searchParams

    const pageNumber = Number(page) || 1
    const limit = 10

    const {tournaments, meta} = await Api.tournaments.getTournaments(pageNumber, limit)

    const games = await Api.games.getGames()

    return (
        <main className="min-h-screen bg-background pt-24">
            <TournamentsList tournaments={tournaments} gameFilters={games} />
            <Paginator page={pageNumber} totalPages={meta.totalPages} />
        </main>
    )
}
