import Link from "next/link"

const footerLinks = {
  navigation: [
    { label: "Главная", href: "#hero" },
    { label: "О клубе", href: "#about" },
    { label: "Игровые зоны", href: "#zones" },
    { label: "Турниры", href: "#tournaments" },
  ],
  info: [
    { label: "Рейтинг", href: "#rankings" },
    { label: "Новости", href: "#news" },
    { label: "Контакты", href: "#contacts" },
    { label: "Правила", href: "#" },
  ],
}

const socials = [
  {
    icon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
      </svg>
    ),
    href: "#",
  },
  {
    icon: () => (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zM17.15 15.5H15.4c-.6 0-.8-.5-1.9-1.63-1-.96-1.45-.96-1.7-.96-.35 0-.45.1-.45.58v1.48c0 .42-.13.66-1.25.66-1.83 0-3.87-1.1-5.3-3.18C3.1 10.25 2.65 8.35 2.65 8c0-.25.1-.48.58-.48H5c.45 0 .62.2.8.67.87 2.53 2.32 4.75 2.92 4.75.22 0 .33-.1.33-.67V10.1c-.07-1.17-.67-1.27-.67-1.68 0-.2.16-.4.42-.4h2.75c.37 0 .5.18.5.63v3.08c0 .37.16.5.27.5.22 0 .42-.13.83-.55 1.28-1.43 2.2-3.65 2.2-3.65.12-.25.33-.48.78-.48h1.75c.53 0 .65.27.53.63-.22 1.02-2.35 4.02-2.35 4.02-.18.3-.25.43 0 .77.18.25.8.77 1.2 1.25.75.87 1.33 1.6 1.48 2.1.17.5-.08.75-.58.75z" />
      </svg>
    ),
    href: "#",
  },
]

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-3xl font-black text-foreground mb-4 block">
              COLIZEUM
            </Link>
            <p className="text-muted-foreground max-w-md mb-6">
              Премиальный киберспортивный клуб с топовым оборудованием, регулярными турнирами и атмосферой настоящего
              соревнования.
            </p>
            <div className="flex gap-3">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="p-2.5 bg-secondary rounded-lg text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Навигация</h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Информация</h4>
            <ul className="space-y-3">
              {footerLinks.info.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">© 2026 COLIZEUM. Все права защищены.</div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">
              Политика конфиденциальности
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Пользовательское соглашение
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
