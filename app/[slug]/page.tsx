import { redirect } from 'next/navigation';

export default async function RedirectPage({ params }: any) {
    const siteUrl = process.env.SITE_URL
    const res = await fetch(`${siteUrl}/api?id=${params?.slug}`)
    const response = await res.json()
    if (response.status === 200) {
        redirect(response.data.url)
    }
}
