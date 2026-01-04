import {PrismaClient, PromisePageProps} from "@premieroctet/next-admin";
import {getNextAdminProps} from "@premieroctet/next-admin/appRouter";
import {NextAdmin} from "@premieroctet/next-admin/adapters/next";
import PageLoader from "@premieroctet/next-admin/pageLoader";
import prisma from "@/lib/prisma";
import options from "@/nextAdminOptions";
import '../admin.css'

export default async function AdminPage(props: PromisePageProps) {
    const params = await props.params;
    const searchParams = await props.searchParams;

    const nextAdminProps = await getNextAdminProps({
        params: params.nextadmin,
        searchParams,
        basePath: "/admin",
        apiBasePath: "/api/admin",
        prisma: prisma as PrismaClient,
        options
    });

    return (
        <NextAdmin pageLoader={<PageLoader/>} {...nextAdminProps} />
    );
}
