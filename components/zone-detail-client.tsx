"use client"

import {useState} from "react"
import Link from "next/link"
import {
    ArrowLeft,
    Monitor,
    Cpu,
    HardDrive,
    Keyboard,
    Mouse,
    Headphones,
    X,
    ChevronLeft,
    ChevronRight,
} from "lucide-react"
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import useSWR from "swr";
import {notFound} from "next/navigation";
import Image from "next/image"

export type ZoneWithRelations = {
    id: string
    slug: string
    name: string
    description: string
    image: string
    price: string
    color: string
    specs: { id: string; name: string }[]
    components: { id: string; category: string; name: string; model: string; specs: string }[]
    devices: { id: string; category: string; name: string; model: string; specs: string }[]
    photos: { id: string; url: string; alt: string; order: number }[]
}

const componentIcons: Record<string, typeof Monitor> = {
    gpu: HardDrive,
    cpu: Cpu,
    monitor: Monitor,
}

const deviceIcons: Record<string, typeof Keyboard> = {
    keyboard: Keyboard,
    mouse: Mouse,
    headset: Headphones,
}

const categoryLabels: Record<string, string> = {
    gpu: "Видеокарта",
    cpu: "Процессор",
    monitor: "Монитор",
    keyboard: "Клавиатура",
    mouse: "Мышь",
    headset: "Наушники",
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())


export function ZoneDetailClient({slug}: { slug: string }) {
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
    const {data: zone, isLoading} = useSWR<ZoneWithRelations>(`/api/zones/${slug}`, fetcher)

    if (!zone && !isLoading) {
        return notFound()
    }

    if (isLoading || !zone) {
        return <div className="py-32 text-center text-muted-foreground">Загрузка...</div>
    }

    const openLightbox = (index: number) => {
        setCurrentPhotoIndex(index)
        setLightboxOpen(true)
    }

    const closeLightbox = () => setLightboxOpen(false)

    const nextPhoto = () => {
        setCurrentPhotoIndex((prev) => (prev + 1) % zone.photos.length)
    }

    const prevPhoto = () => {
        setCurrentPhotoIndex((prev) => (prev - 1 + zone.photos.length) % zone.photos.length)
    }

    return (
        <>
            {/* Hero Section */}
            <section className="relative pt-24 pb-16">
                <div className="absolute inset-0">
                    <Image
                        width='1920'
                        height='1080'
                        src={zone.image || "/placeholder.svg"}
                        alt={zone.name}
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-background via-background/80 to-background"/>
                </div>

                <div className="relative max-w-7xl mx-auto px-6 pt-16">
                    {/* Back Button */}
                    <Link
                        href="/#zones"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4"/>
                        <span>Назад к зонам</span>
                    </Link>

                    {/* Zone Title */}
                    <div className="flex items-center gap-4 mb-4">
                        <span className="px-3 py-1 bg-primary/20 text-primary text-sm font-semibold rounded-full">
                          {zone.price}
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-foreground mb-6">{zone.name}</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl">{zone.description}</p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Left Column - Specs */}
                        <div className="space-y-12">
                            {/* Components */}
                            <div>
                                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                                    <Cpu className="w-6 h-6 text-primary"/>
                                    Комплектующие
                                </h2>
                                <div className="space-y-4">
                                    {zone.components && zone.components.map((component) => {
                                        const Icon = componentIcons[component.category] || HardDrive
                                        return (
                                            <div
                                                key={component.id}
                                                className="group p-5 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-300"
                                            >
                                                <div className="flex items-start gap-4">
                                                    <div
                                                        className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                                                        <Icon className="w-6 h-6 text-primary"/>
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="text-sm text-muted-foreground mb-1">
                                                            {categoryLabels[component.category]}
                                                        </div>
                                                        <div
                                                            className="text-lg font-semibold text-foreground mb-1">{component.model}</div>
                                                        <div
                                                            className="text-sm text-muted-foreground">{component.specs}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* Devices */}
                            <div>
                                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                                    <Mouse className="w-6 h-6 text-primary"/>
                                    Периферия
                                </h2>
                                <div className="space-y-4">
                                    {zone.devices && zone.devices.map((device) => {
                                        const Icon = deviceIcons[device.category] || Keyboard
                                        return (
                                            <div
                                                key={device.id}
                                                className="group p-5 bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-300"
                                            >
                                                <div className="flex items-start gap-4">
                                                    <div
                                                        className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                                                        <Icon className="w-6 h-6 text-primary"/>
                                                    </div>
                                                    <div className="flex-1">
                                                        <div
                                                            className="text-sm text-muted-foreground mb-1">{categoryLabels[device.category]}</div>
                                                        <div
                                                            className="text-lg font-semibold text-foreground mb-1">{device.model}</div>
                                                        <div
                                                            className="text-sm text-muted-foreground">{device.specs}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* CTA */}
                            <div
                                className="p-6 bg-linear-to-r from-primary/20 to-primary/5 rounded-2xl border border-primary/30">
                                <h3 className="text-xl font-bold text-foreground mb-2">Забронировать место</h3>
                                <p className="text-muted-foreground mb-4">
                                    Выберите удобное время и наслаждайтесь игрой на топовом оборудовании
                                </p>
                                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                                    Забронировать за {zone.price}
                                </Button>
                            </div>
                        </div>

                        {/* Right Column - Photos */}
                        <div>
                            <h2 className="text-2xl font-bold text-foreground mb-6">Галерея</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {zone.photos && zone.photos.map((photo, index) => (
                                    <button
                                        key={photo.id}
                                        onClick={() => openLightbox(index)}
                                        className={cn(
                                            "relative aspect-4/3 rounded-xl overflow-hidden group cursor-pointer",
                                            index === 0 && "col-span-2 aspect-video",
                                        )}
                                    >
                                        <Image
                                            width='1920'
                                            height='1080'
                                            src={photo.url || "/placeholder.svg"}
                                            alt={photo.alt}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div
                                            className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                                              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                                                Открыть
                                              </span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            {lightboxOpen && (
                <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
                    <button
                        onClick={closeLightbox}
                        className="absolute top-6 right-6 p-2 text-white/70 hover:text-white transition-colors"
                    >
                        <X className="w-8 h-8"/>
                    </button>

                    <button
                        onClick={prevPhoto}
                        className="absolute left-6 p-3 text-white/70 hover:text-white transition-colors bg-white/10 rounded-full hover:bg-white/20"
                    >
                        <ChevronLeft className="w-8 h-8"/>
                    </button>

                    <div className="max-w-5xl max-h-[80vh] relative">
                        <Image
                            width='1920'
                            height='1080'
                            src={zone.photos[currentPhotoIndex]?.url || "/placeholder.svg"}
                            alt={zone.photos[currentPhotoIndex]?.alt}
                            className="max-w-full max-h-[80vh] object-contain rounded-lg"
                        />
                        <div
                            className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/80 to-transparent">
                            <p className="text-white text-center">{zone.photos[currentPhotoIndex]?.alt}</p>
                            <p className="text-white/60 text-center text-sm mt-1">
                                {currentPhotoIndex + 1} / {zone.photos.length}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={nextPhoto}
                        className="absolute right-6 p-3 text-white/70 hover:text-white transition-colors bg-white/10 rounded-full hover:bg-white/20"
                    >
                        <ChevronRight className="w-8 h-8"/>
                    </button>
                </div>
            )}
        </>
    )
}
