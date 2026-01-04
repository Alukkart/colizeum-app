"use client"

import { useState, useRef, useEffect } from "react"
import { Play, X, ChevronLeft, ChevronRight, Grid, LayoutGrid, ImageIcon, Film, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

const videos = [
  {
    id: 1,
    title: "COLIZEUM Cup CS2 — Финал",
    thumbnail: "/cs2-esports-tournament-dark.jpg",
    duration: "2:34:15",
    views: "12.4K",
    date: "28 декабря 2025",
    category: "Турниры",
  },
  {
    id: 2,
    title: "Лучшие моменты недели #47",
    thumbnail: "/valorant-esports-tournament-dark.jpg",
    duration: "15:42",
    views: "8.2K",
    date: "25 декабря 2025",
    category: "Хайлайты",
  },
  {
    id: 3,
    title: "Обзор VIP зоны",
    thumbnail: "/vip-gaming-room-luxury-dark-purple-neon.jpg",
    duration: "8:21",
    views: "5.7K",
    date: "20 декабря 2025",
    category: "Обзоры",
  },
  {
    id: 4,
    title: "Интервью с чемпионом ShadowBlade",
    thumbnail: "/gamer-avatar-cyberpunk-male.jpg",
    duration: "24:33",
    views: "15.1K",
    date: "18 декабря 2025",
    category: "Интервью",
  },
  {
    id: 5,
    title: "Dota 2 Championship — День 2",
    thumbnail: "/dota-2-esports-tournament-dark.jpg",
    duration: "4:12:08",
    views: "9.8K",
    date: "15 декабря 2025",
    category: "Турниры",
  },
  {
    id: 6,
    title: "Новое оборудование 2026",
    thumbnail: "/pro-gaming-bootcamp-setup-dark-neon.jpg",
    duration: "12:45",
    views: "6.3K",
    date: "10 декабря 2025",
    category: "Обзоры",
  },
]

const albums = [
  {
    id: 1,
    title: "COLIZEUM Cup CS2 2025",
    cover: "/cs2-esports-tournament-dark.jpg",
    count: 87,
    date: "Декабрь 2025",
  },
  {
    id: 2,
    title: "Открытие VIP зоны",
    cover: "/vip-gaming-room-luxury-dark-purple-neon.jpg",
    count: 42,
    date: "Ноябрь 2025",
  },
  {
    id: 3,
    title: "Winter Championship",
    cover: "/valorant-esports-tournament-dark.jpg",
    count: 156,
    date: "Ноябрь 2025",
  },
  {
    id: 4,
    title: "Bootcamp Zone",
    cover: "/pro-gaming-bootcamp-setup-dark-neon.jpg",
    count: 34,
    date: "Октябрь 2025",
  },
  {
    id: 5,
    title: "Dota 2 Pro League",
    cover: "/dota-2-esports-tournament-dark.jpg",
    count: 98,
    date: "Октябрь 2025",
  },
  {
    id: 6,
    title: "Наши чемпионы",
    cover: "/gamer-avatar-cyberpunk-male.jpg",
    count: 65,
    date: "Сентябрь 2025",
  },
]

const galleryImages = [
  { id: 1, src: "/cs2-esports-tournament-dark.jpg", alt: "CS2 Tournament" },
  { id: 2, src: "/vip-gaming-room-luxury-dark-purple-neon.jpg", alt: "VIP Zone" },
  { id: 3, src: "/valorant-esports-tournament-dark.jpg", alt: "Valorant Tournament" },
  { id: 4, src: "/pro-gaming-bootcamp-setup-dark-neon.jpg", alt: "Bootcamp" },
  { id: 5, src: "/dota-2-esports-tournament-dark.jpg", alt: "Dota 2 Tournament" },
  { id: 6, src: "/gaming-pc-setup-standard-zone-dark-ambient.jpg", alt: "Standard Zone" },
  { id: 7, src: "/gamer-avatar-cyberpunk-male.jpg", alt: "Player 1" },
  { id: 8, src: "/gamer-avatar-neon-female.jpg", alt: "Player 2" },
  { id: 9, src: "/dark-esports-gaming-arena-with-neon-lights.jpg", alt: "Gaming Arena" },
]

export function MediaGallery() {
  const [activeTab, setActiveTab] = useState<"videos" | "albums" | "gallery">("videos")
  const [selectedVideo, setSelectedVideo] = useState<(typeof videos)[0] | null>(null)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null)
  const [hoveredAlbum, setHoveredAlbum] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handlePrevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1)
    }
  }

  const handleNextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1)
    }
  }

  return (
    <section ref={sectionRef} className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          className={`mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">Медиа</span>
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-6 text-balance">Галерея клуба</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Видео с турниров, фотоальбомы и лучшие моменты из жизни COLIZEUM
          </p>
        </div>

        {/* Tabs */}
        <div
          className={`flex gap-2 mb-10 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {[
            { value: "videos", label: "Видео", icon: Film, count: videos.length },
            { value: "albums", label: "Альбомы", icon: LayoutGrid, count: albums.length },
            { value: "gallery", label: "Галерея", icon: ImageIcon, count: galleryImages.length },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value as typeof activeTab)}
              className={cn(
                "flex items-center gap-2 px-5 py-3 rounded-lg font-medium text-sm transition-all duration-300",
                activeTab === tab.value
                  ? "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(34,197,94,0.3)]"
                  : "bg-card text-secondary-foreground hover:bg-card/80 border border-border",
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              <span
                className={cn(
                  "px-2 py-0.5 text-xs rounded-full",
                  activeTab === tab.value ? "bg-primary-foreground/20" : "bg-secondary",
                )}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Videos Tab */}
        {activeTab === "videos" && (
          <div
            className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {videos.map((video, index) => (
              <div
                key={video.id}
                onMouseEnter={() => setHoveredVideo(video.id)}
                onMouseLeave={() => setHoveredVideo(null)}
                onClick={() => setSelectedVideo(video)}
                className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/50 cursor-pointer transition-all duration-500 hover:shadow-[0_0_40px_rgba(34,197,94,0.15)] hover:scale-[1.02]"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

                  {/* Play Button */}
                  <div
                    className={cn(
                      "absolute inset-0 flex items-center justify-center transition-all duration-300",
                      hoveredVideo === video.id ? "bg-black/40" : "bg-transparent",
                    )}
                  >
                    <div
                      className={cn(
                        "w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center transition-all duration-300",
                        hoveredVideo === video.id ? "scale-100 opacity-100" : "scale-75 opacity-0",
                      )}
                    >
                      <Play className="w-7 h-7 text-primary-foreground ml-1" fill="currentColor" />
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 text-white text-xs font-medium rounded">
                    {video.duration}
                  </div>

                  {/* Category */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-primary/90 text-primary-foreground text-xs font-semibold rounded-full">
                    {video.category}
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{video.views} просмотров</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {video.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Albums Tab */}
        {activeTab === "albums" && (
          <div
            className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {albums.map((album, index) => (
              <div
                key={album.id}
                onMouseEnter={() => setHoveredAlbum(album.id)}
                onMouseLeave={() => setHoveredAlbum(null)}
                className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02]"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {/* Cover Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={album.cover || "/placeholder.svg"}
                    alt={album.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Stacked effect */}
                  <div
                    className={cn(
                      "absolute -bottom-1 left-3 right-3 h-full rounded-xl bg-white/10 -z-10 transition-all duration-300",
                      hoveredAlbum === album.id ? "translate-y-2" : "translate-y-0",
                    )}
                  />
                  <div
                    className={cn(
                      "absolute -bottom-2 left-6 right-6 h-full rounded-xl bg-white/5 -z-20 transition-all duration-300",
                      hoveredAlbum === album.id ? "translate-y-4" : "translate-y-0",
                    )}
                  />

                  {/* Content Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="font-bold text-white text-lg mb-1">{album.title}</h3>
                        <div className="flex items-center gap-3 text-sm text-white/70">
                          <span className="flex items-center gap-1">
                            <Grid className="w-3.5 h-3.5" />
                            {album.count} фото
                          </span>
                          <span>{album.date}</span>
                        </div>
                      </div>
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full bg-primary flex items-center justify-center transition-all duration-300",
                          hoveredAlbum === album.id ? "scale-100 opacity-100" : "scale-75 opacity-0",
                        )}
                      >
                        <ChevronRight className="w-5 h-5 text-primary-foreground" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === "gallery" && (
          <div
            className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                onClick={() => setSelectedImage(index)}
                className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.03]"
                style={{ transitionDelay: `${index * 30}ms` }}
              >
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center">
                    <ImageIcon className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="aspect-video bg-card rounded-xl overflow-hidden">
              <img
                src={selectedVideo.thumbnail || "/placeholder.svg"}
                alt={selectedVideo.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center animate-pulse">
                  <Play className="w-10 h-10 text-primary-foreground ml-1" fill="currentColor" />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-bold text-white mb-2">{selectedVideo.title}</h2>
              <div className="flex items-center gap-4 text-sm text-white/60">
                <span>{selectedVideo.views} просмотров</span>
                <span>{selectedVideo.date}</span>
                <span className="px-2 py-0.5 bg-primary/20 text-primary rounded-full">{selectedVideo.category}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation()
              handlePrevImage()
            }}
            className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <img
            src={galleryImages[selectedImage].src || "/placeholder.svg"}
            alt={galleryImages[selectedImage].alt}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => {
              e.stopPropagation()
              handleNextImage()
            }}
            className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 rounded-full text-white text-sm">
            {selectedImage + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </section>
  )
}
