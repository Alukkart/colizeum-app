import "dotenv/config";
import {defineConfig} from "prisma/config";

export default defineConfig({
    schema: "prisma/schema.prisma",
    migrations: {
        seed: 'tsx prisma/seed.ts',
        path: "prisma/migrations",
    },
    datasource: {
        url: `DATABASE_URL=postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@postgres:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`,
    },
});
