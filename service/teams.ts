import {axiosInstance} from "@/service/instance";
import {TeamFull} from "@/service/DTO/team";

const baseUrl = '/teams';

export const getTeam = async (tag: string) => {
    const {data} = await axiosInstance.get<TeamFull>(`${baseUrl}/${tag}`);

    return data;
}