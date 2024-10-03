"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import UserServices from "@/services/UserServices";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useSWR from "swr";
import { z } from "zod";
import { tabVariants } from "../../client";

// Define the form schema
const businessFormSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  companyEmail: z.string().email("Invalid email address"),
  description: z.string().optional(),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
});

type BusinessFormData = z.infer<typeof businessFormSchema>;

const Business = () => {
  const {
    data: response,
    error,
    mutate,
  } = useSWR("/users/business-info", UserServices.getBusinessInfo);
  console.log(response);

  const businessInfo = response?.data;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BusinessFormData>({
    resolver: zodResolver(businessFormSchema),
  });

  // Populate form when data is fetched
  useEffect(() => {
    if (businessInfo) {
      reset({
        businessName: businessInfo.businessName || "",
        companyEmail: businessInfo.companyEmail || "",
        description: businessInfo.description || "",
        website: businessInfo.website || "",
      });
    }
  }, [businessInfo, reset]);

  const onSubmit: SubmitHandler<BusinessFormData> = async (data) => {
    try {
      await toast.promise(UserServices.updateBusinessInfo(data), {
        loading: "Updating business information...",
        success: "Business information updated successfully",
        error: "Failed to update business information",
      });
      mutate(); // Refresh the data after successful update
    } catch (error) {
      console.error("Error updating business info:", error);
    }
  };

  if (error) return <div>Failed to load business information</div>;
  if (!businessInfo) return <div>Loading...</div>;

  return (
    <motion.div
      key="business"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={tabVariants}
      className="space-y-6"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="businessName"
              className="text-sm font-medium text-gray-700"
            >
              Business Name 🏢
            </Label>
            <Input
              id="businessName"
              {...register("businessName")}
              placeholder="Your Business Name"
              className="h-10"
            />
            {errors.businessName && (
              <p className="text-red-500 text-sm">
                {errors.businessName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="companyEmail"
              className="text-sm font-medium text-gray-700"
            >
              Business Email 📧
            </Label>
            <Input
              id="companyEmail"
              type="email"
              {...register("companyEmail")}
              placeholder="business@example.com"
              className="h-10"
            />
            {errors.companyEmail && (
              <p className="text-red-500 text-sm">
                {errors.companyEmail.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Business Description 📝
            </Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Describe your business..."
              className="min-h-[100px] resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="website"
              className="text-sm font-medium text-gray-700"
            >
              Website 🌐
            </Label>
            <Input
              id="website"
              type="url"
              {...register("website")}
              placeholder="https://yourbusiness.com"
              className="h-10"
            />
            {errors.website && (
              <p className="text-red-500 text-sm">{errors.website.message}</p>
            )}
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

export default Business;
