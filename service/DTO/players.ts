import {Player, PlayerAchievement, Team, TeamPlayer, Tournament, TournamentTeam} from "@/prisma/generated/client";

export interface PlayerExtended extends Player {
    wins: number;
}

interface TeamAndTournament extends TournamentTeam{
    team: Team,
    tournament: Tournament
}

interface TeamPlayerFull extends TeamPlayer{
    team: {
        tournaments: TeamAndTournament;
    }
}

export interface PlayerFull extends Player{
    teamPlayers: TeamPlayerFull[],
    achievements: PlayerAchievement[]
}