"use client"

import { useRef, useState, useEffect } from "react"
import { MapPin, Phone, Mail, Clock, Send, Instagram, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const contactInfo = [
  {
    icon: MapPin,
    label: "Адрес",
    value: "г. Москва, ул. Киберспортивная, 42",
    link: "https://maps.google.com",
  },
  {
    icon: Phone,
    label: "Телефон",
    value: "+7 (495) 123-45-67",
    link: "tel:+74951234567",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@colizeum.gg",
    link: "mailto:info@colizeum.gg",
  },
  {
    icon: Clock,
    label: "Время работы",
    value: "24/7 без выходных",
    link: null,
  },
]

const socials = [
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
  {
    icon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
      </svg>
    ),
    label: "TikTok",
    href: "#",
  },
  {
    icon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
      </svg>
    ),
    label: "Telegram",
    href: "#",
  },
  {
    icon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zM17.15 15.5H15.4c-.6 0-.8-.5-1.9-1.63-1-.96-1.45-.96-1.7-.96-.35 0-.45.1-.45.58v1.48c0 .42-.13.66-1.25.66-1.83 0-3.87-1.1-5.3-3.18C3.1 10.25 2.65 8.35 2.65 8c0-.25.1-.48.58-.48H5c.45 0 .62.2.8.67.87 2.53 2.32 4.75 2.92 4.75.22 0 .33-.1.33-.67V10.1c-.07-1.17-.67-1.27-.67-1.68 0-.2.16-.4.42-.4h2.75c.37 0 .5.18.5.63v3.08c0 .37.16.5.27.5.22 0 .42-.13.83-.55 1.28-1.43 2.2-3.65 2.2-3.65.12-.25.33-.48.78-.48h1.75c.53 0 .65.27.53.63-.22 1.02-2.35 4.02-2.35 4.02-.18.3-.25.43 0 .77.18.25.8.77 1.2 1.25.75.87 1.33 1.6 1.48 2.1.17.5-.08.75-.58.75z" />
      </svg>
    ),
    label: "VK",
    href: "#",
  },
]

export function ContactsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="contacts" ref={sectionRef} className="relative py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">
            Связаться с нами
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 text-balance">Контакты</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="space-y-6 mb-10">
              {contactInfo.map((item) => (
                <div
                  key={item.label}
                  className="group flex items-start gap-4 p-4 rounded-xl bg-background border border-border hover:border-primary/50 transition-all duration-300"
                >
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">{item.label}</div>
                    {item.link ? (
                      <a href={item.link} className="text-foreground font-medium hover:text-primary transition-colors">
                        {item.value}
                      </a>
                    ) : (
                      <div className="text-foreground font-medium">{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <div className="text-sm text-muted-foreground mb-4">Социальные сети</div>
              <div className="flex gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="p-3 bg-secondary rounded-lg text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                  >
                    <social.icon />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Map & Form */}
          <div
            className={`transition-all duration-700 delay-400 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            {/* Map Placeholder */}
            <div className="relative h-64 mb-6 rounded-xl overflow-hidden border border-border">
              <img src="/placeholder.svg?height=400&width=600" alt="Карта" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-background/20" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="p-3 bg-primary rounded-full animate-pulse">
                  <MapPin className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="p-6 bg-background rounded-xl border border-border">
              <h3 className="text-lg font-bold text-foreground mb-4">Быстрая связь</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <Input
                  type="email"
                  placeholder="Ваш email"
                  className="bg-secondary border-border focus:border-primary"
                />
                <div className="flex gap-3">
                  <Input
                    type="text"
                    placeholder="Сообщение"
                    className="bg-secondary border-border focus:border-primary flex-1"
                  />
                  <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
