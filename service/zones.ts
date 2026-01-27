import {axiosInstance} from "@/service/instance";
import {Zone, ZoneComponent, ZoneDevice, ZonePhoto} from "@/prisma/generated/client";

const baseUrl = '/zones'

export interface ZoneFull extends Zone {
    components: ZoneComponent[];
    devices: ZoneDevice[]
    photos: ZonePhoto[]
}

export const getZones = async () => {
    const {data} = await axiosInstance.get<{ zones: Zone[] }>(`${baseUrl}`)

    return data
}

export const getZone = async (slug: string) => {
    const {data} = await axiosInstance.get<ZoneFull>(`${baseUrl}/${slug}`)

    return data
}