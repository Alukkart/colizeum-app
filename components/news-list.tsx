"use client"

import Link from "next/link"
import Image from "next/image"
import {Calendar, ChevronRight, Star, User} from "lucide-react"
import {cn} from "@/lib/utils";
import {notFound} from "next/navigation";
import {News, NewsTag} from "@/prisma/generated/client";

interface NewsListProps {
    news: News[]
    tags: NewsTag[]
    activeTag?: string
}


export function NewsList({news, tags, activeTag}: NewsListProps) {
    if (!news) {
        return notFound()
    }

    const featuredNews = news.find((item) => item.featured)

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            {/* Header */}
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">НОВОСТИ</h1>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Последние события из мира киберспорта и жизни нашего клуба.
                </p>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-10">
                {tags.map((tag) => (
                    <Link
                        key={tag.name}
                        href={`/news?tag=${tag.name}`}
                        className={cn(
                            "px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-300",
                            activeTag === tag.name ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/50",
                        )}
                    >
                        {tag.name}
                    </Link>
                ))}
            </div>

            {/* Featured News */}
            {featuredNews && (
                <Link
                    href={`/app/(main)/news/${featuredNews.slug}`}
                    className="group relative block mb-10 rounded-3xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-500"
                >
                    <div className="relative h-80 md:h-120">
                        <Image
                            src={featuredNews.image || "/placeholder.svg?height=480&width=1200&query=esports news"}
                            alt={featuredNews.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div
                            className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent"/>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="flex items-center gap-1 px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-lg border border-primary/30">
                                <Star className="w-3 h-3"/>
                                Главное
                            </span>
                            <span className="px-3 py-1 bg-card/80 text-foreground text-xs font-medium rounded-lg">
                                {featuredNews.category}
                            </span>
                        </div>

                        <h2 className="text-2xl md:text-4xl font-black text-foreground mb-4 group-hover:text-primary transition-colors">
                            {featuredNews.title}
                        </h2>

                        <p className="text-muted-foreground text-lg mb-6 line-clamp-2 max-w-3xl">{featuredNews.excerpt}</p>

                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            {featuredNews.authorName && (
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4"/>
                                    {featuredNews.authorName}
                                </div>
                            )}
                            {featuredNews.publishedAt && (
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4"/>
                                    {new Date(featuredNews.publishedAt).toLocaleDateString("ru-RU", {
                                        day: "numeric",
                                        month: "long",
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </Link>
            )}

            {/* News Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.length === 0 ? (
                    <div className="col-span-full text-center py-20 text-muted-foreground">
                        <p>Новости не найдены</p>
                    </div>
                ) : (
                    news.map((item, index) => (
                        <Link
                            key={item.id}
                            href={`/app/(main)/news/${item.slug}`}
                            className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500"
                            style={{animationDelay: `${index * 100}ms`}}
                        >
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={item.image || "/placeholder.svg?height=200&width=400&query=esports"}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-2 py-1 bg-card/90 text-foreground text-xs font-medium rounded">
                                        {item.category}
                                    </span>
                                </div>
                            </div>

                            <div className="p-5">
                                <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{item.excerpt}</p>

                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                    <div className="flex items-center gap-4">
                                        {item.publishedAt && (
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3"/>
                                                {new Date(item.publishedAt).toLocaleDateString("ru-RU", {
                                                    day: "numeric",
                                                    month: "short",
                                                })}
                                            </span>
                                        )}
                                    </div>
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    )
}
