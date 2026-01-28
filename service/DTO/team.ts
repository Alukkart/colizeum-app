import { Prisma } from '@/prisma/generated/client'

export type TeamFull = Prisma.TeamGetPayload<{
    include: {
        players: {
            include: {
                user: true
            }
        }
        matchesAsA: {
            include: {
                teamB: true
                winner: true
                tournament: {
                    include: {
                        game: true
                    }
                }
            }
        }
        matchesAsB: {
            include: {
                teamA: true
                winner: true
                tournament: {
                    include: {
                        game: true
                    }
                }
            }
        }
        tournaments: {
            include: {
                tournament: {
                    include: {
                        game: true
                    }
                }
            }
        }
    }
}>
