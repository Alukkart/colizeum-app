import {NewsList} from "@/components/news-list";
import {Api} from "@/service/api-client";
import {Paginator} from "@/components/paginator";

type Props = {
    searchParams: Promise<{
        page?: string
        tag?: string
    }>
}

export default async function NewsPage({ searchParams }: Props) {
    const { page, tag } = await searchParams

    const pageNumber = Math.max(1, Number(page) || 1)

    const { news, meta } = await Api.news.getNews(pageNumber, 10, tag)
    const { newsTags } = await Api.newsTags.getNewsTags()

    return (
        <main className="min-h-screen bg-background pt-24">
            <NewsList
                news={news}
                tags={newsTags}
                activeTag={tag}
            />
            <Paginator
                page={pageNumber}
                totalPages={meta.totalPages}
                filter={tag}
            />
        </main>
    )
}
