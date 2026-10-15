import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
    schema: "prisma/schema.prisma",
    migrations: {
        path: "prisma/migrations",
    },
    datasource: {
        // The CLI (migrations) uses the direct connection; the app uses DATABASE_URL via the adapter.
        url: process.env.DIRECT_URL,
    },
});
