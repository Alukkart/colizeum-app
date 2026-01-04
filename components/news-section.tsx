"use client"

import { useRef, useState, useEffect } from "react"
import { Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"
import useSWR from "swr"

interface NewsItem {
  id: string
  slug: string
  title: string
  excerpt: string
  image: string | null
  category: string
  publishedAt: string | null
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function NewsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const { data: news = [], isLoading } = useSWR<NewsItem[]>("/api/news", fetcher)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const formatDate = (dateString: string | null) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })
  }

  return (
    <section id="news" ref={sectionRef} className="relative py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div
          className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div>
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">Блог</span>
            <h2 className="text-4xl md:text-5xl font-black text-foreground text-balance">Новости клуба</h2>
          </div>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors group"
          >
            Все новости
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="p-12 text-center text-muted-foreground">
            <div className="animate-pulse">Загрузка новостей...</div>
          </div>
        )}

        {/* News Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {news.slice(0, 3).map((item, index) => (
            <article
              key={item.id}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(34,197,94,0.1)] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg?height=400&width=600&query=esports news"}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-primary/90 text-primary-foreground text-xs font-semibold rounded-full">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="w-4 h-4" />
                  {formatDate(item.publishedAt)}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </h3>

                {/* Excerpt */}
                <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{item.excerpt}</p>

                {/* Read More */}
                <Link
                  href={`/news/${item.slug}`}
                  className="inline-flex items-center gap-2 text-primary text-sm font-semibold group/link"
                >
                  Читать далее
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {!isLoading && news.length === 0 && (
          <div className="p-12 text-center text-muted-foreground">Новости не найдены</div>
        )}
      </div>
    </section>
  )
}
