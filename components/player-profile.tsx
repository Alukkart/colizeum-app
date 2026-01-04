"use client"

import { useState, useEffect } from "react"
import {
  Trophy,
  Target,
  Flame,
  Clock,
  TrendingUp,
  Calendar,
  Medal,
  Gamepad2,
  Swords,
  Shield,
  Crown,
  Star,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

// Mock player data
const playerData = {
  shadowblade: {
    nickname: "ShadowBlade",
    realName: "Александр К.",
    avatar: "/gamer-avatar-cyberpunk-male.jpg",
    banner: "/cs2-esports-tournament-dark.jpg",
    rank: 1,
    rating: 2847,
    level: 42,
    mainGame: "Counter-Strike 2",
    status: "online",
    memberSince: "Март 2024",
    totalHours: 1247,
    bio: "Профессиональный игрок CS2. Капитан команды COLIZEUM Esports. Мечтаю о Major.",
    stats: {
      wins: 156,
      losses: 47,
      winRate: 76.8,
      kills: 4521,
      deaths: 2134,
      kd: 2.12,
      headshots: 2876,
      hsPercent: 63.6,
      avgScore: 24.7,
      clutches: 89,
      mvps: 234,
    },
    achievements: [
      { id: 1, name: "Чемпион COLIZEUM Cup", icon: Crown, date: "Декабрь 2025", rarity: "legendary" },
      { id: 2, name: "100 побед подряд", icon: Flame, date: "Ноябрь 2025", rarity: "epic" },
      { id: 3, name: "MVP турнира", icon: Star, date: "Октябрь 2025", rarity: "epic" },
      { id: 4, name: "Убийца AWP", icon: Target, date: "Сентябрь 2025", rarity: "rare" },
      { id: 5, name: "Первая кровь", icon: Swords, date: "Март 2024", rarity: "common" },
    ],
    recentMatches: [
      { id: 1, game: "CS2", map: "Mirage", result: "win", score: "16-12", kda: "24/8/5", date: "Сегодня" },
      { id: 2, game: "CS2", map: "Inferno", result: "win", score: "16-9", kda: "21/6/8", date: "Сегодня" },
      { id: 3, game: "CS2", map: "Dust2", result: "loss", score: "14-16", kda: "18/15/4", date: "Вчера" },
      { id: 4, game: "CS2", map: "Ancient", result: "win", score: "16-7", kda: "28/4/3", date: "Вчера" },
      { id: 5, game: "CS2", map: "Anubis", result: "win", score: "16-14", kda: "19/12/6", date: "2 дня назад" },
    ],
    tournaments: [
      { id: 1, name: "COLIZEUM Cup CS2", placement: 1, prize: "100 000 ₽", date: "Декабрь 2025" },
      { id: 2, name: "Winter Championship", placement: 2, prize: "50 000 ₽", date: "Ноябрь 2025" },
      { id: 3, name: "Pro League S3", placement: 1, prize: "75 000 ₽", date: "Октябрь 2025" },
    ],
    games: [
      { name: "Counter-Strike 2", hours: 847, rank: "Global Elite" },
      { name: "Valorant", hours: 234, rank: "Immortal 2" },
      { name: "Dota 2", hours: 166, rank: "Divine 3" },
    ],
  },
}

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

export function PlayerProfile({ username }: { username: string }) {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState<"stats" | "matches" | "tournaments" | "achievements">("stats")

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const player = playerData[username.toLowerCase() as keyof typeof playerData] || playerData.shadowblade

  return (
    <div className="pt-20 pb-20">
      {/* Banner & Avatar Section */}
      <div className="relative">
        {/* Banner */}
        <div className="h-64 md:h-80 overflow-hidden">
          <img src={player.banner || "/placeholder.svg"} alt="Banner" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
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
              <div className="w-36 h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden border-4 border-background shadow-2xl">
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
              <div className="absolute -top-2 -right-2 px-3 py-1 bg-primary text-primary-foreground text-sm font-bold rounded-full">
                #{player.rank}
              </div>
            </div>

            {/* Player Info */}
            <div className="flex-1 pb-2">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-black text-foreground">{player.nickname}</h1>
                <span className="px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full">
                  Уровень {player.level}
                </span>
              </div>
              <p className="text-muted-foreground mb-3">{player.realName}</p>
              <p className="text-secondary-foreground max-w-xl">{player.bio}</p>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-6 pb-2">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-black text-primary">{player.rating}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Рейтинг</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-black text-foreground">{player.stats.wins}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Побед</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-black text-foreground">{player.stats.winRate}%</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Винрейт</div>
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
            { value: "stats", label: "Статистика", icon: Target },
            { value: "matches", label: "Матчи", icon: Gamepad2 },
            { value: "tournaments", label: "Турниры", icon: Trophy },
            { value: "achievements", label: "Достижения", icon: Medal },
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
              <tab.icon className="w-4 h-4" />
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
            {/* Stats Tab */}
            {activeTab === "stats" && (
              <div className="space-y-6">
                {/* Main Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "K/D", value: player.stats.kd, icon: Swords, color: "text-red-400" },
                    { label: "Хэдшоты", value: `${player.stats.hsPercent}%`, icon: Target, color: "text-amber-400" },
                    { label: "Клатчи", value: player.stats.clutches, icon: Shield, color: "text-blue-400" },
                    { label: "MVP", value: player.stats.mvps, icon: Star, color: "text-purple-400" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="group p-5 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-300"
                    >
                      <stat.icon
                        className={cn("w-6 h-6 mb-3 group-hover:scale-110 transition-transform", stat.color)}
                      />
                      <div className="text-2xl font-black text-foreground">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Detailed Stats */}
                <div className="p-6 bg-card rounded-xl border border-border">
                  <h3 className="text-lg font-bold text-foreground mb-6">Детальная статистика</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {[
                      { label: "Всего убийств", value: player.stats.kills.toLocaleString() },
                      { label: "Всего смертей", value: player.stats.deaths.toLocaleString() },
                      { label: "Хэдшоты", value: player.stats.headshots.toLocaleString() },
                      { label: "Средний счёт", value: player.stats.avgScore },
                      { label: "Побед", value: player.stats.wins },
                      { label: "Поражений", value: player.stats.losses },
                    ].map((stat) => (
                      <div key={stat.label} className="flex flex-col">
                        <span className="text-sm text-muted-foreground mb-1">{stat.label}</span>
                        <span className="text-xl font-bold text-foreground">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Games */}
                <div className="p-6 bg-card rounded-xl border border-border">
                  <h3 className="text-lg font-bold text-foreground mb-6">Игры</h3>
                  <div className="space-y-4">
                    {player.games.map((game) => (
                      <div
                        key={game.name}
                        className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors"
                      >
                        <div>
                          <div className="font-semibold text-foreground">{game.name}</div>
                          <div className="text-sm text-muted-foreground">{game.hours} часов</div>
                        </div>
                        <div className="px-3 py-1.5 bg-primary/20 text-primary text-sm font-medium rounded-full">
                          {game.rank}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Matches Tab */}
            {activeTab === "matches" && (
              <div className="p-6 bg-card rounded-xl border border-border">
                <h3 className="text-lg font-bold text-foreground mb-6">Последние матчи</h3>
                <div className="space-y-3">
                  {player.recentMatches.map((match) => (
                    <div
                      key={match.id}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-lg border transition-all duration-300 hover:scale-[1.01]",
                        match.result === "win"
                          ? "bg-green-500/10 border-green-500/30"
                          : "bg-red-500/10 border-red-500/30",
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={cn(
                            "w-2 h-12 rounded-full",
                            match.result === "win" ? "bg-green-500" : "bg-red-500",
                          )}
                        />
                        <div>
                          <div className="font-semibold text-foreground">{match.map}</div>
                          <div className="text-sm text-muted-foreground">{match.game}</div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-foreground">{match.score}</div>
                        <div className="text-xs text-muted-foreground">Счёт</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-foreground">{match.kda}</div>
                        <div className="text-xs text-muted-foreground">K/D/A</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">{match.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
                          <div className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {tournament.name}
                          </div>
                          <div className="text-sm text-muted-foreground">{tournament.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-primary">{tournament.prize}</div>
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
                {player.achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="group relative p-5 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-300 overflow-hidden"
                  >
                    {/* Gradient Background */}
                    <div
                      className={cn(
                        "absolute inset-0 opacity-10 bg-gradient-to-br",
                        rarityColors[achievement.rarity as keyof typeof rarityColors],
                      )}
                    />
                    <div className="relative flex items-center gap-4">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br",
                          rarityColors[achievement.rarity as keyof typeof rarityColors],
                        )}
                      >
                        <achievement.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{achievement.name}</div>
                        <div className="text-sm text-muted-foreground">{achievement.date}</div>
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
                  <Gamepad2 className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Основная игра</div>
                    <div className="font-medium text-foreground">{player.mainGame}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">В клубе с</div>
                    <div className="font-medium text-foreground">{player.memberSince}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Часов в клубе</div>
                    <div className="font-medium text-foreground">{player.totalHours.toLocaleString()}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-muted-foreground" />
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
                <button onClick={() => setActiveTab("achievements")} className="text-sm text-primary hover:underline">
                  Все
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {player.achievements.slice(0, 4).map((achievement) => (
                  <div
                    key={achievement.id}
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br",
                      rarityColors[achievement.rarity as keyof typeof rarityColors],
                    )}
                    title={achievement.name}
                  >
                    <achievement.icon className="w-5 h-5 text-white" />
                  </div>
                ))}
                {player.achievements.length > 4 && (
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-secondary text-secondary-foreground text-sm font-medium">
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
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
