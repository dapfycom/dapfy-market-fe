import { BlogCard } from "@/components/blog/blog-card";
import { compareDesc } from "date-fns";
import { Metadata } from "next";
import Link from "next/dist/client/link";
import Image from "next/image";
import { allPosts } from "../../../../.contentlayer/generated";

export const metadata: Metadata = {
  title: "Blog | Your Site Name",
  description:
    "Read our latest articles about technology, development, and more.",
};

export default function BlogPage() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  const firstPost = posts[0];
  const othersPost = posts.slice(1);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-4 gap-8 mb-8">
        <div className="col-span-3">
          <div className="relative h-96 w-full">
            <Link href={firstPost.url}>
              <Image
                src={firstPost.image}
                alt={firstPost.title}
                fill
                className="object-cover rounded-lg"
              />
            </Link>
          </div>
        </div>

        <div className="col-span-1">
          <div className="flex flex-col justify-end h-full">
            <h2 className="text-xl mb-2">{firstPost.title}</h2>
            <p className="text-gray-600 mb-4 line-clamp-2">
              {firstPost.description}
            </p>

            <Link href={firstPost.url} className="text-blue-500">
              Read more
            </Link>
          </div>
        </div>
      </div>

      <div className="h-[1px] bg-gray-500 my-8" />
      <div className="col-span-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {othersPost.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
