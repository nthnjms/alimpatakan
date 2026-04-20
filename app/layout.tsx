import type { Metadata } from "next";
import { Playfair_Display, IBM_Plex_Mono, Inter } from "next/font/google";
import Providers from "@/components/Providers";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ALIMPATAKAN",
    template: "%s — ALIMPATAKAN",
  },
  description:
    "A personal literary publication by Nathaniel James Toñacao. Hardcore, Stroke, Quickie, Fantasy, Uncensored, Raw — writing that doesn't apologize.",
  authors: [{ name: "Nathan", url: "https://nthnlstudios.vercel.app" }],
  creator: "Nathan",
  openGraph: {
    type: "website",
    locale: "en_PH",
    siteName: "ALIMPATAKAN",
    title: "ALIMPATAKAN",
    description:
      "A personal literary publication by Nathan. Essays, poetry, short stories, and reflections.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${ibmPlexMono.variable} ${inter.variable}`}
    >
      <body suppressHydrationWarning>
        <Providers>
          <CustomCursor />
          {children}
        </Providers>
      </body>
    </html>
  );
}