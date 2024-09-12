import { iconsUrl } from "@/config";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { StoreFormData } from "./storeSchema";

type SocialLink = "FACEBOOK" | "INSTAGRAM" | "TWITTER" | "YOUTUBE" | "TIKTOK";
const socialLinks: SocialLink[] = [
  "FACEBOOK",
  "INSTAGRAM",
  "TWITTER",
  "YOUTUBE",
  "TIKTOK",
];

const socialIcons: Record<SocialLink, string> = {
  FACEBOOK: "facebook.svg",
  INSTAGRAM: "instagram.svg",
  TWITTER: "x.svg",
  YOUTUBE: "youtube.svg",
  TIKTOK: "tiktok.svg",
};

const AddSocial = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<StoreFormData>();

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Social Links (Optional)
      </label>
      {socialLinks.map((platform) => (
        <div key={platform} className="mb-2">
          <div className="flex items-center">
            <Image
              src={`${iconsUrl}/${socialIcons[platform]}`}
              alt={platform}
              className="w-5 h-5 mr-2"
              width={20}
              height={20}
            />
            <input
              {...register(`socialLinks.${platform}`, {
                pattern: {
                  value:
                    /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
                  message: "Invalid URL format",
                },
              })}
              type="text"
              placeholder={`${
                platform.charAt(0).toUpperCase() +
                platform.toLocaleLowerCase().slice(1)
              } URL (optional)`}
              className="w-full p-2 border rounded"
            />
          </div>
          {errors.socialLinks?.[platform] && (
            <p className="text-red-500 text-xs mt-1">
              {errors.socialLinks[platform]?.message}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default AddSocial;
