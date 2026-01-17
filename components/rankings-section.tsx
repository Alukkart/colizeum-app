"use client"

import {useRef, useState, useEffect} from "react"
import {cn} from "@/lib/utils"
import {Trophy, Crown, Medal, Award} from "lucide-react"
import Link from "next/link"
import {PlayerExtended} from "@/service/DTO/players";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "./ui/table"

const rankIcons = {
    1: <Crown className="w-5 h-5 text-amber-400"/>,
    2: <Medal className="w-5 h-5 text-gray-400"/>,
    3: <Award className="w-5 h-5 text-amber-600"/>,
}

interface Props {
    players: PlayerExtended[]
}

export function RankingsSection({players}: Props) {
    const sectionRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)

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
        <section id="rankings" ref={sectionRef} className="relative py-32 bg-card">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div
                    className={`text-center mb-12 transition-all duration-700 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                >
                    <span
                        className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">Лидерборд</span>
                    <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 text-balance">Рейтинг
                        игроков</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Лучшие игроки клуба по результатам
                        турниров</p>
                </div>

                {/* Rankings Table */}
                <div className="overflow-hidden rounded-xl border border-border bg-background">
                    <Table>
                        {/* Header */}
                        <TableHeader className="bg-secondary/50">
                            <TableRow>
                                <TableHead className="w-15 text-center">#</TableHead>
                                <TableHead>Игрок</TableHead>
                                <TableHead className="text-center">Рейтинг</TableHead>
                                <TableHead className="text-center">Победы</TableHead>
                            </TableRow>
                        </TableHeader>

                        {/* Body */}
                        <TableBody>
                            {players.map((player, index) => {
                                const displayRank = player.rank || index + 1

                                return (
                                    <TableRow key={player.id}
                                        className={cn(
                                            "transition-colors hover:bg-secondary/30",
                                            displayRank <= 3 && "bg-primary/5",
                                        )}
                                    >
                                        {/* Rank */}
                                        <TableCell className="text-center font-bold">
                                            {displayRank <= 3 ? (
                                                    <span className="text-muted-foreground flex justify-center">
                                                        {rankIcons[displayRank as 1 | 2 | 3]}
                                                    </span>
                                            ) : (
                                                <span className="text-muted-foreground">
                                                  {displayRank}
                                                </span>
                                            )}
                                        </TableCell>

                                        {/* Player */}
                                        <TableCell>
                                            <Link
                                                href={`/profile/${player.username}`}
                                                className="flex items-center gap-4 group"
                                            >
                                                <img
                                                    src={
                                                        player.avatar ||
                                                        "/placeholder.svg?height=48&width=48&query=gamer avatar"
                                                    }
                                                    alt={player.nickname}
                                                    className="w-12 h-12 rounded-full object-cover border-2 border-border group-hover:border-primary transition-colors"
                                                />
                                                <span className="font-bold group-hover:text-primary transition-colors">
                                                  {player.nickname}
                                                </span>
                                            </Link>
                                        </TableCell>

                                        {/* Rating */}
                                        <TableCell className="text-center">
                                          <span className="text-lg font-bold text-primary">
                                            {player.rating}
                                          </span>
                                        </TableCell>

                                        {/* Wins */}
                                        <TableCell className="text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <Trophy className="w-4 h-4 text-amber-500" />
                                                <span className="font-medium">
                                                  {player.wins}
                                                </span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>

                {/* View Full Rankings */}
                <div className="text-center mt-8">
                    <Link
                        href="/rankings"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
                    >
                        Полный рейтинг
                        <Trophy className="w-4 h-4"/>
                    </Link>
                </div>
            </div>
        </section>
    )
}
