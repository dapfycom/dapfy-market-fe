import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Post } from "../../../.contentlayer/generated";

interface BlogCardProps {
  post: Post;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="group relative transition-all duration-200">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative h-64 w-full rounded-lg overflow-hidden mb-4">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover rounded-t-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white font-medium italic text-3xl">
              Read More
            </span>
          </div>
        </div>
        <div className="">
          <h2 className="text- sm  mb-2 ">{post.title}</h2>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>{format(new Date(post.date), "MMM dd, yyyy")}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
