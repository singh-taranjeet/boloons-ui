import Image from "next/image";
import type { Metadata } from "next";

const description = `On Boloons you can play free online games to sharpen your brain. Boloons has the best online game selection and offers the most fun experience to play alone or with friends. We support mobile and desktop games.`;
const title = `Online Brain games on Boloons - Lets play`;
export const metadata: Metadata = {
  title,
  description,
  applicationName: "Boloons",
  openGraph: {
    type: "website",
    description,
    title,
    images: "",
  },
  authors: { name: "Taranjeet Singh" },
};

export default function Page() {
  return <main></main>;
}
