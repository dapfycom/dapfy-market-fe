import { ColorTheme } from "@/types/common.types";

export const config = {
  appUrl: process.env.NEXT_PUBLIC_APP_URL,
  awsBucketName: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
  appName: "Dapfy.com",
};

export const staticUrl = config.appUrl + "/statics";

export const iconsUrl = staticUrl + "/images/icons";

export const bannerThemes: {
  [key in ColorTheme]: {
    label: string;
    gradient: string;
    description: string;
  };
} = {
  oceanBreeze: {
    label: "Ocean Breeze",
    gradient: "from-blue-400 to-teal-400",
    description: "A cool blend of blues and teals",
  },
  sunsetGlow: {
    label: "Sunset Glow",
    gradient: "from-orange-400 to-pink-400",
    description: "Warm oranges and pinks",
  },
  forestMist: {
    label: "Forest Mist",
    gradient: "from-green-400 to-blue-300",
    description: "Serene greens and soft blues",
  },
  lavenderDreams: {
    label: "Lavender Dreams",
    gradient: "from-purple-400 to-pink-300",
    description: "Soothing purples and pinks",
  },
  goldenHour: {
    label: "Golden Hour",
    gradient: "from-yellow-400 to-amber-500",
    description: "Rich golds and warm ambers",
  },
};

export const AUTH_TOKEN_KEY = "accessToken";
