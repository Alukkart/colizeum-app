import {NewsArticle} from "@/components/news-article";

interface Props {
    params: Promise<{ slug: string }>
}

export default async function NewsArticlePage({ params }: Props) {
    const { slug } = await params

    return (
        <main className="min-h-screen bg-background pt-24">
            <NewsArticle slug={slug} />
        </main>
    )
}
