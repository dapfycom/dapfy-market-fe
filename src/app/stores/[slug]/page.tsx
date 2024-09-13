import { config } from "@/config";
import storesService from "@/services/storesServices";
import { IStoreResponse } from "@/types/sotre.types";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import DigitalStore from "./StoresClient";
export const runtime = "edge";
export const revalidate = 3600;
export const dynamicParams = true;

// Moved to the top for better visibility
const getStore = cache(async (slug: string) => {
  const { data } = await storesService.findOne(slug);
  return data;
});

export async function generateStaticParams() {
  const { data } = await storesService.findAll();
  return data.map(({ slug }) => ({ slug }));
}

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  let data: IStoreResponse;
  try {
    data = await getStore(params.slug);
  } catch {
    notFound();
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${data.name} | Digital Store`,
    description: data.description,

    openGraph: {
      title: `${data.name} | Digital Store`,
      description: data.description,
      url: `${config.appUrl}/stores/${params.slug}`,
      siteName: data.name,
      images: [
        {
          url: data.logo,
          width: 800,
          height: 600,
          alt: `${data.name} logo`,
        },
        ...previousImages,
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.name} | Digital Store`,
      description: data.description,
      images: [data.logo],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `https://yourdomain.com/stores/${params.slug}`,
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  try {
    const data = await getStore(params.slug);
    return <DigitalStore store={data} />;
  } catch {
    notFound();
  }
}
