import { Mdx } from "@/components/blog/mdx";
import { format } from "date-fns";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { allPosts } from "../../../../../.contentlayer/generated";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._raw.flattenedPath,
  }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: post.authors,
      images: [post.image],
    },
  };
}

export default function PostPage({ params }: PostPageProps) {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);

  if (!post) notFound();

  return (
    <article className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="relative h-[548px] w-full mb-6">
          <Image
            src={post.image}
            alt={post.title}
            className="object-cover rounded-lg"
            fill
            priority
          />
        </div>

        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex w-full justify-between mb-8">
            <div className="flex gap-16">
              <div className="flex flex-col ">
                <div className="text-sm text-gray-600 font-semibold">
                  Written by
                </div>
                <div>{post.authors.join(", ")}</div>
              </div>

              <div className="flex flex-col ">
                <div className="text-sm text-gray-800 font-semibold">
                  Published on
                </div>
                <div>{format(new Date(post.date), "MMMM dd, yyyy")}</div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="p-4 rounded-md border border-gray-400 h-fit">
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="currentColor"
                >
                  <title>X</title>
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </div>

              <div className="p-4 rounded-md border border-gray-400 h-fit">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 448 512"
                  height={24}
                  width={24}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Linkedin</title>
                  <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900 border-2 mb-10" />

          <div className="prose prose-lg max-w-none">
            <Mdx code={post.body.code} />
          </div>
        </div>
      </div>
    </article>
  );
}
