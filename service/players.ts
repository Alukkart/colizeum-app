import {axiosInstance} from "@/service/instance";
import {PlayerExtended} from "@/service/DTO/players";

const baseUrl = '/players';

export const getPlayers = async (page: number = 1, limit: number = 6) => {
    const {data} = await axiosInstance.get<{ players: PlayerExtended[] }>(`${baseUrl}?page=${page}&limit=${limit}`);

    return data;
}

export const getPlayer = async (id: string) => {
    const {data} = await axiosInstance.get(`${baseUrl}/${id}`);

    return data;
}