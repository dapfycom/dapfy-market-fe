import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Post } from "../../../.contentlayer/generated";

interface BlogCardProps {
  post: Post;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="group rounded-lg border shadow-sm hover:shadow-md transition-all duration-200">
      <Link href={post.url}>
        <div className="relative h-48 w-full">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover rounded-t-lg"
          />
        </div>
        <div className="p-4">
          <div className="flex gap-2 mb-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <h2 className="text-xl font-semibold mb-2 group-hover:-translate-y-0.5 transition-transform">
            {post.title}
          </h2>
          <p className="text-gray-600 mb-4 line-clamp-2">{post.description}</p>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>{format(new Date(post.date), "MMM dd, yyyy")}</span>
            <span>{post.readingTime} min read</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
