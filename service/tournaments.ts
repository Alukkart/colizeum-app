import {axiosInstance} from "@/service/instance";
import {TournamentFull, TournamentWithGame} from "@/service/DTO/tournament";


const baseUrl = '/tournaments';

export const getTournaments = async (page: number = 1, limit: number = 6) => {
    const {data} = await axiosInstance.get<{ tournaments: TournamentWithGame[], meta: PaginatorMeta }>(baseUrl, {params: {page, limit}});

    return data;
}

export const getTournament = async (slug: string) => {
    const {data} = await axiosInstance.get<TournamentFull>(baseUrl + `/${slug}`);

    return data;
}