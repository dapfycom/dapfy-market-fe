import { BlogCard } from "@/components/blog/blog-card";
import { compareDesc } from "date-fns";
import { Metadata } from "next";
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

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
