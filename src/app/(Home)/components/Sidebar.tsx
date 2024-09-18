import { GhostButton } from "@/components/buttonts";
import { FramerDiv } from "@/components/framer";
import { routes } from "@/config/routes";
import categoriesService from "@/services/categoriesServices";
import Link from "next/link";
import { fadeInUp } from "../constants";
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
      {categories.map((category, index) => (
        <FramerDiv key={index} variants={fadeInUp}>
          <GhostButton
            variant="ghost"
            className="w-full justify-start text-left font-normal text-gray-700 hover:bg-blue-100 hover:text-blue-800"
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
    </SideBarWrapper>
  );
};

export default Aside;
