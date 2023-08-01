import { Newsreader, DM_Sans, Inter, Space_Grotesk } from "@next/font/google";

export const newsreader = Newsreader({
  subsets: ["latin"],
  style: ['normal', 'italic'],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-newsreader",
})


export const dm_sans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
});

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
  variable: "--font-inter",
})

export const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
  variable: "--font-grotesk",
})
