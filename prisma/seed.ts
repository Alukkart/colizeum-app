import { PrismaClient } from '@/prisma/generated/client'
import {PrismaPg} from "@prisma/adapter-pg";
import {databaseUrl} from "@/prisma.config";
const adapter = new PrismaPg({
    connectionString: databaseUrl,
})

const prisma = new PrismaClient({adapter})

async function main() {
    console.log('🧹 Clearing database before seeding...')
    await prisma.match.deleteMany({})
    await prisma.news.deleteMany({})
    await prisma.player.deleteMany({})
    await prisma.zone.deleteMany({})
    await prisma.tournament.deleteMany({})

    console.log('🧹 Database cleared')
    console.log('🌱 Start seeding...')
    /* -------------------- ZONES -------------------- */
    await prisma.zone.create({
        data: {
            slug: 'bootcamp',
            name: 'Bootcamp',
            description: 'Профессиональная игровая зона для турниров',
            image: '/bootcamp.jpg',
            price: '1500₽ / час',
            color: '#ff3b3b',
            components: {
                create: [
                    {
                        category: 'gpu',
                        model: 'RTX 4070',
                        specs: '12GB GDDR6X',
                    },
                    {
                        category: 'cpu',
                        model: 'i7 13700K',
                        specs: '16 cores',
                    },
                    {
                        category: 'monitor',
                        model: 'ROG Swift',
                        specs: '240Hz, 27"',
                    },
                ],
            },

            devices: {
                create: [
                    {
                        category: 'keyboard',
                        model: 'Apex Pro',
                        specs: 'Mechanical',
                    },
                    {
                        category: 'mouse',
                        model: 'G Pro X',
                        specs: 'Wireless',
                    },
                    {
                        category: 'headset',
                        model: 'Cloud II',
                        specs: '7.1 Surround',
                    },
                ],
            },

            photos: {
                create: [
                    {
                        url: '/bootcamp.jpg',
                        alt: 'Pro Zone',
                        order: 1,
                    }
                ],
            },
        },
    })

    /* -------------------- PLAYERS -------------------- */
    const player1 = await prisma.player.create({
        data: {
            username: 'player_one',
            nickname: 'OneTap',
            email: 'one@mail.com',
            mainGame: 'CS2',
            rating: 1450,
            status: 'ONLINE',

            achievements: {
                create: [
                    {
                        name: 'First Blood',
                        description: 'Первая победа',
                        rarity: 'COMMON',
                    },
                    {
                        name: 'Sharpshooter',
                        description: '100 хедшотов',
                        rarity: 'RARE',
                    },
                ],
            },

            socialLinks: {
                create: [
                    {
                        platform: 'steam',
                        url: 'https://steamcommunity.com/id/onetap',
                    },
                    {
                        platform: 'discord',
                        url: 'https://discord.gg/onetap',
                    },
                ],
            },
        },
    })

    const player2 = await prisma.player.create({
        data: {
            username: 'player_two',
            nickname: 'ClutchKing',
            mainGame: 'CS2',
            rating: 1380,
            status: 'OFFLINE',
        },
    })

    /* -------------------- TOURNAMENT -------------------- */
    const tournament = await prisma.tournament.create({
        data: {
            slug: 'cs2-winter-cup',
            name: 'CS2 Winter Cup',
            game: 'CS2',
            description: 'Зимний турнир для лучших игроков',
            date: new Date('2026-02-10'),
            time: '18:00',
            prize: '100 000 ₽',
            maxParticipants: 16,
            image: '/tournaments/cs2.jpg',

            participants: {
                create: [
                    { playerId: player1.id },
                    { playerId: player2.id },
                ],
            },
        },
    })

    /* -------------------- MATCH -------------------- */
    await prisma.match.create({
        data: {
            game: 'CS2',
            map: 'Mirage',
            score: '16-12',
            duration: 45,
            tournamentId: tournament.id,
            player1Id: player1.id,
            player2Id: player2.id,
            winnerId: player1.id,
        },
    })

    /* -------------------- NEWS -------------------- */
    await prisma.news.create({
        data: {
            slug: 'winter-cup-announcement',
            title: 'Анонс CS2 Winter Cup',
            excerpt: 'Открыта регистрация на зимний турнир',
            content: 'Приглашаем всех игроков принять участие...',
            category: 'Турниры',
            published: true,
            featured: true,
            publishedAt: new Date(),
            authorName: 'Admin',

            tags: {
                create: [
                    { name: 'CS2' },
                    { name: 'Турнир' },
                    { name: 'Анонс' },
                ],
            },
        },
    })

    console.log('✅ Seeding finished')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
