const fallbackSiteUrl = "http://localhost:3000";

function normalizeSiteUrl(url: string) {
  return url.replace(/\/+$/, "");
}

export const siteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : fallbackSiteUrl),
);

export function absoluteUrl(path = "/") {
  return new URL(path, `${siteUrl}/`).toString();
}
