import { PlayerProfile } from "@/components/player-profile"

type Params = Promise<{ username: string }>

export default async function ProfilePage({ params }: { params: Params }) {
  const { username } = await params
  return (
    <main className="min-h-screen">
      <PlayerProfile username={username} />
    </main>
  )
}
