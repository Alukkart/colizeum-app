import {axiosInstance} from "@/service/instance";
import {Zone} from "@/prisma/generated/client";

const baseUrl = '/zones'

export const getZones = async () => {
    const { data } = await axiosInstance.get<{ zones: Zone[] }>(`${baseUrl}`)

    return data
}