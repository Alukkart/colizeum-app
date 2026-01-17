import {ComponentCategory, DeviceCategory, PrismaClient} from '@/prisma/generated/client'
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
    console.log('✅ Database cleared')

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
    const [cs2, dota] = await Promise.all([
        prisma.game.create({ data: { name: 'CS2' } }),
        prisma.game.create({ data: { name: 'Dota 2' } }),
        prisma.game.create({ data: { name: 'Valorant' } }),
    ])

    /* -------------------- PLAYERS -------------------- */
    const players = await Promise.all([
        prisma.player.create({
            data: {
                username: 'onetap',
                nickname: 'OneTap',
                email: 'one@mail.com',
                rating: 1450,
                achievements: {
                    create: [
                        { name: 'First Blood', description: 'Первая победа' },
                        { name: 'Sharpshooter', description: '100 хедшотов', rarity: 'RARE' },
                    ],
                },
                socialLinks: {
                    create: [
                        { platform: 'steam', url: 'https://steamcommunity.com/id/onetap' },
                    ],
                },
            },
        }),
        prisma.player.create({
            data: { username: 'clutch', nickname: 'ClutchKing', rating: 1380 },
        }),
        prisma.player.create({
            data: { username: 'sniper', nickname: 'DeadEye', rating: 1520 },
        }),
        prisma.player.create({
            data: { username: 'support', nickname: 'Anchor', rating: 1300 },
        }),
        prisma.player.create({
            data: { username: 'igl', nickname: 'Brain', rating: 1600 },
        }),
        prisma.player.create({
            data: { username: 'rookie', nickname: 'Newbie', rating: 950 },
        }),
    ])

    /* -------------------- TOURNAMENTS -------------------- */
    const cs2Tournament = await prisma.tournament.create({
        data: {
            slug: 'cs2-winter-cup',
            name: 'CS2 Winter Cup',
            description: 'Зимний турнир для лучших игроков',
            date: new Date('2026-02-10'),
            time: '18:00',
            prize: '100 000 ₽',
            maxParticipants: 16,
            image: '/tournaments/cs2.jpg',
            gameId: cs2.id,
            status: 'REGISTRATION',
            participants: {
                create: players.slice(0, 4).map((p) => ({ playerId: p.id })),
            },
        },
    })

    const dotaTournament = await prisma.tournament.create({
        data: {
            slug: 'dota-spring-open',
            name: 'Dota 2 Spring Open',
            date: new Date('2026-03-15'),
            time: '17:00',
            prize: '200 000 ₽',
            maxParticipants: 32,
            status: 'ONGOING',
            gameId: dota.id,
            participants: {
                create: players.map((p) => ({ playerId: p.id })),
            },
        },
    })

    /* -------------------- MATCHES -------------------- */
    await prisma.match.createMany({
        data: [
            {
                game: 'CS2',
                map: 'Mirage',
                score: '16-12',
                duration: 42,
                tournamentId: cs2Tournament.id,
                player1Id: players[0].id,
                player2Id: players[1].id,
                winnerId: players[0].id,
            },
            {
                game: 'Dota 2',
                score: '2-1',
                duration: 65,
                tournamentId: dotaTournament.id,
                player1Id: players[2].id,
                player2Id: players[3].id,
                winnerId: players[2].id,
            },
            {
                game: 'CS2',
                map: 'Inferno',
                score: '16-14',
                duration: 50,
                player1Id: players[4].id,
                player2Id: players[5].id,
                winnerId: players[4].id,
            },
        ],
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
