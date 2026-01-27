import {Game, Match, Team, Tournament, TournamentTeam} from "@/prisma/generated/client";

export interface TournamentWithGame extends Tournament {
    game: Game
    _count: {
        teams: number
    }
}

interface MatchFull extends Match {
    teamA: Team
    teamB: Team
}

interface TeamFull extends TournamentTeam{
    team: Team
}

export interface TournamentFull extends Tournament {
    matches: MatchFull[]
    teams: TeamFull[]
    game: Game,
    _count: {
        teams: number
    }
}