import type { Metadata } from "next";

import type { SiteSettings } from "@/lib/db/settings";

const fallbackSiteUrl = "https://www.niniolaphotography.online";

export const seoConfig = {
  siteName: "Niniola Photography",
  businessName: "Niniola Photography",
  creatorName: "Niniola Blessing Samuel",
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL || fallbackSiteUrl).replace(/\/$/, ""),
  defaultTitle: "Niniola Photography | Storytelling Photographer in Benin City, Nigeria",
  defaultDescription:
    "Niniola Photography is a Benin City, Nigeria-based storytelling and conceptual photography brand serving clients locally, across Nigeria, and internationally for portraits, editorial, events, and fine art commissions.",
  defaultOgImage: "/ninola_1.jpg",
  locale: "en_NG",
  primaryLocation: {
    city: "Benin City",
    state: "Edo",
    country: "Nigeria",
  },
  serviceAreas: [
    "Benin City",
    "Edo State",
    "Lagos",
    "Abuja",
    "Port Harcourt",
    "Ibadan",
    "Nigeria",
    "Worldwide",
  ],
  keywords: [
    "photographer in Benin City",
    "Benin City photographer",
    "photographer in Nigeria",
    "storytelling photographer Nigeria",
    "conceptual photographer Nigeria",
    "fine art photographer Nigeria",
    "portrait photographer Nigeria",
    "event photographer Nigeria",
    "editorial photographer Nigeria",
    "commercial photographer Nigeria",
    "photography prints Nigeria",
    "African storytelling photographer",
  ],
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, `${seoConfig.siteUrl}/`).toString();
}

type MetadataInput = {
  title?: string;
  description?: string;
  path?: string;
  keywords?: string[];
  images?: string[];
  noIndex?: boolean;
  type?: "website" | "article";
};

export function buildMetadata({
  title,
  description = seoConfig.defaultDescription,
  path = "/",
  keywords = [],
  images = [seoConfig.defaultOgImage],
  noIndex = false,
  type = "website",
}: MetadataInput = {}): Metadata {
  const fullTitle = title ? `${title} | ${seoConfig.siteName}` : seoConfig.defaultTitle;
  const canonical = absoluteUrl(path);
  const ogImages = images.map((image) => ({
    url: image.startsWith("http") ? image : absoluteUrl(image),
    width: 1200,
    height: 630,
    alt: fullTitle,
  }));

  return {
    title: fullTitle,
    description,
    keywords: [...seoConfig.keywords, ...keywords],
    metadataBase: new URL(`${seoConfig.siteUrl}/`),
    alternates: {
      canonical,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: seoConfig.siteName,
      locale: seoConfig.locale,
      type,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ogImages.map((image) => image.url),
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export function getSocialLinks(settings?: SiteSettings) {
  if (!settings) return [];

  return [
    settings.socials.instagram,
    settings.socials.twitter,
    settings.socials.facebook,
    settings.socials.substack,
  ].filter((value) => value && value !== "#");
}

export function buildBusinessSchema(settings?: SiteSettings) {
  const address = settings?.contact.address || "Benin City, Edo State, Nigeria";

  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService"],
    name: seoConfig.businessName,
    image: absoluteUrl(seoConfig.defaultOgImage),
    url: seoConfig.siteUrl,
    description: seoConfig.defaultDescription,
    email: settings?.contact.email,
    telephone: settings?.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
      addressLocality: seoConfig.primaryLocation.city,
      addressRegion: seoConfig.primaryLocation.state,
      addressCountry: "NG",
    },
    areaServed: seoConfig.serviceAreas.map((name) => ({
      "@type": "Place",
      name,
    })),
    sameAs: getSocialLinks(settings),
    founder: {
      "@type": "Person",
      name: seoConfig.creatorName,
    },
  };
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: seoConfig.siteName,
    url: seoConfig.siteUrl,
    inLanguage: "en-NG",
  };
}

export function buildBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
