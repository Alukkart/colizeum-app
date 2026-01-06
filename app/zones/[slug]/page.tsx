import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ZoneDetailClient } from "@/components/zone-detail-client"
import prisma from "@/lib/prisma";

export async function generateStaticParams() {
  const zones = await prisma.zone.findMany({ select: { slug: true } })
  return zones.map((zone) => ({ slug: zone.slug }))
}

export default async function ZoneDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const zone = await prisma.zone.findUnique({
    where: { slug },
    include: {
      specs: true,
      components: true,
      devices: true,
      photos: { orderBy: { order: "asc" } },
    },
  })

  if (!zone) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <ZoneDetailClient zone={zone} />
      <Footer />
    </main>
  )
}
