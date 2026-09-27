import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000"),
  title: "Joaquín Gonzalez | Analista en Sistemas · Software · QA · AI",
  description:
    "Portfolio de Joaquín Gonzalez: análisis de sistemas, calidad de software, desarrollo, automatización e integraciones con IA.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Joaquín Gonzalez | Analista en Sistemas · Software · QA · AI",
    description:
      "Software, calidad y automatización con una mirada integral.",
    url: "/",
    siteName: "Joaquín Gonzalez | Analista en Sistemas · Software · QA · AI",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Joaquín González — QA Automation, QA Manual y Analista Funcional",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joaquín Gonzalez | Analista en Sistemas · Software · QA · AI",
    description:
      "Software, calidad y automatización con una mirada integral.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
