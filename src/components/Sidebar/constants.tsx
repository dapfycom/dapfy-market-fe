import { BookOpen, ChartSpline, Globe } from "lucide-react";

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export interface NavItem {
  icon: React.ReactNode;
  label: string;
  href?: string;
  children?: { name: string; emoji?: string; href: string }[];
}

export const navigationItems: NavItem[] = [
  {
    icon: <Globe className="w-4 h-4" />,
    label: "Discover",
    href: "/discover",
  },
  {
    icon: <ChartSpline className="w-4 h-4" />,
    label: "Analytics",
    href: "/analytics",
  },
  {
    icon: <BookOpen className="w-4 h-4" />,
    label: "Library",
    children: [], // This will be populated with categories
  },
];
