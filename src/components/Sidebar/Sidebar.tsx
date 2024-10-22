import { FramerDiv } from "@/components/framer";
import { routes } from "@/config/routes";
import categoriesService from "@/services/categoriesServices";
import {
  BookMarked,
  BookOpen,
  ChartSpline,
  FileText,
  Globe,
} from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import CloseSidebarButton from "../CloseSidebarButton";
import Logo from "../Logo";
import Searcher from "../Search/Searcher";
import { fadeInUp } from "./constants";
import SideBarWrapper from "./SideBarWrapper";
const Login = dynamic(() => import("@/components/Login/Login"), { ssr: false });

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
          <div className="flex justify-between items-center  pl-4 pr-2 mb-6">
            <Link href={"/"} className="">
              <Logo />
            </Link>
            <CloseSidebarButton />
          </div>

          <Searcher
            customTrigger={
              <div className="text-gray-500 text-sm px-4 mb-4 rounded-full bg-white/30 backdrop-blur-sm py-2 mx-4 cursor-pointer border border-transparent hover:border-blue-500">
                Search products...
              </div>
            }
          />
          <div className="mb-4 space-y-xs">
            <div className="flex items-center text-gray-600 px-4 py-2 transition-colors duration-200 ease-in-out hover:bg-blue-200/30 cursor-pointer">
              <Globe className="w-4 h-4 mr-2" /> Discover
            </div>

            <div className="flex items-center text-gray-600 px-4 py-2 transition-colors duration-200 ease-in-out hover:bg-blue-200/30 cursor-pointer">
              <ChartSpline className="w-4 h-4 mr-2" /> Analytics
            </div>

            <details className="group" open={true}>
              <summary className="flex items-center text-gray-600 px-4 py-2 transition-colors duration-200 ease-in-out hover:bg-blue-200/30 cursor-pointer">
                <BookOpen className="w-4 h-4 mr-2" /> Library
              </summary>
              <div className="mt-2 border-l border-blue-200 ml-6">
                {categories.map((category, index) => (
                  <FramerDiv key={index} variants={fadeInUp}>
                    <Link href={`${routes.home}?category=${category.name}`}>
                      <div className="w-full py-2 justify-start text-left text-xs font-normal text-gray-700  hover:text-blue-800 pl-3 transition-transform duration-200 hover:scale-105">
                        {category.emoji && (
                          <span className="mr-1">{category.emoji}</span>
                        )}
                        <span className="">{category.name}</span>
                      </div>
                    </Link>
                  </FramerDiv>
                ))}
              </div>
            </details>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex items-center text-gray-600 px-4 py-2 transition-colors duration-200 ease-in-out hover:bg-blue-200/30 cursor-pointer">
            <FileText className="w-4 h-4 mr-2" /> Blog
          </div>

          <div className="flex items-center text-gray-600 px-4 py-2 transition-colors duration-200 ease-in-out hover:bg-blue-200/30 cursor-pointer">
            <BookMarked className="w-4 h-4 mr-2" /> Docs
          </div>
        </div>
        <div className="flex justify-end px-4">
          <Socials />
        </div>
      </div>
    </SideBarWrapper>
  );
};

export default Aside;

const socials: { href: string; icon: React.ReactNode }[] = [
  {
    href: "",
    icon: (
      <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        fill="currentColor"
      >
        <title>X</title>
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
      </svg>
    ),
  },
  {
    href: "",
    icon: (
      <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        fill="currentColor"
      >
        <title>TikTok</title>
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    href: "",
    icon: (
      <svg
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        fill="currentColor"
      >
        <title>YouTube</title>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

const Socials = () => {
  return (
    <div className="flex gap-1 pr-1">
      {socials.map((social, index) => (
        <a
          key={index}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-800 text-xs rounded-full hover:bg-gray-300/50 p-2"
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
};
