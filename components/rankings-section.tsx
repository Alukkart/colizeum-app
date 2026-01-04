"use client"

import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Trophy, TrendingUp, TrendingDown, Minus, Crown, Medal, Award } from "lucide-react"
import Link from "next/link"
import useSWR from "swr"

interface Player {
  id: string
  username: string
  nickname: string
  avatar: string | null
  mainGame: string | null
  rating: number
  wins: number
  status: "ONLINE" | "OFFLINE" | "INGAME" | "AWAY"
  trend: "UP" | "DOWN" | "STABLE"
  rank: number | null
}

const trendIcons = {
  UP: <TrendingUp className="w-4 h-4 text-green-500" />,
  DOWN: <TrendingDown className="w-4 h-4 text-red-500" />,
  STABLE: <Minus className="w-4 h-4 text-muted-foreground" />,
}

const rankIcons = {
  1: <Crown className="w-5 h-5 text-amber-400" />,
  2: <Medal className="w-5 h-5 text-gray-400" />,
  3: <Award className="w-5 h-5 text-amber-600" />,
}

const statusColors = {
  ONLINE: "bg-green-500",
  OFFLINE: "bg-gray-500",
  INGAME: "bg-amber-500",
  AWAY: "bg-orange-500",
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function RankingsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const { data: players = [], isLoading } = useSWR<Player[]>("/api/players", fetcher)

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

  return (
    <section id="rankings" ref={sectionRef} className="relative py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">Лидерборд</span>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 text-balance">Рейтинг игроков</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Лучшие игроки клуба по результатам турниров</p>
        </div>

        {/* Rankings Table */}
        <div
          className={`overflow-hidden rounded-xl border border-border bg-background transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Table Header */}
          <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-4 bg-secondary/50 border-b border-border text-sm font-semibold text-muted-foreground">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-4">Игрок</div>
            <div className="col-span-2">Игра</div>
            <div className="col-span-2 text-center">Рейтинг</div>
            <div className="col-span-2 text-center">Победы</div>
            <div className="col-span-1 text-center">Тренд</div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="p-12 text-center text-muted-foreground">
              <div className="animate-pulse">Загрузка рейтинга...</div>
            </div>
          )}

          {/* Player Rows */}
          <div className="divide-y divide-border">
            {players.map((player, index) => {
              const displayRank = player.rank || index + 1
              return (
                <Link
                  key={player.id}
                  href={`/profile/${player.username}`}
                  className={cn(
                    "group grid grid-cols-1 lg:grid-cols-12 gap-4 px-6 py-4 hover:bg-secondary/30 transition-all duration-300",
                    displayRank <= 3 && "bg-primary/5",
                  )}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {/* Rank */}
                  <div className="lg:col-span-1 flex items-center justify-center">
                    {displayRank <= 3 ? (
                      rankIcons[displayRank as 1 | 2 | 3]
                    ) : (
                      <span className="text-lg font-bold text-muted-foreground">{displayRank}</span>
                    )}
                  </div>

                  {/* Player */}
                  <div className="lg:col-span-4 flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={player.avatar || "/placeholder.svg?height=48&width=48&query=gamer avatar"}
                        alt={player.nickname}
                        className="w-12 h-12 rounded-full object-cover border-2 border-border group-hover:border-primary transition-colors"
                      />
                      <span
                        className={cn(
                          "absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-background",
                          statusColors[player.status],
                        )}
                      />
                    </div>
                    <span className="font-bold text-foreground group-hover:text-primary transition-colors">
                      {player.nickname}
                    </span>
                  </div>

                  {/* Game */}
                  <div className="lg:col-span-2 flex items-center">
                    <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full">
                      {player.mainGame || "—"}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="lg:col-span-2 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">{player.rating}</span>
                  </div>

                  {/* Wins */}
                  <div className="lg:col-span-2 flex items-center justify-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-500" />
                    <span className="font-medium text-foreground">{player.wins}</span>
                  </div>

                  {/* Trend */}
                  <div className="lg:col-span-1 flex items-center justify-center">{trendIcons[player.trend]}</div>
                </Link>
              )
            })}
          </div>

          {/* Empty State */}
          {!isLoading && players.length === 0 && (
            <div className="p-12 text-center text-muted-foreground">Игроки не найдены</div>
          )}
        </div>

        {/* View Full Rankings */}
        <div className="text-center mt-8">
          <Link
            href="/rankings"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
          >
            Полный рейтинг
            <Trophy className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
