import {NewsList} from "@/components/news-list";

export default async function NewsPage() {
    return (
        <main className="min-h-screen bg-background pt-24">
            <NewsList/>
        </main>
    )
}
