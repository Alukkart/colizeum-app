import {axiosInstance} from "@/service/instance";
import {PlayerExtended, PlayerFull} from "@/service/DTO/players";

const baseUrl = '/players';

export const getPlayers = async (page: number = 1, limit: number = 6) => {
    const {data} = await axiosInstance.get<{ players: PlayerExtended[] }>(`${baseUrl}?page=${page}&limit=${limit}`);

    return data;
}

export const getPlayer = async (nickname: string) => {
    const {data} = await axiosInstance.get<PlayerFull>(`${baseUrl}/${nickname}`);

    return data;
}