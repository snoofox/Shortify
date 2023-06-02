import { DataTable } from "./data-table"
import { Url, columns } from "./columns"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";


async function getData(): Promise<Url[]> {
    const siteUrl = process.env.SITE_URL
    const res = await fetch(`${siteUrl}/api/`, { cache: 'no-store' })
    const response = await res.json()
    if (response.status === 200) {
        return response.data.urls
    } else return []
}

export default async function AdminPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/api/auth/signin");
    }

    const data = await getData();
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}
