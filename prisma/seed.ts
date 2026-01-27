import {ComponentCategory, DeviceCategory, MatchStatus, PrismaClient, TournamentStatus} from '@/prisma/generated/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { databaseUrl } from '@/prisma.config'

const adapter = new PrismaPg({
    connectionString: databaseUrl,
})

const prisma = new PrismaClient({ adapter })

const zones = [
    {
        slug: 'standard',
        name: 'Standard',
        price: '~120₽ / час',
        description: 'Бюджетный вариант для комфортной игры',
        image: '/zones/standard.jpg',
        components: [
            { category: ComponentCategory.cpu, model: 'i5-12400F', specs: '6 cores' },
            { category: ComponentCategory.gpu, model: 'RTX 2060', specs: '6GB' },
            { category: ComponentCategory.monitor, model: 'ASUS', specs: '27" 165Hz' },
        ],
        devices: [
            { category: DeviceCategory.mouse, model: 'Logitech G 102', specs: 'Mercury 9800' },
            { category: DeviceCategory.keyboard, model: 'ASUS K3', specs: 'Mechanical' },
            { category: DeviceCategory.headset, model: 'ASUS H3', specs: 'Stereo' },
        ],
    },

    {
        slug: 'bootcamp',
        name: 'Bootcamp',
        price: '~130₽ / час',
        description: 'Бюджетный вариант для комфортной игры',
        image: '/zones/standard.jpg',
        components: [
            { category: ComponentCategory.cpu, model: 'i5-12400F', specs: '6 cores' },
            { category: ComponentCategory.gpu, model: 'RTX 2060', specs: '6GB' },
            { category: ComponentCategory.monitor, model: 'ASUS', specs: '27" 165Hz' },
        ],
        devices: [
            { category: DeviceCategory.mouse, model: 'Logitech G 102', specs: 'Mercury 9800' },
            { category: DeviceCategory.keyboard, model: 'ASUS K3', specs: 'Mechanical' },
            { category: DeviceCategory.headset, model: 'HyperX Cloud II', specs: 'Stereo' },
        ],
    },

    {
        slug: 'bootcamp-plus',
        name: 'Bootcamp+',
        price: '~160₽ / час',
        description: 'Бюджетный вариант для комфортной игры',
        image: '/zones/standard.jpg',
        components: [
            { category: ComponentCategory.cpu, model: 'i5-12400F', specs: '6 cores' },
            { category: ComponentCategory.gpu, model: 'RTX 3060', specs: '12GB' },
            { category: ComponentCategory.monitor, model: 'ASUS', specs: '27" 280Hz' },
        ],
        devices: [
            { category: DeviceCategory.mouse, model: 'Logitech G 102', specs: 'Mercury 9800' },
            { category: DeviceCategory.keyboard, model: 'ASUS K3', specs: 'Mechanical' },
            { category: DeviceCategory.headset, model: 'HyperX Cloud II', specs: 'Stereo' },
        ],
    },
]
async function main() {
    console.log('🧹 Clearing database...')
    await prisma.match.deleteMany({})
    await prisma.news.deleteMany({})
    await prisma.player.deleteMany({})
    await prisma.zone.deleteMany({})
    await prisma.tournament.deleteMany({})
    await prisma.game.deleteMany({})
    await prisma.admins.deleteMany({})
    console.log('✅ Database cleared')

    await prisma.admins.create({
        data: {
            username: 'admin',
            password: 'admin',
        }
    })

    /* -------------------- ZONES -------------------- */
    for (const zone of zones) {
        const createdZone = await prisma.zone.create({
            data: {
                slug: zone.slug,
                name: zone.name,
                description: zone.description,
                image: zone.image,
                price: zone.price,
            },
        })

        await prisma.zoneComponent.createMany({
            data: zone.components.map((c, index) => ({
                zoneId: createdZone.id,
                order: index + 1,
                ...c,
            })),
        })

        await prisma.zoneDevice.createMany({
            data: zone.devices.map((d, index) => ({
                zoneId: createdZone.id,
                order: index + 1,
                ...d,
            })),
        })

        await prisma.zonePhoto.create({
            data: {
                zoneId: createdZone.id,
                url: createdZone.image,
                alt: createdZone.name,
                order: 1,
            },
        })
    }

    /* -------------------- GAMES -------------------- */
    const [cs2] = await Promise.all([
        prisma.game.create({ data: { name: 'CS2' } }),
        prisma.game.create({ data: { name: 'Dota 2' } }),
        prisma.game.create({ data: { name: 'Valorant' } }),
    ])

    /* -------------------- PLAYERS -------------------- */
    const players = await Promise.all(
        Array.from({ length: 10 }).map((_, i) =>
            prisma.player.create({
                data: {
                    nickname: `player${i + 1}`,
                    rating: 1000 + i * 25
                }
            })
        )
    )

    // ---------- Teams ----------
    const teams = await Promise.all(
        ['Alpha', 'Bravo', 'Charlie', 'Delta'].map((name) =>
            prisma.team.create({
                data: {
                    name: `${name} Team`,
                    tag: name.toUpperCase()
                }
            })
        )
    )

    // ---------- Team Players ----------
    await Promise.all(
        teams.map((team, index) => {
            const slice = players.slice(index * 2, index * 2 + 2)

            return Promise.all(
                slice.map(player =>
                    prisma.teamPlayer.create({
                        data: {
                            teamId: team.id,
                            userId: player.id
                        }
                    })
                )
            )
        })
    )

    // ---------- Tournament ----------
    const tournament = await prisma.tournament.create({
        data: {
            slug: 'cs2-winter-cup',
            name: 'CS2 Winter Cup',
            description: 'Winter tournament for CS2 teams',
            date: new Date('2026-02-15'),
            time: '18:00',
            prize: '$1,000',
            maxParticipants: 8,
            status: TournamentStatus.REGISTRATION,
            gameId: cs2.id
        }
    })

    // ---------- Tournament Teams ----------
    await Promise.all(
        teams.map(team =>
            prisma.tournamentTeam.create({
                data: {
                    tournamentId: tournament.id,
                    teamId: team.id,
                }
            })
        )
    )

    // ---------- Matches ----------
    await prisma.match.createMany({
        data: [
            {
                tournamentId: tournament.id,
                round: 1,
                bestOf: 3,
                status: MatchStatus.SCHEDULED,
                teamAId: teams[0].id,
                teamBId: teams[1].id
            },
            {
                tournamentId: tournament.id,
                round: 1,
                bestOf: 3,
                status: MatchStatus.SCHEDULED,
                teamAId: teams[2].id,
                teamBId: teams[3].id
            }
        ]
    })

    /* -------------------- NEWS -------------------- */
    await prisma.news.createMany({
        data: [
            {
                slug: 'cs2-winter-cup-announcement',
                title: 'Анонс CS2 Winter Cup',
                excerpt: 'Открыта регистрация на зимний турнир',
                content: 'Призовой фонд 100 000 ₽...',
                category: 'Турниры',
                published: true,
                featured: true,
                publishedAt: new Date(),
                authorName: 'Admin',
            },
            {
                slug: 'vip-zone-open',
                title: 'Открытие VIP зоны',
                excerpt: 'Новая премиум зона уже доступна',
                content: 'RTX 4090, OLED мониторы...',
                category: 'Клуб',
                published: true,
                publishedAt: new Date(),
            },
            {
                slug: 'valorant-coming-soon',
                title: 'Valorant турниры скоро',
                excerpt: 'Готовим новый формат',
                content: 'Следите за новостями',
                category: 'Анонсы',
                published: false,
            },
        ],
    })

    console.log('✅ Seeding finished successfully')
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
