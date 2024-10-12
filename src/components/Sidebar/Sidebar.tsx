import { GhostButton } from "@/components/buttonts";
import { FramerDiv } from "@/components/framer";
import { routes } from "@/config/routes";
import categoriesService from "@/services/categoriesServices";
import Link from "next/link";
import Logo from "../Logo";
import { fadeInUp } from "./constants";
import SideBarWrapper from "./SideBarWrapper";

const getCategories = async () => {
  const { data: categories } = await categoriesService.findAll();
  return categories;
};

const Aside = async () => {
  const categories = await getCategories();

  // insert manually "ALL" category
  const allCategory = {
    id: "all",
    name: "All",
    emoji: "🏠",
  };

  categories.unshift(allCategory);
  return (
    <SideBarWrapper>
      <div className="flex flex-col h-full">
        <div className="flex-1 flex flex-col">
          <Link href={"/"} className="block px-4 mb-4 h-[57px]">
            <Logo />
          </Link>
          <div className="px-4 mb-4 space-y-4">
            <div className="p-2 rounded-md transition-colors duration-200 ease-in-out hover:bg-blue-200 cursor-pointer">
              🔍 Discover
            </div>
            <div className="p-2 rounded-md transition-colors duration-200 ease-in-out hover:bg-blue-200 cursor-pointer">
              📊 Analytics
            </div>
            <details className="group">
              <summary className="p-2 rounded-md transition-colors duration-200 ease-in-out hover:bg-blue-200 cursor-pointer list-none">
                📚 Library
              </summary>
              <div className="mt-2 border-l border-blue-200 ">
                {categories.map((category, index) => (
                  <FramerDiv key={index} variants={fadeInUp}>
                    <GhostButton
                      variant="ghost"
                      className="w-full justify-start text-left font-normal text-gray-700 hover:bg-blue-100 hover:text-blue-800 pl-3 transition-transform duration-200 ease-in-out hover:scale-105"
                      asChild
                    >
                      <Link href={`${routes.home}?category=${category.name}`}>
                        {category.emoji && (
                          <span className="mr-2 text-lg">{category.emoji}</span>
                        )}
                        <span className="text-sm">{category.name}</span>
                      </Link>
                    </GhostButton>
                  </FramerDiv>
                ))}
              </div>
            </details>
          </div>
        </div>

        <div className="px-4">
          <div className="flex justify-center space-x-4 ">
            <a
              href="https://blog.mymedialab.com"
              target="_blank"
              rel="noopener noreferrer"
              className=" hover:text-blue-800"
            >
              Blog
            </a>

            <a
              href="https://www.mymedialab.com"
              target="_blank"
              rel="noopener noreferrer"
              className=" hover:text-blue-800"
            >
              Docs
            </a>
          </div>

          <div className="flex justify-center mt-4 space-x-4">
            <Link
              href="https://x.com/mymedialab"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
              >
                <title>X</title>
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            </Link>

            <Link
              href="https://www.tiktok.com/@mymedialab"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
              >
                <title>TikTok</title>
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
              </svg>
            </Link>

            <Link
              href="https://www.youtube.com/@mymedialab"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
              >
                <title>YouTube</title>
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </SideBarWrapper>
  );
};

export default Aside;
