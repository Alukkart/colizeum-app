import {axiosInstance} from "@/service/instance";
import {NewsTag} from "@/prisma/generated/client";

const baseUrl = `/news-tags`;

export const getNewsTags = async () => {
    const {data} = await axiosInstance.get<{ newsTags: NewsTag[] }>(baseUrl);

    return data;
}