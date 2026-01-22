import {getNextAdminProps} from "@premieroctet/next-admin/appRouter";
import {NextAdmin} from "@premieroctet/next-admin/adapters/next";
import type {PrismaClient} from "@premieroctet/next-admin";
import PageLoader from "@premieroctet/next-admin/pageLoader";
import {PromisePageProps} from "@premieroctet/next-admin";
import options from "../../../../nextAdminOptions";
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import prisma from "@/lib/prisma";
import './admin.css'

export default async function AdminPage(props: PromisePageProps) {
    const params = await props.params;
    const searchParams = await props.searchParams;

    const nextAdminProps = await getNextAdminProps({
        params: params.nextadmin,
        searchParams,
        basePath: "/6b7f33821a2c060ecdd81aefddea2fd3c4720270e18654f4cb08ece49ccb469f8beeee7c831206bd577f9f2630d9177979203a9489e47e04df4e6deaa0f8e0c0",
        apiBasePath: "/api/admin",
        prisma: prisma as unknown as PrismaClient,
        options,
    });

    const isAuth = (await cookies()).get('admin_auth')?.value === 'true'

    if (!isAuth) {
        redirect('/login')
    }

    return (
        <NextAdmin
            pageLoader={<PageLoader/>}
            {...nextAdminProps}
            user={{
                data: {
                    name: "admin",
                },
                logout: '/6b7f33821a2c060ecdd81aefddea2fd3c4720270e18654f4cb08ece49ccb469f8beeee7c831206bd577f9f2630d9177979203a9489e47e04df4e6deaa0f8e0c0/logout',
            }}
        />
    );
}
