import {axiosInstance} from "@/service/instance";
import {Game, Tournament} from "@/prisma/generated/client";

const baseUrl = '/tournaments';

export interface TournamentWithGame extends Tournament {
    game: Game
}

export const getTournaments = async (page: number = 1, limit: number = 6) => {
    const {data} = await axiosInstance.get<{ tournaments: TournamentWithGame[], meta: PaginatorMeta }>(baseUrl, {params: {page, limit}});

    return data;
}

export const getTournament = async (id: string) => {
    const {data} = await axiosInstance.get(baseUrl + `/${id}`);

    return data;
}