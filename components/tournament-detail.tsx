"use client"

import type React from "react"

import {useState} from "react"
import Image from "next/image"
import Link from "next/link"
import {
    Calendar,
    Clock,
    Users,
    Trophy,
    Play,
    ArrowLeft,
    CheckCircle,
    Medal,
    Swords,
    MapPin,
    Timer,
} from "lucide-react"
import {cn} from "@/lib/utils"
import useSWR from "swr";
import {fetcher} from "@/constants/fetcher";
import {notFound} from "next/navigation";
import {Player, TournamentPlayer} from "@/prisma/generated/client";

interface Participant extends TournamentPlayer {
    player: Player
}

interface Match {
    id: string
    game: string
    map?: string
    score?: string
    duration?: number
    playedAt: string
    player1Username: string
    player1Nickname: string
    player1Avatar?: string
    player2Username: string
    player2Nickname: string
    player2Avatar?: string
    winnerUsername?: string
}

interface Tournament {
    id: string
    slug: string
    name: string
    game: string
    description?: string
    date: string
    time: string
    status: string
    prize: string
    maxParticipants: number
    currentParticipants: number
    image?: string
    rules?: string
    streamUrl?: string
    participants: Participant[]
    matches: Match[]
}

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
    REGISTRATION: {label: "Регистрация открыта", color: "text-emerald-400", icon: CheckCircle},
    ONGOING: {label: "Турнир идёт", color: "text-amber-400", icon: Play},
    COMPLETED: {label: "Завершён", color: "text-zinc-400", icon: Trophy},
    CANCELLED: {label: "Отменён", color: "text-red-400", icon: CheckCircle},
}

const tabs = ["Обзор", "Участники", "Матчи", "Правила"]

