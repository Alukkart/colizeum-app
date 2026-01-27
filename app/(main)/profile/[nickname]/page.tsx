import {PlayerProfile} from "@/components/player-profile"
import {Api} from "@/service/api-client";

type Params = Promise<{ nickname: string }>

export default async function ProfilePage({params}: { params: Params }) {
    const {nickname} = await params

    const player = await Api.players.getPlayer(nickname)

    console.log(player)

    return (
        <main className="min-h-screen">
            <PlayerProfile player={player}/>
        </main>
    )
}
