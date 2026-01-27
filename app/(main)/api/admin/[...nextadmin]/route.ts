import prisma from "@/lib/prisma";
import { createHandler } from "@premieroctet/next-admin/appHandler";
import options from "../../../../../nextAdminOptions";
import type { PrismaClient } from "@premieroctet/next-admin";

const { run } = createHandler({
  apiBasePath: "/api/admin",
  prisma: prisma as PrismaClient,
  options
});

export { run as DELETE, run as GET, run as POST };
