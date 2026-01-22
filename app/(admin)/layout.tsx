import type React from "react"
import type {Metadata} from "next"

export const metadata: Metadata = {
    title: "COLIZEUM — Киберспортивный клуб",
    description: "Премиальный компьютерный клуб с турнирами, рейтингами и профессиональным оборудованием",
}

export const viewport = {
    themeColor: "#0a0a0f",
}

export default function AdminLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="ru" suppressHydrationWarning>
        <body className="font-sans antialiased">
            {children}
        </body>
        </html>
    )
}
