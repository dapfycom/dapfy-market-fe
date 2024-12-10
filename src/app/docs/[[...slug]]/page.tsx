import { Mdx } from "@/components/blog/mdx";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { allDocs } from "../../../../.contentlayer/generated";
import DocsPage from "../page2";

interface DocPageProps {
  params: {
    slug?: string[];
  };
}

async function getDocFromParams(params: DocPageProps["params"]) {
  const slug = params?.slug?.join("/") || "introduction";

  const doc = allDocs.find((doc) => doc.slug === "docs/" + slug);

  if (!doc) {
    return null;
  }

  return doc;
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const doc = await getDocFromParams(params);

  if (!doc) {
    return {
      title: "Documentation",
      description:
        "Learn how to build amazing applications with our comprehensive guides and tutorials.",
    };
  }

  return {
    title: doc.title,
    description: doc.description,
  };
}

export async function generateStaticParams() {
  const staticParams = allDocs.map((doc) => ({
    slug: doc.slug.split("/"),
  }));

  return staticParams;
}

export default async function DocPage({ params }: DocPageProps) {
  if (params?.slug === undefined) {
    return <DocsPage />;
  }

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
