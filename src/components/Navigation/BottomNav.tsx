import categoriesService from "@/services/categoriesServices";
import { BottomNavClient } from "./BottomNavClient";

const getCategories = async () => {
  const { data: categories } = await categoriesService.findAll();
  return categories;
};

const BottomNav = async () => {
  const categories = await getCategories();
  categories.unshift({ id: "all", name: "All", emoji: "🏠" });

  return <BottomNavClient categories={categories} />;
};

export default BottomNav;
