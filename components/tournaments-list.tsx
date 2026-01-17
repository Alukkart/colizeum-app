"use client"

import {useState} from "react"
import Link from "next/link"
import Image from "next/image"
import {Calendar, Users, Trophy, Clock, Play, ChevronRight, Filter} from "lucide-react"
import {cn} from "@/lib/utils"
import {type TournamentStatus} from "@/prisma/generated/enums";
import {Game} from "@/prisma/generated/client";
import {TournamentWithGame} from "@/service/tournaments";

const statusConfig: Record<TournamentStatus, { label: string; color: string }> = {
    REGISTRATION: {label: "Регистрация", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"},
    ONGOING: {label: "Идёт", color: "bg-amber-500/20 text-amber-400 border-amber-500/30"},
    COMPLETED: {label: "Завершён", color: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30"},
    CANCELLED: {label: "Отменён", color: "bg-red-500/20 text-red-400 border-red-500/30"},
}

type Props = {
    tournaments: TournamentWithGame[]
    gameFilters: Game[]
}

export function TournamentsList({tournaments, gameFilters}: Props) {
    console.log(tournaments)
    const [filter, setFilter] = useState("Все")
    const [statusFilter, setStatusFilter] = useState("Все")

    if(!tournaments){
        return null
    }

    const filteredTournaments = tournaments.filter((t) => {
        const gameMatch = filter === "Все" || t.game.name.toLowerCase() === filter.toLowerCase()
        const statusMatch = statusFilter === "Все" || t.status.toLowerCase() === statusFilter.toLowerCase()
        return gameMatch && statusMatch
    })

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            {/* Header */}
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">ТУРНИРЫ</h1>
                <p className="text-muted-foreground text-lg max-w-2xl">
                    Участвуй в турнирах, побеждай и выигрывай призы. Регистрация открыта для всех игроков клуба.
                </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-muted-foreground"/>
                    <span className="text-sm text-muted-foreground">Игра:</span>
                    <div className="flex gap-2">
                        {gameFilters && gameFilters.map((game) => (
                            <button
                                key={game.id}
                                onClick={() => setFilter(game.name)}
                                className={cn(
                                    "px-3 py-1.5 text-sm font-medium rounded-lg border transition-all duration-300",
                                    filter === game.name
                                        ? "bg-primary text-primary-foreground border-primary"
                                        : "bg-card text-muted-foreground border-border hover:border-primary/50",
                                )}
                            >
                                {game.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Статус:</span>
                    <div className="flex gap-2">
                        {["Все", "REGISTRATION", "ONGOING", "COMPLETED"].map((status) => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={cn(
                                    "px-3 py-1.5 text-sm font-medium rounded-lg border transition-all duration-300",
                                    statusFilter === status
                                        ? "bg-primary text-primary-foreground border-primary"
                                        : "bg-card text-muted-foreground border-border hover:border-primary/50",
                                )}
                            >
                                {status === "Все" ? "Все" : statusConfig[status as TournamentStatus]?.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tournaments Grid */}
            <div className="grid gap-6">
                {filteredTournaments.length === 0 ? (
                    <div className="text-center py-20 text-muted-foreground">
                        <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50"/>
                        <p>Турниры не найдены</p>
                    </div>
                ) : (
                    filteredTournaments.map((tournament, index) => (
                        <Link
                            key={tournament.id}
                            href={`/tournaments/${tournament.slug}`}
                            className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500"
                            style={{animationDelay: `${index * 100}ms`}}
                        >
                            <div className="flex flex-col md:flex-row">
                                {/* Image */}
                                <div className="relative w-full md:w-80 h-48 md:h-auto overflow-hidden">
                                    <Image
                                        src={tournament.image || "/placeholder.svg?height=200&width=320&query=esports tournament"}
                                        alt={tournament.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent to-card/80 md:block hidden"/>

                                    {/* Status Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span
                                            className={cn(
                                                "px-3 py-1 text-xs font-semibold rounded-full border",
                                                statusConfig[tournament.status as TournamentStatus]?.color,
                                            )}
                                        >
                                            {statusConfig[tournament.status as TournamentStatus]?.label}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-1 p-6 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded">
                                                {tournament.game.name}
                                            </span>
                                            {tournament.streamUrl && (
                                                <span className="flex items-center gap-1 text-red-400 text-xs">
                                                    <Play className="w-3 h-3"/>
                                                    LIVE
                                                </span>
                                            )}
                                        </div>

                                        <h2 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                            {tournament.name}
                                        </h2>

                                        {tournament.description && (
                                            <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{tournament.description}</p>
                                        )}
                                    </div>

                                    {/* Meta */}
                                    <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4"/>
                                            {new Date(tournament.date).toLocaleDateString("ru-RU", {
                                                day: "numeric",
                                                month: "long",
                                            })}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4"/>
                                            {tournament.time}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4"/>
                                            {tournament.currentParticipants}/{tournament.maxParticipants}
                                        </div>
                                        <div className="flex items-center gap-2 text-primary font-semibold">
                                            <Trophy className="w-4 h-4"/>
                                            {tournament.prize}
                                        </div>
                                    </div>
                                </div>

                                {/* Arrow */}
                                <div className="hidden md:flex items-center pr-6">
                                    <ChevronRight
                                        className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all"/>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    )
}
