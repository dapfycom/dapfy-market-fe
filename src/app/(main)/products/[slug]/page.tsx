import { config } from "@/config";
import productsService from "@/services/productsServices";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import Product from "./Product";

export const revalidate = 3600;
export const dynamicParams = true;

const getProduct = cache(async (slug: string) => {
  try {
    const res = await productsService.findOne(slug);
    return res.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return null; // Return null for not found products
    }
    throw error; // Rethrow other errors
  }
});

export async function generateStaticParams() {
  const { data } = await productsService.findAll();
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
  const data = await getProduct(params.slug);

  if (!data) {
    return {
      title: "Product Not Found",
      description: "The requested product does not exist.",
    };
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${data.title} | Product Details`,
    description: data.description,
    openGraph: {
      title: `${data.title} | Product Details`,
      description: data.description,
      url: `${config.appUrl}/products/${params.slug}`,
      siteName: config.appName,
      images: [
        {
          url: data.images[0]?.url || "/images/default-product.png", // Assuming the first image is the main product image
          width: 800,
          height: 600,
          alt: `${data.title} image`,
        },
        ...previousImages,
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.title} | Product Details`,
      description: data.description,
      images: [data.images[0]],
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
      canonical: `${config.appUrl}/products/${params.slug}`,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getProduct(params.slug);

  if (!data) {
    notFound(); // Use Next.js notFound() for 404 errors
  }

  return <Product product={data} />;
}
