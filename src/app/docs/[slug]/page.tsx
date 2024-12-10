import { Mdx } from "@/components/blog/mdx";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { allDocs } from "../../../../.contentlayer/generated";

interface DocPageProps {
  params: {
    slug: string;
  };
}

async function getDocFromParams(params: DocPageProps["params"]) {
  const slug = params?.slug || "introduction";
  const doc = allDocs.find((doc) => doc.slug === slug);
  console.log(doc);

  if (!doc) {
    null;
  }

  return doc;
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const doc = await getDocFromParams(params);

  if (!doc) {
    return {};
  }

  return {
    title: doc.title,
    description: doc.description,
  };
}

export async function generateStaticParams() {
  return allDocs.map((doc) => ({
    slug: doc.slug,
  }));
}

export default async function DocPage({ params }: DocPageProps) {
  console.log(params);

  const doc = await getDocFromParams(params);

  if (!doc) {
    notFound();
  }

  return (
    <article className="prose prose-slate dark:prose-invert max-w-none">
      <h1>{doc.title}</h1>
      <Mdx code={doc.body.code} />
    </article>
  );
}
