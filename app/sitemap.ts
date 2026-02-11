import { MetadataRoute } from "next";

const paths = [
    '',
    '/privacy-policy',
    '/terms-of-services',
    '/contact',
    '/about',
    '/pricing',
    '/login'
];

export default function siteMap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    const routes = paths.map((path) => ({
        url: `${baseUrl}${path}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly' as const,
        priority: path === '' ? 1 : 0.8,
    }))

    return routes
}