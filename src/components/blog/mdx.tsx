import { useMDXComponent } from "next-contentlayer/hooks";

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const MDXContent = useMDXComponent(code);

  return (
    <div
      className="prose dark:prose-invert 
      max-w-none
      prose-headings:scroll-m-20 
      prose-headings:font-normal 
      
      /* Responsive h1 */
      prose-h1:text-3xl
      md:prose-h1:text-4xl
      lg:prose-h1:text-5xl
      prose-h1:mb-4
      prose-h1:font-bold
      
      /* Responsive h2 */
      prose-h2:text-xl
      md:prose-h2:text-2xl
      prose-h2:mt-8
      prose-h2:mb-4
      prose-h2:font-semibold
      
      /* Responsive h3 */
      prose-h3:text-lg
      md:prose-h3:text-xl
      prose-h3:mt-6
      prose-h3:mb-4
      prose-h3:font-medium
      
      /* Paragraphs and content */
      prose-p:text-base
      prose-p:leading-7
      md:prose-p:text-lg
      prose-p:my-4
      
      /* Lists */
      prose-li:marker:text-muted-foreground
      prose-li:my-2
      
      /* Links */
      prose-a:text-blue-600
      dark:prose-a:text-blue-400
      prose-a:no-underline
      hover:prose-a:underline
      
      /* Code blocks */
      prose-pre:bg-gray-900
      prose-pre:rounded-lg
      prose-pre:p-4
      prose-pre:my-4
      
      /* Inline code */
      prose-code:text-sm
      prose-code:bg-gray-100
      dark:prose-code:bg-gray-800
      prose-code:px-1
      prose-code:py-0.5
      prose-code:rounded
      
      /* Images */
      prose-img:rounded-lg
      prose-img:my-8"
    >
      <MDXContent />
    </div>
  );
}