export function TournamentDetail({slug}: { slug: string }) {
    const [activeTab, setActiveTab] = useState("Обзор")
    const {data: tournament, isLoading} = useSWR<Tournament>(`/api/tournaments/${slug}`, fetcher)

    if (!tournament && !isLoading) {
        return notFound()
    }

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto px-6 py-12">
                <p className="text-center text-muted-foreground">Загрузка турнира...</p>
            </div>
        )
    }

    if(!tournament){
        return null
    }

    const StatusIcon = statusConfig[tournament.status]?.icon || CheckCircle

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            {/* Back Link */}
            <Link
                href="/tournaments"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
                <ArrowLeft className="w-4 h-4"/>
                Все турниры
            </Link>

            {/* Hero */}
            <div className="relative rounded-3xl overflow-hidden mb-8">
                <div className="relative h-64 md:h-96">
                    <Image
                        src={tournament.image || "/placeholder.svg?height=400&width=1200&query=esports tournament arena"}
                        alt={tournament.name}
                        fill
                        className="object-cover"
                    />
                    <div
                        className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent"/>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-primary/20 text-primary text-sm font-semibold rounded-lg border border-primary/30">
                            {tournament.game}
                        </span>
                        <span
                            className={cn("flex items-center gap-2 text-sm font-medium", statusConfig[tournament.status]?.color)}>
                            <StatusIcon className="w-4 h-4"/>
                            {statusConfig[tournament.status]?.label}
                        </span>
                        {tournament.streamUrl && tournament.status === "ONGOING" && (
                            <a
                                href={tournament.streamUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-3 py-1 bg-red-500/20 text-red-400 text-sm font-semibold rounded-lg border border-red-500/30 hover:bg-red-500/30 transition-colors"
                            >
                                <Play className="w-3 h-3"/>
                                СМОТРЕТЬ
                            </a>
                        )}
                    </div>

                    <h1 className="text-3xl md:text-5xl font-black text-foreground mb-4">{tournament.name}</h1>

                    <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5"/>
                            {new Date(tournament.date).toLocaleDateString("ru-RU", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5"/>
                            {tournament.time}
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="w-5 h-5"/>
                            {tournament.currentParticipants}/{tournament.maxParticipants} участников
                        </div>
                        <div className="flex items-center gap-2 text-primary text-lg font-bold">
                            <Trophy className="w-5 h-5"/>
                            {tournament.prize}
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 mb-8 p-1 bg-card rounded-xl border border-border overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                            "flex-1 px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300 whitespace-nowrap",
                            activeTab === tab
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted",
                        )}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-100">
                {activeTab === "Обзор" && (
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-6">
                            <div className="bg-card border border-border rounded-2xl p-6">
                                <h2 className="text-xl font-bold text-foreground mb-4">О турнире</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    {tournament.description || "Описание турнира скоро будет добавлено."}
                                </p>
                            </div>

                            {/* Top 3 */}
                            {tournament.participants.filter((p) => p.placement && p.placement <= 3).length > 0 && (
                                <div className="bg-card border border-border rounded-2xl p-6">
                                    <h2 className="text-xl font-bold text-foreground mb-4">Призёры</h2>
                                    <div className="grid grid-cols-3 gap-4">
                                        {[2, 1, 3].map((place) => {
                                            const winner = tournament.participants.find((p) => p.placement === place)
                                            if (!winner) return null
                                            return (
                                                <div
                                                    key={place}
                                                    className={cn(
                                                        "text-center p-4 rounded-xl",
                                                        place === 1 && "bg-amber-500/10 border border-amber-500/30",
                                                        place === 2 && "bg-zinc-400/10 border border-zinc-400/30",
                                                        place === 3 && "bg-amber-700/10 border border-amber-700/30",
                                                    )}
                                                >
                                                    <Medal
                                                        className={cn(
                                                            "w-8 h-8 mx-auto mb-2",
                                                            place === 1 && "text-amber-400",
                                                            place === 2 && "text-zinc-400",
                                                            place === 3 && "text-amber-700",
                                                        )}
                                                    />
                                                    <div
                                                        className="relative w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden border-2 border-border">
                                                        <Image
                                                            src={winner.player.avatar || "/placeholder.svg?height=64&width=64&query=gamer avatar"}
                                                            alt={winner.player.nickname}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <p className="font-bold text-foreground">{winner.player.nickname}</p>
                                                    <p className="text-xs text-muted-foreground">@{winner.player.username}</p>
                                                    {winner.prizeWon && (
                                                        <p className="text-sm text-primary font-semibold mt-1">{winner.prizeWon}</p>
                                                    )}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <div className="bg-card border border-border rounded-2xl p-6">
                                <h3 className="font-bold text-foreground mb-4">Призовой фонд</h3>
                                <div className="text-3xl font-black text-primary">{tournament.prize}</div>
                            </div>

                            {tournament.status === "REGISTRATION" && (
                                <button
                                    className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-colors">
                                    Зарегистрироваться
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === "Участники" && (
                    <div className="bg-card border border-border rounded-2xl overflow-hidden">
                        <div
                            className="grid grid-cols-12 gap-4 p-4 bg-muted/50 text-sm font-medium text-muted-foreground border-b border-border">
                            <div className="col-span-1">#</div>
                            <div className="col-span-5">Игрок</div>
                            <div className="col-span-2 text-center">Рейтинг</div>
                            <div className="col-span-2 text-center">Место</div>
                            <div className="col-span-2 text-right">Приз</div>
                        </div>
                        {tournament.participants.length === 0 ? (
                            <div className="p-12 text-center text-muted-foreground">
                                <Users className="w-12 h-12 mx-auto mb-4 opacity-50"/>
                                <p>Участники пока не зарегистрированы</p>
                            </div>
                        ) : (
                            tournament.participants.map((participant, idx) => (
                                <Link
                                    key={participant.id}
                                    href={`/profile/${participant.player.username}`}
                                    className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-muted/30 transition-colors border-b border-border last:border-0"
                                >
                                    <div className="col-span-1 text-muted-foreground">{idx + 1}</div>
                                    <div className="col-span-5 flex items-center gap-3">
                                        <div
                                            className="relative w-10 h-10 rounded-full overflow-hidden border border-border">
                                            <Image
                                                src={participant.player.avatar || "/placeholder.svg?height=40&width=40&query=gamer"}
                                                alt={participant.player.nickname}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground">{participant.player.nickname}</p>
                                            <p className="text-xs text-muted-foreground">@{participant.player.username}</p>
                                        </div>
                                    </div>
                                    <div
                                        className="col-span-2 text-center font-mono text-foreground">{participant.player.rating}</div>
                                    <div className="col-span-2 text-center">
                                        {participant.placement ? (
                                            <span
                                                className={cn(
                                                    "px-2 py-1 rounded text-sm font-bold",
                                                    participant.placement === 1 && "bg-amber-500/20 text-amber-400",
                                                    participant.placement === 2 && "bg-zinc-400/20 text-zinc-400",
                                                    participant.placement === 3 && "bg-amber-700/20 text-amber-600",
                                                    participant.placement > 3 && "text-muted-foreground",
                                                )}
                                            >
                                                #{participant.placement}
                                            </span>
                                        ) : (
                                            <span className="text-muted-foreground">—</span>
                                        )}
                                    </div>
                                    <div className="col-span-2 text-right text-primary font-semibold">{participant.prizeWon || "—"}</div>
                                </Link>
                            ))
                        )}
                    </div>
                )}

                {activeTab === "Матчи" && (
                    <div className="space-y-4">
                        {tournament.matches.length === 0 ? (
                            <div
                                className="bg-card border border-border rounded-2xl p-12 text-center text-muted-foreground">
                                <Swords className="w-12 h-12 mx-auto mb-4 opacity-50"/>
                                <p>Матчи ещё не сыграны</p>
                            </div>
                        ) : (
                            tournament.matches.map((match) => (
                                <div key={match.id} className="bg-card border border-border rounded-2xl p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            {match.map && (
                                                <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4"/>
                                                    {match.map}
                        </span>
                                            )}
                                            {match.duration && (
                                                <span className="flex items-center gap-1">
                          <Timer className="w-4 h-4"/>
                                                    {match.duration} мин
                        </span>
                                            )}
                                        </div>
                                        <span className="text-xs text-muted-foreground">
                      {new Date(match.playedAt).toLocaleDateString("ru-RU")}
                    </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        {/* Player 1 */}
                                        <Link href={`/profile/${match.player1Username}`}
                                              className="flex items-center gap-3 group">
                                            <div
                                                className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-border group-hover:border-primary transition-colors">
                                                <Image
                                                    src={match.player1Avatar || "/placeholder.svg?height=48&width=48&query=gamer"}
                                                    alt={match.player1Nickname}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <p
                                                    className={cn(
                                                        "font-bold",
                                                        match.winnerUsername === match.player1Username ? "text-primary" : "text-foreground",
                                                    )}
                                                >
                                                    {match.player1Nickname}
                                                </p>
                                                <p className="text-xs text-muted-foreground">@{match.player1Username}</p>
                                            </div>
                                        </Link>

                                        {/* Score */}
                                        <div className="text-center px-6">
                                            <div
                                                className="text-2xl font-black text-foreground">{match.score || "VS"}</div>
                                        </div>

                                        {/* Player 2 */}
                                        <Link
                                            href={`/profile/${match.player2Username}`}
                                            className="flex items-center gap-3 group flex-row-reverse"
                                        >
                                            <div
                                                className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-border group-hover:border-primary transition-colors">
                                                <Image
                                                    src={match.player2Avatar || "/placeholder.svg?height=48&width=48&query=gamer"}
                                                    alt={match.player2Nickname}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="text-right">
                                                <p
                                                    className={cn(
                                                        "font-bold",
                                                        match.winnerUsername === match.player2Username ? "text-primary" : "text-foreground",
                                                    )}
                                                >
                                                    {match.player2Nickname}
                                                </p>
                                                <p className="text-xs text-muted-foreground">@{match.player2Username}</p>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {activeTab === "Правила" && (
                    <div className="bg-card border border-border rounded-2xl p-6 md:p-10">
                        <h2 className="text-2xl font-bold text-foreground mb-6">Правила турнира</h2>
                        <div className="prose prose-invert max-w-none">
                            {tournament.rules ? (
                                <div
                                    className="text-muted-foreground whitespace-pre-wrap leading-relaxed">{tournament.rules}</div>
                            ) : (
                                <p className="text-muted-foreground">Правила турнира будут опубликованы позже.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
