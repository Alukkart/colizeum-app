import {axiosInstance} from "@/service/instance";
import {Game} from "@/prisma/generated/client";

const baseUrl = '/games';

export const getGames = async () => {
    const {data} = await axiosInstance.get<Game[]>(baseUrl);

    return data;
}