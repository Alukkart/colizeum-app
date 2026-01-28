"use client"

import type React from "react"

import {useState} from "react"
import Image from "next/image"
import Link from "next/link"
import {
    Users,
    Trophy,
    Calendar,
    Swords,
    Medal,
    MapPin,
    Timer,
    Gamepad2,
} from "lucide-react"
import {cn} from "@/lib/utils"
import {notFound} from "next/navigation";
import {TeamFull} from "@/service/DTO/team";

const tabs = ["Состав", "Матчи", "Турниры", "О команде"]

export function TeamDetail({team}: { team: TeamFull }) {
    const [activeTab, setActiveTab] = useState("Состав")

    if (!team) {
        return notFound()
    }
    const rating = team.players.length ? Math.round(team.players.reduce((acc, player) => acc + player.user.rating, 0)) : 0
    const allMatches = [...team.matchesAsA, ...team.matchesAsB]

    const matches = allMatches.map((m) => {
        const isTeamA = m.teamAId === team.id
        // @ts-ignore
        const opponent = isTeamA ? m.teamB : m.teamA

        return {
            id: m.id,
            map: m.map,
            duration: m.duration,
            playedAt: m.startTime,
            isWin: m.winnerId === team.id,
            winner: m.winnerId !== null,
            score:
                m.scoreA !== null && m.scoreB !== null
                    ? isTeamA
                        ? `${m.scoreA}:${m.scoreB}`
                        : `${m.scoreB}:${m.scoreA}`
                    : "VS",
            opponent: {
                tag: opponent.tag,
                name: opponent.name,
                logo: opponent.logo,
                slug: opponent.tag,
            },
            tournament: m.tournament
                ? {
                    name: m.tournament.name,
                    slug: m.tournament.slug,
                }
                : undefined,
        }
    })

    const wins = matches.filter(m => m.isWin).length
    const losses = matches.filter(m => !m.isWin).length
    const winRate = matches.length ? Math.round((wins / matches.length) * 100) : 0

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            {/* Hero Banner */}
            <div className="relative rounded-3xl overflow-hidden mb-8">
                <div className="py-6 md:py-10">
                    <div className="flex flex-col md:flex-row md:items-end gap-6">
                        {/* Logo */}
                        <div
                            className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border-4 border-background shadow-2xl bg-card">
                            <Image
                                src={team.logo || "/placeholder.svg?height=128&width=128&query=esports team logo"}
                                alt={team.name}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <span
                                    className="px-3 py-1 bg-primary/20 text-primary text-sm font-bold rounded-lg border border-primary/30">
                                  {team.tag}
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-5xl font-black text-foreground mb-4">{team.name}</h1>

                            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5"/>
                                    {team.players.length} игроков
                                </div>
                                <div className="flex items-center gap-2">
                                    <Trophy className="w-5 h-5 text-amber-400"/>
                                    {wins} побед
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5"/>
                                    {new Date(team.createdAt).getFullYear()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-card border border-border rounded-2xl p-6 text-center">
                    <div className="text-3xl font-black text-primary mb-1">{rating}</div>
                    <div className="text-sm text-muted-foreground">Рейтинг</div>
                </div>
                <div className="bg-card border border-border rounded-2xl p-6 text-center">
                    <div className="text-3xl font-black text-emerald-400 mb-1">{wins}</div>
                    <div className="text-sm text-muted-foreground">Побед</div>
                </div>
                <div className="bg-card border border-border rounded-2xl p-6 text-center">
                    <div className="text-3xl font-black text-red-400 mb-1">{losses}</div>
                    <div className="text-sm text-muted-foreground">Поражений</div>
                </div>
                <div className="bg-card border border-border rounded-2xl p-6 text-center">
                    <div className="text-3xl font-black text-foreground mb-1">{winRate}%</div>
                    <div className="text-sm text-muted-foreground">Винрейт</div>
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
                {activeTab === "Состав" && (
                    <div className="space-y-8">
                        {/* Players */}
                        <div>
                            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                                <Gamepad2 className="w-5 h-5 text-primary"/>
                                Игроки
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {team.players.map((member) => (
                                    <Link
                                        key={member.id}
                                        href={`/profile/${member.user.nickname}`}
                                        className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-border group-hover:border-primary transition-colors">
                                                    <Image
                                                        src={member.user.avatar || "/placeholder.svg?height=64&width=64&query=gamer"}
                                                        alt={member.user.nickname}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-bold text-foreground truncate">{member.user.nickname}</h3>
                                                </div>
                                            </div>

                                            <div className="text-right">
                                                <div className="text-lg font-bold text-foreground">{member.user.rating}</div>
                                                <div className="text-xs text-muted-foreground">Рейтинг</div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "Матчи" && (
                    <div className="space-y-4">
                        {matches.length === 0 ? (
                            <div
                                className="bg-card border border-border rounded-2xl p-12 text-center text-muted-foreground">
                                <Swords className="w-12 h-12 mx-auto mb-4 opacity-50"/>
                                <p>История матчей пуста</p>
                            </div>
                        ) : (
                            matches.map((match) => {
                                return (
                                    <div key={match.id} className="bg-card border border-border rounded-2xl p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                {
                                                    match.tournament && (
                                                        <span
                                                            className="px-2 py-1 bg-primary/10 text-primary rounded-md font-medium">
                                                            {match.tournament.name}
                                                        </span>
                                                    )
                                                }
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
                                            <div className="flex items-center gap-2">
                                                {match.tournament && (
                                                    <Link
                                                        href={`/tournaments/${match.tournament.slug}`}
                                                        className="text-xs text-muted-foreground hover:text-primary transition-colors"
                                                    >
                                                        {match.tournament.name}
                                                    </Link>
                                                )}
                                                {
                                                    match.playedAt && (
                                                        <span className="text-xs text-muted-foreground">
                                                            {new Date(match.playedAt).toLocaleDateString("ru-RU")}
                                                        </span>
                                                    )
                                                }
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            {/* Our team */}
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-primary">
                                                    <Image
                                                        src={team.logo || "/placeholder.svg?height=48&width=48&query=team"}
                                                        alt={team.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <p className={cn("font-bold", match.isWin ? "text-emerald-400" : "text-foreground")}>
                                                        {team.tag}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">{team.name}</p>
                                                </div>
                                            </div>

                                            {/* Score */}
                                            <div className="text-center px-6">
                                                <div
                                                    className={cn(
                                                        "text-2xl font-black",
                                                        match.isWin ? "text-emerald-400" : match.winner ? "text-red-400" : "text-foreground",
                                                    )}
                                                >
                                                    {match.score || "VS"}
                                                </div>

                                                <span
                                                    className={cn(
                                                        "text-xs font-semibold",
                                                        match.isWin ? "text-emerald-400" : "text-red-400",
                                                    )}
                                                >
                                                    {match.isWin ? "ПОБЕДА" : "ПОРАЖЕНИЕ"}
                                                </span>

                                            </div>

                                            {/* Opponent */}
                                            <Link
                                                href={`/teams/${match.opponent.slug}`}
                                                className="flex items-center gap-3 group flex-row-reverse"
                                            >
                                                <div
                                                    className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-border group-hover:border-primary transition-colors">
                                                    <Image
                                                        src={match.opponent.logo || "/placeholder.svg?height=48&width=48&query=team"}
                                                        alt={match.opponent.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="text-right">
                                                    <p
                                                        className={cn(
                                                            "font-bold",
                                                            !match.isWin ? "text-emerald-400" : "text-foreground",
                                                        )}
                                                    >
                                                        {match.opponent.tag}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">{match.opponent.name}</p>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                )}

                {activeTab === "Турниры" && (
                    <div className="space-y-4">
                        {team.tournaments.length === 0 ? (
                            <div
                                className="bg-card border border-border rounded-2xl p-12 text-center text-muted-foreground">
                                <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50"/>
                                <p>Команда ещё не участвовала в турнирах</p>
                            </div>
                        ) : (
                            team.tournaments.map((entry) => (
                                <Link
                                    key={entry.id}
                                    href={`/tournaments/${entry.tournament.slug}`}
                                    className="block bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            {entry.placement && entry.placement <= 3 ? (
                                                <div
                                                    className={cn(
                                                        "w-12 h-12 rounded-xl flex items-center justify-center",
                                                        entry.placement === 1 && "bg-amber-500/20",
                                                        entry.placement === 2 && "bg-zinc-400/20",
                                                        entry.placement === 3 && "bg-amber-700/20",
                                                    )}
                                                >
                                                    <Medal
                                                        className={cn(
                                                            "w-6 h-6",
                                                            entry.placement === 1 && "text-amber-400",
                                                            entry.placement === 2 && "text-zinc-400",
                                                            entry.placement === 3 && "text-amber-700",
                                                        )}
                                                    />
                                                </div>
                                            ) : (
                                                <div
                                                    className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                                                    <Trophy className="w-6 h-6 text-muted-foreground"/>
                                                </div>
                                            )}

                                            <div>
                                                <h3 className="font-bold text-foreground">{entry.tournament.name}</h3>
                                                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                                    <span
                                                        className="px-2 py-0.5 bg-primary/10 text-primary rounded-md text-xs">
                                                        {entry.tournament.game.name}
                                                    </span>
                                                    <span>
                                                        {new Date(entry.tournament.date).toLocaleDateString("ru-RU", {
                                                            day: "numeric",
                                                            month: "short",
                                                            year: "numeric",
                                                        })}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            {entry.placement && (
                                                <div
                                                    className={cn(
                                                        "text-2xl font-black",
                                                        entry.placement === 1 && "text-amber-400",
                                                        entry.placement === 2 && "text-zinc-400",
                                                        entry.placement === 3 && "text-amber-700",
                                                        entry.placement > 3 && "text-muted-foreground",
                                                    )}
                                                >
                                                    #{entry.placement}
                                                </div>
                                            )}
                                            {entry.tournament.prize && (
                                                <div
                                                    className="text-sm text-primary font-semibold">{entry.tournament.prize}</div>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                )}

                {activeTab === "О команде" && (
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-6">
                            <div className="bg-card border border-border rounded-2xl p-6">
                                <h2 className="text-xl font-bold text-foreground mb-4">О команде</h2>
                            </div>

                            {/* Achievements summary */}
                            <div className="bg-card border border-border rounded-2xl p-6">
                                <h2 className="text-xl font-bold text-foreground mb-4">Достижения</h2>
                                <div className="grid grid-cols-3 gap-4">
                                    <div
                                        className="text-center p-4 bg-amber-500/10 rounded-xl border border-amber-500/20">
                                        <Medal className="w-8 h-8 mx-auto mb-2 text-amber-400"/>
                                        <div className="text-2xl font-black text-amber-400">
                                            {team.tournaments.filter((t) => t.placement === 1).length}
                                        </div>
                                        <div className="text-xs text-muted-foreground">Первых мест</div>
                                    </div>
                                    <div
                                        className="text-center p-4 bg-zinc-400/10 rounded-xl border border-zinc-400/20">
                                        <Medal className="w-8 h-8 mx-auto mb-2 text-zinc-400"/>
                                        <div className="text-2xl font-black text-zinc-400">
                                            {team.tournaments.filter((t) => t.placement === 2).length}
                                        </div>
                                        <div className="text-xs text-muted-foreground">Вторых мест</div>
                                    </div>
                                    <div
                                        className="text-center p-4 bg-amber-700/10 rounded-xl border border-amber-700/20">
                                        <Medal className="w-8 h-8 mx-auto mb-2 text-amber-700"/>
                                        <div className="text-2xl font-black text-amber-700">
                                            {team.tournaments.filter((t) => t.placement === 3).length}
                                        </div>
                                        <div className="text-xs text-muted-foreground">Третьих мест</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <div className="bg-card border border-border rounded-2xl p-6">
                                <h3 className="font-bold text-foreground mb-4">Информация</h3>
                                <div className="space-y-4">
                                    {team.createdAt && (
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">Основана</span>
                                            <span className="text-foreground font-medium">
                                                {new Date(team.createdAt).toLocaleDateString("ru-RU", {
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </span>
                                        </div>
                                    )}
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Игроков</span>
                                        <span className="text-foreground font-medium">{team.players.length}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Турниров</span>
                                        <span className="text-foreground font-medium">{team.tournaments.length}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-card border border-border rounded-2xl p-6">
                                <h3 className="font-bold text-foreground mb-4">Статистика</h3>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Винрейт</span>
                                        <span className="text-lg font-bold text-foreground">{winRate}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-linear-to-r from-emerald-500 to-primary rounded-full"
                                            style={{width: `${winRate}%`}}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
