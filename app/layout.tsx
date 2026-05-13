import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import Script from "next/script";
import { siteContent } from "@/content/site-content";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "block",
  variable: "--font-space-grotesk"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shakhawat-portfolio.vercel.app"),
  title: `${siteContent.name} | SEO Portfolio`,
  description: siteContent.description,
  authors: [{ name: siteContent.name }],
  creator: siteContent.name,
  publisher: siteContent.name,
  keywords: [
    "Md. Shakhawat Hossain",
    "SEO Portfolio",
    "SEO Specialist Bangladesh",
    "Marketing Enthusiast",
    "Semantic SEO",
    "Google Ads",
    "Email Marketing",
    "n8n Automation",
    "Technical SEO",
    "Content Strategy"
  ],
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: `${siteContent.name} | SEO Portfolio`,
    description: siteContent.description,
    type: "website",
    locale: "en_US",
    siteName: `${siteContent.name} Portfolio`
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteContent.name} | SEO Portfolio`,
    description: siteContent.description
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FFFDF5"
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteContent.name,
  jobTitle: siteContent.headline,
  email: `mailto:${siteContent.email}`,
  telephone: siteContent.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dhaka",
    addressCountry: "Bangladesh",
    streetAddress: siteContent.address
  },
  alumniOf: siteContent.education.degree,
  knowsAbout: siteContent.skillGroups.flatMap((group) => group.skills),
  sameAs: []
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta name="application-name" content={`${siteContent.name} Portfolio`} />
        <meta name="apple-mobile-web-app-title" content={siteContent.name} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="color-scheme" content="light" />
      </head>
      <body className={spaceGrotesk.variable}>
        <Script
          id="person-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
