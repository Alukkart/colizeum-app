"use client"

import { useRef, useState, useEffect } from "react"
import { Monitor, Trophy, Users, Zap } from "lucide-react"

const stats = [
  { icon: Monitor, value: "120+", label: "Игровых ПК", suffix: "" },
  { icon: Trophy, value: "50+", label: "Турниров в год", suffix: "" },
  { icon: Users, value: "5000+", label: "Активных игроков", suffix: "" },
  { icon: Zap, value: "3", label: "Класса зон", suffix: "" },
]

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

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

  return (
    <section id="about" ref={sectionRef} className="relative py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">О клубе</span>
            <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 text-balance">
              Арена для настоящих киберспортсменов
            </h2>
          </div>
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              COLIZEUM — это не просто компьютерный клуб. Это место, где начинающие игроки становятся профессионалами, а
              профессионалы оттачивают мастерство.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Мы создали пространство с топовым оборудованием, регулярными турнирами и сообществом единомышленников.
              Каждый матч здесь — шаг к победе.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`group relative p-8 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(34,197,94,0.1)] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100 + 400}ms` }}
            >
              <stat.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-4xl md:text-5xl font-black text-foreground mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
