import { useMDXComponent } from "next-contentlayer/hooks";

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const MDXContent = useMDXComponent(code);

  return (
    <div
      className="prose dark:prose-invert prose-lg 
      prose-headings:scroll-m-20 
      prose-headings:pb-2 
      prose-headings:font-normal 
      prose-h1:text-6xl 
      prose-h1:mb-4
      prose-h2:text-2xl
      prose-h2:mt-4
      prose-h2:mb-4
      prose-h3:text-xl
      prose-h3:mt-4
      prose-h3:mb-4
      prose-p:leading-7
      prose-li:marker:text-muted-foreground
      prose-a:underline
      prose-a:decoration-primary
      hover:prose-a:decoration-2"
    >
      <MDXContent />
    </div>
  );
}
