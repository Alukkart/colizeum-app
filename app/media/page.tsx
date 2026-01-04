import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MediaGallery } from "@/components/media-gallery"

export default function MediaPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <MediaGallery />
      <Footer />
    </main>
  )
}
