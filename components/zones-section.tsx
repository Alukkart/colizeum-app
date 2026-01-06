"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Check, Monitor, Cpu, Headphones, ArrowRight, Loader2 } from "lucide-react"
import useSWR from "swr"

interface ZoneSpec {
    id: number
    label: string
    value: string
}

interface Zone {
    id: number
    slug: string
    name: string
    description: string
    image: string
    price: string
    color: string
    specs: ZoneSpec[]
}

const fallbackZones: Zone[] = [
    {
        id: 1,
        slug: "standard",
        name: "Standard",
        description: "Идеально для повседневной игры и тренировок",
        image: "/gaming-pc-setup-standard-zone-dark-ambient.jpg",
        specs: [
            { id: 1, label: "GPU", value: "RTX 4060 Ti" },
            { id: 2, label: "CPU", value: "Intel i5-13400F" },
            { id: 3, label: "Monitor", value: "144Hz монитор" },
        ],
        price: "150₽/час",
        color: "from-blue-500/20 to-blue-600/10",
    },
    {
        id: 2,
        slug: "bootcamp",
        name: "Bootcamp",
        description: "Для серьёзных тренировок и командной игры",
        image: "/pro-gaming-bootcamp-setup-dark-neon.jpg",
        specs: [
            { id: 4, label: "GPU", value: "RTX 4070 Ti" },
            { id: 5, label: "CPU", value: "Intel i7-13700K" },
            { id: 6, label: "Monitor", value: "240Hz монитор" },
        ],
        price: "250₽/час",
        color: "from-primary/20 to-primary/10",
    },
    {
        id: 3,
        slug: "vip",
        name: "VIP",
        description: "Приватные кабины с топовым оборудованием",
        image: "/vip-gaming-room-luxury-dark-purple-neon.jpg",
        specs: [
            { id: 7, label: "GPU", value: "RTX 4090" },
            { id: 8, label: "CPU", value: "Intel i9-14900K" },
            { id: 9, label: "Monitor", value: "360Hz монитор" },
        ],
        price: "400₽/час",
        color: "from-amber-500/20 to-amber-600/10",
    },
]

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function ZonesSection() {
    const { data: dbZones, isLoading } = useSWR<Zone[]>("/api/zones", fetcher)

    const zones = dbZones && dbZones.length > 0 ? dbZones : fallbackZones
    const [activeZone, setActiveZone] = useState<Zone | null>(null)
    const [isHovered, setIsHovered] = useState<string | null>(null)
    const sectionRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (zones.length > 0 && !activeZone) {
            setActiveZone(zones[1] || zones[0])
        }
    }, [zones, activeZone])

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.2 },
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    const getSpecValues = (zone: Zone) => {
        if (zone.specs && zone.specs.length > 0) {
            return zone.specs.map((s) => s.value)
        }
        return []
    }

    return (
        <section id="zones" ref={sectionRef} className="relative py-32 bg-card">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div
                    className={`text-center mb-16 transition-all duration-700 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                >
                    <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">Оборудование</span>
                    <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 text-balance">Игровые зоны</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Выберите уровень, который соответствует вашим амбициям
                    </p>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 text-primary animate-spin" />
                    </div>
                ) : (
                    <>
                        {/* Zone Tabs */}
                        <div
                            className={`flex justify-center gap-4 mb-12 transition-all duration-700 delay-200 ${
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                            }`}
                        >
                            {zones.map((zone) => (
                                <button
                                    key={zone.id}
                                    onClick={() => setActiveZone(zone)}
                                    className={cn(
                                        "px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300",
                                        activeZone?.id === zone.id
                                            ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                                            : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                                    )}
                                >
                                    {zone.name}
                                </button>
                            ))}
                        </div>

                        {/* Zone Cards */}
                        <div
                            className={`grid lg:grid-cols-3 gap-6 transition-all duration-700 delay-400 ${
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                            }`}
                        >
                            {zones.map((zone) => (
                                <Link
                                    key={zone.id}
                                    href={`/zones/${zone.slug}`}
                                    onMouseEnter={() => setIsHovered(zone.slug)}
                                    onMouseLeave={() => setIsHovered(null)}
                                    onClick={() => setActiveZone(zone)}
                                    className={cn(
                                        "group relative overflow-hidden rounded-2xl border transition-all duration-500 cursor-pointer block",
                                        activeZone?.id === zone.id
                                            ? "border-primary shadow-[0_0_40px_rgba(34,197,94,0.15)] scale-[1.02]"
                                            : "border-border hover:border-primary/50",
                                    )}
                                >
                                    {/* Image */}
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={zone.image || "/placeholder.svg?height=400&width=600&query=gaming setup dark"}
                                            alt={zone.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className={`absolute inset-0 bg-gradient-to-t ${zone.color} to-transparent`} />
                                        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

                                        {/* Price Badge */}
                                        <div className="absolute top-4 right-4 px-3 py-1.5 bg-background/90 backdrop-blur-sm rounded-full">
                                            <span className="text-sm font-bold text-primary">{zone.price}</span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-2xl font-bold text-foreground">{zone.name}</h3>
                                            <ArrowRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
                                        </div>
                                        <p className="text-muted-foreground text-sm mb-6">{zone.description}</p>

                                        {/* Specs */}
                                        <ul className="space-y-3">
                                            {getSpecValues(zone)
                                                .slice(0, 4)
                                                .map((spec, idx) => (
                                                    <li key={idx} className="flex items-center gap-3 text-sm">
                                                        <Check className="w-4 h-4 text-primary shrink-0" />
                                                        <span className="text-secondary-foreground">{spec}</span>
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>

                                    {/* Hover Glow */}
                                    <div
                                        className={cn(
                                            "absolute inset-0 pointer-events-none transition-opacity duration-500",
                                            isHovered === zone.slug ? "opacity-100" : "opacity-0",
                                        )}
                                    >
                                        <div className="absolute inset-0 bg-linear-to-t from-primary/5 to-transparent" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </>
                )}

                {/* Bottom Features */}
                <div
                    className={`grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-border transition-all duration-700 delay-600 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                >
                    {[
                        { icon: Monitor, label: "4K Мониторы", desc: "До 360Hz" },
                        { icon: Cpu, label: "RTX 4000", desc: "Серия видеокарт" },
                        { icon: Headphones, label: "Шумоподавление", desc: "Премиум аудио" },
                    ].map((feature) => (
                        <div key={feature.label} className="text-center group">
                            <feature.icon className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                            <div className="font-semibold text-foreground">{feature.label}</div>
                            <div className="text-sm text-muted-foreground">{feature.desc}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
