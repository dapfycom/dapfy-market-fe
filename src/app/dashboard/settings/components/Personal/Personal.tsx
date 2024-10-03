import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UserServices from "@/services/UserServices";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useSWR from "swr";
import { z } from "zod";
import { tabVariants } from "../../client";

// Define the form schema
const personalFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  telegram: z.string().optional(),
  whatsapp: z.string().optional(),
  twitter: z.string().optional(),
});

type PersonalFormData = z.infer<typeof personalFormSchema>;

const Personal = () => {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: response, error } = useSWR(
    "/users/personal-info",
    UserServices.getPersonalInfo
  );
  const personalInfo = response?.data;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PersonalFormData>({
    resolver: zodResolver(personalFormSchema),
  });

  // Populate form when data is fetched
  useEffect(() => {
    if (personalInfo) {
      reset({
        name: personalInfo.name,
        email: personalInfo.email,
        telegram: personalInfo.telegram || "",
        whatsapp: personalInfo.whatsApp || "",
        twitter: personalInfo.twitter || "",
      });
      setAvatarPreview(personalInfo.avatar || null);
    }
  }, [personalInfo, reset]);

  const onSubmit: SubmitHandler<PersonalFormData> = async (data) => {
    try {
      await toast.promise(
        UserServices.updatePersonalInfo(data, avatarFile || undefined),
        {
          loading: "Updating personal information...",
          success: "Personal information updated successfully",
          error: "Failed to update personal information",
        }
      );
    } catch (error) {
      console.error("Error updating personal info:", error);
    }
  };

  const handleAvatarChange = (file: File) => {
    console.log("handleAvatarChange called with file:", file);
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  if (error) return <div>Failed to load personal information</div>;
  if (!personalInfo) return <div>Loading...</div>;

  return (
    <motion.div
      key="personal"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={tabVariants}
      className="space-y-6"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center space-x-6">
          <button
            type="button"
            onClick={handleAvatarClick}
            className="p-0 h-auto bg-transparent border-none cursor-pointer"
          >
            <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
              <AvatarImage
                src={avatarPreview || "/placeholder-avatar.jpg"}
                alt="User"
              />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              console.log("File input changed:", e.target);
              const file = e.target.files?.[0];
              if (file) {
                handleAvatarChange(file);
              }
            }}
          />
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Name 👤
            </Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Your Name"
              className="h-10"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email 📧
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="your.email@example.com"
              className="h-10"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="telegram"
              className="text-sm font-medium text-gray-700"
            >
              Telegram 📱
            </Label>
            <Input
              id="telegram"
              {...register("telegram")}
              placeholder="@yourusername"
              className="h-10"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="whatsapp"
              className="text-sm font-medium text-gray-700"
            >
              WhatsApp 💬
            </Label>
            <Input
              id="whatsapp"
              {...register("whatsapp")}
              placeholder="+1234567890"
              className="h-10"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="twitter"
              className="text-sm font-medium text-gray-700"
            >
              X (Twitter) 🐦
            </Label>
            <Input
              id="twitter"
              {...register("twitter")}
              placeholder="@yourusername"
              className="h-10"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className={`w-full h-12 text-lg font-semibold rounded-full transition-all duration-300 ${
            isSubmitting
              ? "bg-green-500 text-white cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
          }`}
        >
          {isSubmitting ? (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center"
            >
              <Check className="mr-2 h-5 w-5" />
              Applying...
            </motion.span>
          ) : (
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Apply Changes 🚀
            </motion.span>
          )}
        </Button>
      </form>
    </motion.div>
  );
};

export default Personal;
