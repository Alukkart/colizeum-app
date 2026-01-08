import "dotenv/config";
import {defineConfig} from "prisma/config";

export const databaseUrl = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`;
console.log('Database URL:', databaseUrl)

export default defineConfig({
    schema: "prisma/schema.prisma",
    migrations: {
        seed: 'tsx prisma/seed.ts',
        path: "prisma/migrations",
    },
    datasource: {
        url: databaseUrl,
    },
});
