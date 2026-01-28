"use client"

import {useEffect, useState} from "react"
import {ChevronDown, Play} from "lucide-react"
import Link from "next/link"

export function HeroSection() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                    poster="/hero.jpg"
                >
                    <source src="/herovid.jpg" type="video/mp4"/>
                </video>
                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-b from-background/80 via-background/60 to-background"/>
                <div className="absolute inset-0 bg-linear-to-r from-background/40 via-transparent to-background/40"/>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                <div
                    className={`transition-all duration-1000 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                >
                    {/* Main Title */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-foreground mb-6 text-balance">
                        COLIZEUM
                    </h1>

                    {/* Slogan */}
                    <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto mb-12 text-balance">
                        Премиальный киберспортивный клуб.
                        <br className="hidden md:block"/>
                        Где рождаются чемпионы.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="#tournaments"
                            className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]"
                        >
                            <Play size={20} className="group-hover:scale-110 transition-transform"/>
                            Турниры
                        </Link>
                        <Link
                            href="#zones"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-secondary text-secondary-foreground font-bold rounded-lg hover:bg-secondary/80 transition-all duration-300 border border-border hover:border-primary/50"
                        >
                            Игровые зоны
                        </Link>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
                <Link href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                    <ChevronDown size={32}/>
                </Link>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-1/4 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-float"/>
            <div
                className="absolute bottom-1/4 right-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-float"
                style={{animationDelay: "1s"}}
            />
        </section>
    )
}
