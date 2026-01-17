"use client"

import {useRef, useState, useEffect} from "react"
import {Calendar, Users, Trophy, ChevronRight} from "lucide-react"
import {cn, formatDate} from "@/lib/utils"
import Link from "next/link"
import {TournamentWithGame} from "@/service/tournaments";
import {TournamentStatus} from "@/prisma/generated/enums";

const statusConfig = {
    REGISTRATION: {label: "Регистрация", color: "bg-primary text-primary-foreground"},
    ONGOING: {label: "Идёт", color: "bg-amber-500 text-black"},
    COMPLETED: {label: "Завершён", color: "bg-muted text-muted-foreground"},
    CANCELLED: {label: "Отменён", color: "bg-destructive text-destructive-foreground"},
}

interface Props {
    tournaments: TournamentWithGame[]
}

export function TournamentsSection({ tournaments }: Props) {
    const sectionRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)
    const [filter, setFilter] = useState<"all" | TournamentStatus>("all")

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            {threshold: 0.1},
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <section id="tournaments" ref={sectionRef} className="relative py-32 bg-background">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div
                    className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 transition-all duration-700 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                >
                    <div>
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">
              Соревнования
            </span>
                        <h2 className="text-4xl md:text-5xl font-black text-foreground text-balance">Турниры и
                            события</h2>
                    </div>

                    {/* Filters */}
                    <div className="flex gap-2">
                        {[
                            {value: "all", label: "Все"},
                            {value: "REGISTRATION", label: "Регистрация"},
                            {value: "ONGOING", label: "Идут"},
                            {value: "COMPLETED", label: "Завершены"},
                        ].map((item) => (
                            <button
                                key={item.value}
                                onClick={() => setFilter(item.value as typeof filter)}
                                className={cn(
                                    "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                                    filter === item.value
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                                )}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tournament Table */}
                <div
                    className={`overflow-hidden rounded-xl border border-border bg-card transition-all duration-700 delay-200 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                >
                    {/* Table Header */}
                    <div
                        className="hidden lg:grid grid-cols-12 gap-4 px-6 py-4 bg-secondary/50 border-b border-border text-sm font-semibold text-muted-foreground">
                        <div className="col-span-4">Турнир</div>
                        <div className="col-span-2">Дата</div>
                        <div className="col-span-2">Участники</div>
                        <div className="col-span-2">Призовой фонд</div>
                        <div className="col-span-2">Статус</div>
                    </div>

                    {/* Loading State */}

                    {/* Tournament Rows */}
                    <div className="divide-y divide-border">
                        {tournaments.map((tournament, index) => (
                            <Link
                                key={tournament.id}
                                href={`/app/(main)/tournaments/${tournament.slug}`}
                                className="group grid grid-cols-1 lg:grid-cols-12 gap-4 px-6 py-5 hover:bg-secondary/30 transition-all duration-300 cursor-pointer"
                                style={{transitionDelay: `${index * 50}ms`}}
                            >
                                {/* Tournament Info */}
                                <div className="lg:col-span-4 flex items-center gap-4">
                                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                        <img
                                            src={tournament.image || "/placeholder.svg?height=64&width=64&query=esports tournament"}
                                            alt={tournament.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                                            {tournament.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">{tournament.game.name}</p>
                                    </div>
                                </div>

                                {/* Date */}
                                <div className="lg:col-span-2 flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-muted-foreground"/>
                                    <div>
                                        <div
                                            className="text-sm font-medium text-foreground">{formatDate(tournament.date)}</div>
                                        <div className="text-xs text-muted-foreground">{tournament.time}</div>
                                    </div>
                                </div>

                                {/* Participants */}
                                <div className="lg:col-span-2 flex items-center gap-2">
                                    <Users className="w-4 h-4 text-muted-foreground"/>
                                    <span className="text-sm text-foreground">
                                        {tournament.currentParticipants}/{tournament.maxParticipants}
                                    </span>
                                </div>

                                {/* Prize */}
                                <div className="lg:col-span-2 flex items-center gap-2">
                                    <Trophy className="w-4 h-4 text-primary"/>
                                    <span className="text-sm font-bold text-primary">{tournament.prize}</span>
                                </div>

                                {/* Status */}
                                <div className="lg:col-span-2 flex items-center justify-between">
                                  <span
                                      className={cn("px-3 py-1.5 text-xs font-semibold rounded-full", statusConfig[tournament.status].color)}
                                  >
                                    {statusConfig[tournament.status].label}
                                  </span>
                                    <ChevronRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"/>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Empty State */}
                    {tournaments.length === 0 && (
                        <div className="p-12 text-center text-muted-foreground">Турниры не найдены</div>
                    )}
                </div>

                {/* View All Link */}
                <div className="text-center mt-8">
                    <Link
                        href="/tournaments"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors group"
                    >
                        Смотреть все турниры
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                    </Link>
                </div>
            </div>
        </section>
    )
}
