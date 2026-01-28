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
    Swords,
    MapPin,
    Timer, Medal,
} from "lucide-react"
import {cn} from "@/lib/utils"
import {notFound} from "next/navigation";
import {TournamentFull} from "@/service/DTO/tournament";

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
    REGISTRATION: {label: "Регистрация открыта", color: "text-emerald-400", icon: CheckCircle},
    ONGOING: {label: "Турнир идёт", color: "text-amber-400", icon: Play},
    COMPLETED: {label: "Завершён", color: "text-zinc-400", icon: Trophy},
    CANCELLED: {label: "Отменён", color: "text-red-400", icon: CheckCircle},
}

const tabs = ["Обзор", "Команды", "Матчи", "Правила"]

export function TournamentDetail({tournament}: { tournament: TournamentFull }) {
    const [activeTab, setActiveTab] = useState("Обзор")

    if (!tournament) {
        return notFound()
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
                            {tournament.game.name}
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
                            {tournament._count.teams}/{tournament.maxParticipants} команд
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
                            {tournament.teams.filter((p) => p.placement && p.placement <= 3).length > 0 && (
                                <div className="bg-card border border-border rounded-2xl p-6">
                                    <h2 className="text-xl font-bold text-foreground mb-4">Призёры</h2>
                                    <div className="grid grid-cols-3 gap-4">
                                        {[2, 1, 3].map((place) => {
                                            const winner = tournament.teams.find((p) => p.placement === place)
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
                                                            src={winner.team.logo || "/placeholder.svg?height=64&width=64&query=gamer avatar"}
                                                            alt={winner.team.name}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <p className="font-bold text-foreground">{winner.team.name}</p>
                                                    <p className="text-xs text-muted-foreground">{winner.team.tag}</p>
                                                    {/*{winner. && (*/}
                                                    {/*    <p className="text-sm text-primary font-semibold mt-1">{winner.prizeWon}</p>*/}
                                                    {/*)}*/}
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

                {activeTab === "Команды" && (
                    <div className="bg-card border border-border rounded-2xl overflow-hidden">
                        <div
                            className="grid grid-cols-12 gap-4 p-4 bg-muted/50 text-sm font-medium text-muted-foreground border-b border-border">
                            <div className="col-span-5">Команда</div>
                            <div className="col-span-2 text-center">Место</div>
                            <div className="col-span-2 text-right">Приз</div>
                        </div>
                        {tournament._count.teams === 0 ? (
                            <div className="p-12 text-center text-muted-foreground">
                                <Users className="w-12 h-12 mx-auto mb-4 opacity-50"/>
                                <p>Команды пока не зарегистрированы</p>
                            </div>
                        ) : (
                            tournament.teams.map((team) => (
                                <Link
                                    key={team.id}
                                    href={`/teams/${team.team.tag}`}
                                    className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-muted/30 transition-colors border-b border-border last:border-0"
                                >
                                    <div className="col-span-5 flex items-center gap-3">
                                        <div
                                            className="relative w-10 h-10 rounded-full overflow-hidden border border-border">
                                            <Image
                                                src={team.team.logo || "/placeholder.svg?height=40&width=40&query=gamer"}
                                                alt={team.team.tag}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground">{team.team.name}</p>
                                            <p className="text-xs text-muted-foreground">{team.team.tag}</p>
                                        </div>
                                    </div>
                                    <div className="col-span-2 text-center">
                                        {team.placement ? (
                                            <span
                                                className={cn(
                                                    "px-2 py-1 rounded text-sm font-bold",
                                                    team.placement === 1 && "bg-amber-500/20 text-amber-400",
                                                    team.placement === 2 && "bg-zinc-400/20 text-zinc-400",
                                                    team.placement === 3 && "bg-amber-700/20 text-amber-600",
                                                    team.placement > 3 && "text-muted-foreground",
                                                )}
                                            >
                                                #{team.placement}
                                            </span>
                                        ) : (
                                            <span className="text-muted-foreground">—</span>
                                        )}
                                    </div>
                                    {/*<div className="col-span-2 text-right text-primary font-semibold">{team.prizeWon || "—"}</div>*/}
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
                                        {
                                            match.startTime && (
                                                <span className="text-xs text-muted-foreground">
                                                    {new Date(match.startTime).toLocaleDateString("ru-RU")}
                                                </span>
                                            )
                                        }
                                    </div>

                                    <div className="flex items-center justify-between">
                                        {/* Team A */}
                                        <Link href={`/teams/${match.teamA.tag}`}
                                              className="flex items-center gap-3 group">
                                            <div
                                                className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-border group-hover:border-primary transition-colors">
                                                <Image
                                                    src={match.teamA.logo || "/placeholder.svg?height=48&width=48&query=gamer"}
                                                    alt={match.teamA.tag}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <p
                                                    className={cn(
                                                        "font-bold",
                                                        match.winnerId === match.teamA.id ? "text-primary" : "text-foreground",
                                                    )}
                                                >
                                                    {match.teamA.name}
                                                </p>
                                                <p className="text-xs text-muted-foreground">{match.teamA.tag}</p>
                                            </div>
                                        </Link>

                                        {/* Score */}
                                        <div className="text-center px-6">
                                            <div className="text-2xl font-black text-foreground">{match.scoreA || "VS"}</div>
                                        </div>

                                        {/* Team B */}
                                        <Link
                                            href={`/teams/${match.teamB.tag}`}
                                            className="flex items-center gap-3 group flex-row-reverse"
                                        >
                                            <div
                                                className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-border group-hover:border-primary transition-colors">
                                                <Image
                                                    src={match.teamB.logo || "/placeholder.svg?height=48&width=48&query=gamer"}
                                                    alt={match.teamB.tag}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="text-right">
                                                <p
                                                    className={cn(
                                                        "font-bold",
                                                        match.winnerId === match.teamB.id ? "text-primary" : "text-foreground",
                                                    )}
                                                >
                                                    {match.teamB.name}
                                                </p>
                                                <p className="text-xs text-muted-foreground">@{match.teamB.tag}</p>
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
