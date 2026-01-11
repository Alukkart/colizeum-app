"use client"

import {useState, useEffect} from "react"
import {
    Trophy,
    TrendingUp,
    Medal,
    Gamepad2,
    ChevronRight,
} from "lucide-react"
import {cn} from "@/lib/utils"
import Link from "next/link"
import useSWR from "swr";
import {Player, PlayerAchievement, Tournament, TournamentPlayer} from "@/prisma/generated/client";
import {notFound} from "next/navigation";

const rarityColors = {
    legendary: "from-amber-400 to-orange-500",
    epic: "from-purple-400 to-pink-500",
    rare: "from-blue-400 to-cyan-500",
    common: "from-gray-400 to-gray-500",
}

const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-500",
    ingame: "bg-amber-500",
}

interface TournamentFull extends TournamentPlayer{
    tournament: Tournament
}

interface PlayerProfile extends Player {
    tournaments: TournamentFull[]
    achievements: PlayerAchievement[]
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function PlayerProfile({username}: { username: string }) {
    const {data: player, isLoading} = useSWR<PlayerProfile>(`/api/players/${username}`, fetcher)

    const [isVisible, setIsVisible] = useState(false)
    const [activeTab, setActiveTab] = useState<"tournaments" | "achievements">("tournaments")

    useEffect(() => {
        setIsVisible(true)
    }, [])

    if (!isLoading && !player) {
        notFound()
    }

    if (!player) {
        return null
    }

    return (
        <div className="pt-20 pb-20">
            {/* Banner & Avatar Section */}
            <div className="relative">
                {/* Banner */}
                <div className="h-64 md:h-80 overflow-hidden">
                    <img src={"/placeholder.svg"} alt="Banner" className="w-full h-full object-cover"/>
                    <div
                        className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent"/>
                </div>

                {/* Profile Info Overlay */}
                <div className="max-w-7xl mx-auto px-6">
                    <div
                        className={`relative -mt-24 flex flex-col md:flex-row items-start md:items-end gap-6 transition-all duration-700 ${
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        }`}
                    >
                        {/* Avatar */}
                        <div className="relative">
                            <div
                                className="w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden border-4 border-background shadow-2xl">
                                <img
                                    src={player.avatar || "/placeholder.svg"}
                                    alt={player.nickname}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Status Indicator */}
                            <span
                                className={cn(
                                    "absolute bottom-2 right-2 w-5 h-5 rounded-full border-4 border-background",
                                    statusColors[player.status as keyof typeof statusColors],
                                )}
                            />
                            {/* Rank Badge */}
                            <div
                                className="absolute -top-2 -right-2 px-3 py-1 bg-primary text-primary-foreground text-sm font-bold rounded-full">
                                #{player.rank}
                            </div>
                        </div>

                         {/*Player Info*/}
                        <div className="flex-1 pb-2">
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                <h1 className="text-3xl md:text-4xl font-black text-foreground">{player.nickname}</h1>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="flex gap-6 pb-2">
                            <div className="text-center">
                                <div className="text-2xl md:text-3xl font-black text-primary">{player.rating}</div>
                                <div className="text-xs text-muted-foreground uppercase tracking-wider">Рейтинг</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 mt-12">
                {/* Tabs */}
                <div
                    className={`flex gap-2 mb-8 overflow-x-auto pb-2 transition-all duration-700 delay-200 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                >
                    {[
                        {value: "tournaments", label: "Турниры", icon: Trophy},
                        {value: "achievements", label: "Достижения", icon: Medal},
                    ].map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => setActiveTab(tab.value as typeof activeTab)}
                            className={cn(
                                "flex items-center gap-2 px-5 py-3 rounded-lg font-medium text-sm transition-all duration-300 whitespace-nowrap",
                                activeTab === tab.value
                                    ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                                    : "bg-card text-secondary-foreground hover:bg-card/80 border border-border",
                            )}
                        >
                            <tab.icon className="w-4 h-4"/>
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div
                        className={`lg:col-span-2 transition-all duration-700 delay-300 ${
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        }`}
                    >
                        {/* Tournaments Tab */}
                        {activeTab === "tournaments" && (
                            <div className="p-6 bg-card rounded-xl border border-border">
                                <h3 className="text-lg font-bold text-foreground mb-6">История турниров</h3>
                                <div className="space-y-4">
                                    {player.tournaments.map((tournament) => (
                                        <div
                                            key={tournament.id}
                                            className="flex items-center justify-between p-5 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className={cn(
                                                        "w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl",
                                                        tournament.placement === 1
                                                            ? "bg-amber-500/20 text-amber-400"
                                                            : tournament.placement === 2
                                                                ? "bg-gray-400/20 text-gray-300"
                                                                : "bg-amber-700/20 text-amber-600",
                                                    )}
                                                >
                                                    #{tournament.placement}
                                                </div>
                                                <div>
                                                    <div
                                                        className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                                        {tournament.tournament.name}
                                                    </div>
                                                    <div
                                                        className="text-sm text-muted-foreground">{new Date(tournament.tournament.date).toLocaleDateString()}</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-primary">{tournament.tournament.prize}</div>
                                                <div className="text-xs text-muted-foreground">Приз</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Achievements Tab */}
                        {activeTab === "achievements" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                { player.achievements && player.achievements.length > 0 && player.achievements.map((achievement) => (
                                    <div
                                        key={achievement.id}
                                        className="group relative p-5 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-300 overflow-hidden"
                                    >
                                        {/* Gradient Background */}
                                        <div
                                            className={cn(
                                                "absolute inset-0 opacity-10 bg-linear-to-br",
                                                rarityColors[achievement.rarity as keyof typeof rarityColors],
                                            )}
                                        />
                                        <div className="relative flex items-center gap-4">
                                            <div
                                                className={cn(
                                                    "w-12 h-12 rounded-xl flex items-center justify-center bg-linear-to-br",
                                                    rarityColors[achievement.rarity as keyof typeof rarityColors],
                                                )}
                                            >
                                                {achievement.icon && <achievement.icon/>}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-foreground">{achievement.name}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div
                        className={`space-y-6 transition-all duration-700 delay-400 ${
                            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                        }`}
                    >
                        {/* Info Card */}
                        <div className="p-6 bg-card rounded-xl border border-border">
                            <h3 className="text-lg font-bold text-foreground mb-4">Информация</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Gamepad2 className="w-5 h-5 text-muted-foreground"/>
                                    <div>
                                        <div className="text-sm text-muted-foreground">Основная игра</div>
                                        <div className="font-medium text-foreground">{player.mainGame}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <TrendingUp className="w-5 h-5 text-muted-foreground"/>
                                    <div>
                                        <div className="text-sm text-muted-foreground">Рейтинг</div>
                                        <div className="font-medium text-primary">#{player.rank} в клубе</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Achievements Preview */}
                        <div className="p-6 bg-card rounded-xl border border-border">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-bold text-foreground">Достижения</h3>
                                <button onClick={() => setActiveTab("achievements")}
                                        className="text-sm text-primary hover:underline">
                                    Все
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {player.achievements && player.achievements.length > 0 && player.achievements.slice(0, 4).map((achievement) => (
                                    <div
                                        key={achievement.id}
                                        className={cn(
                                            "w-10 h-10 rounded-lg flex items-center justify-center bg-linear-to-br",
                                            rarityColors[achievement.rarity as keyof typeof rarityColors],
                                        )}
                                        title={achievement.name}
                                    >
                                        {achievement.icon && <achievement.icon/>}
                                    </div>
                                ))}
                                {player.achievements && player.achievements.length > 4 && (
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center bg-secondary text-secondary-foreground text-sm font-medium">
                                        +{player.achievements.length - 4}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Back to Rankings */}
                        <Link
                            href="/#rankings"
                            className="flex items-center justify-between p-4 bg-primary/10 rounded-xl border border-primary/30 text-primary hover:bg-primary/20 transition-colors group"
                        >
                            <span className="font-medium">Рейтинг игроков</span>
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
