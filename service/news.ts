import {axiosInstance} from "@/service/instance";
import {News} from "@/prisma/generated/client";

const baseUrl = '/news';

export const getNews = async (page: number = 1, limit: number = 6, tag?: string) => {
    const {data} = await axiosInstance.get<{ news: News[], meta: PaginatorMeta }>(baseUrl, {params: {page, limit, tag}});

    return data;
}

export const getNew = async (id: string) => {
    const {data} = await axiosInstance.get(baseUrl + `/${id}`);

    return data;
}