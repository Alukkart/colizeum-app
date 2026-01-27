import {NewsArticle} from "@/components/news-article";
import {Api} from "@/service/api-client";

interface Props {
    params: Promise<{ slug: string }>
}

export default async function NewsArticlePage({ params }: Props) {
    const { slug } = await params

    const article = await Api.news.getNew(slug)

    return (
        <main className="min-h-screen bg-background pt-24">
            <NewsArticle article={article} />
        </main>
    )
}
