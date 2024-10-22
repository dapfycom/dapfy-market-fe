import { cn } from "@/lib/utils";
import Image from "next/image";
const Logo = ({
  className,
  imageClassName,
  textClassName,
}: {
  className?: string;
  imageClassName?: string;
  textClassName?: string;
}) => {
  return (
    <div
      className={cn(
        "flex items-center gap-2 hover:text-blue-500 transition-colors",
        className
      )}
    >
      <div className={cn("rounded-full overflow-hidden", imageClassName)}>
        <Image src="/logo.jpg" alt="logo" width={32} height={32} />
      </div>
      <h1 className={cn("text-xl font-semibold", textClassName)}>Dapfy</h1>
    </div>
  );
};

export default Logo;
