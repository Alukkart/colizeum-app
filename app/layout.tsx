import type React from "react"
import type {Metadata} from "next"
import "./globals.css"
import {Header} from "@/components/header";
import {Footer} from "@/components/footer";

export const metadata: Metadata = {
    title: "COLIZEUM — Киберспортивный клуб",
    description: "Премиальный компьютерный клуб с турнирами, рейтингами и профессиональным оборудованием",
}

export const viewport = {
    themeColor: "#0a0a0f",
}

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="ru">
        <body className="font-sans antialiased">
            <Header/>
            {children}
            <Footer />
        </body>
        </html>
    )
}
