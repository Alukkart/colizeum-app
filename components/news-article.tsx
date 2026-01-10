"use client"

import Image from "next/image"
import Link from "next/link"
import {Calendar, Eye, ArrowLeft, Tag} from "lucide-react"
import useSWR from "swr";
import {notFound} from "next/navigation";

interface NewsTag {
    id: string
    name: string
}

interface RelatedNews {
    id: string
    slug: string
    title: string
    excerpt: string
    image?: string
    category: string
    publishedAt?: string
}

interface Article {
    id: string
    slug: string
    title: string
    excerpt: string
    content: string
    image?: string
    category: string
    publishedAt?: string
    views: number
    authorName?: string
    authorAvatar?: string
    tags: NewsTag[]
    relatedNews: RelatedNews[]
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function NewsArticle({slug}: { slug: string }) {
    const {data: article, isLoading} = useSWR<Article>(`/api/news/${slug}`, fetcher)

    if (!article && !isLoading) {
        return notFound()
    }

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto px-6 py-12">
                <p className="text-center text-muted-foreground">Загрузка новости...</p>
            </div>
        )
    }

    if(!article){
        return null
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            {/* Back Link */}
            <Link
                href="/news"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
                <ArrowLeft className="w-4 h-4"/>
                Все новости
            </Link>

            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-lg">
                        {article.category}
                    </span>
                    {article.publishedAt && (
                        <span className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4"/>
                            {new Date(article.publishedAt).toLocaleDateString("ru-RU", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </span>
                    )}
                </div>

                <h1 className="text-3xl md:text-5xl font-black text-foreground mb-6 leading-tight">{article.title}</h1>

                <p className="text-xl text-muted-foreground leading-relaxed">{article.excerpt}</p>
            </div>

            {/* Author & Views */}
            <div className="flex items-center justify-between py-4 border-y border-border mb-8">
                {article.authorName && (
                    <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-border">
                            <Image
                                src={article.authorAvatar || "/placeholder.svg?height=40&width=40&query=author"}
                                alt={article.authorName}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-foreground">{article.authorName}</p>
                            <p className="text-xs text-muted-foreground">Автор</p>
                        </div>
                    </div>
                )}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Eye className="w-4 h-4"/>
                    {article.views} просмотров
                </div>
            </div>

            {/* Hero Image */}
            {article.image && (
                <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-10">
                    <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover"/>
                </div>
            )}

            {/* Content */}
            <div className="prose prose-lg prose-invert max-w-none mb-10">
                <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{article.content}</div>
            </div>

            {/* Tags */}
            {article.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mb-12 pt-6 border-t border-border">
                    <Tag className="w-4 h-4 text-muted-foreground"/>
                    {article.tags.map((tag) => (
                        <span key={tag.id} className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full">
                            {tag.name}
                        </span>
                    ))}
                </div>
            )}
        </div>
    )
}
