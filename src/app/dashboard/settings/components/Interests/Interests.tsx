"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import UserServices from "@/services/UserServices";
import categoriesService from "@/services/categoriesServices";
import { ICategoryResponse } from "@/types/category.types";
import { InterestsDto } from "@/types/user.types";
import { AxiosResponse } from "axios";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import { tabVariants } from "../../client";

const Interests = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: categoriesResponse, error: categoriesError } = useSWR<
    AxiosResponse<ICategoryResponse[]>
  >("/categories", categoriesService.findAll);
  const categories = categoriesResponse?.data;

  const {
    data: response,
    error: userInterestsError,
    mutate,
  } = useSWR<AxiosResponse<InterestsDto[]>>(
    "/users/interests",
    UserServices.getInterests,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    }
  );

  const userInterests = response?.data;

  useEffect(() => {
    if (userInterests) {
      setSelectedInterests(
        userInterests.map((interest) => interest.categoryId)
      );
    }
  }, [userInterests?.length]);

  const handleInterestToggle = (categoryId: string) => {
    setSelectedInterests((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await toast.promise(
        UserServices.updateInterests({ categoryIds: selectedInterests }),
        {
          loading: "Updating interests...",
          success: "Interests updated successfully",
          error: "Failed to update interests",
        }
      );
      mutate(); // Refresh the user interests data after successful update
    } catch (error) {
      console.error("Error updating interests:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (categoriesError || userInterestsError)
    return <div>Failed to load data</div>;
  if (!categories || !userInterests) return <div>Loading...</div>;

  return (
    <motion.div
      key="interests"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={tabVariants}
      className="space-y-6"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <Label className="text-sm font-medium text-gray-700">
            Select Your Interests 🎯
          </Label>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-3">
                <Switch
                  id={category.id}
                  checked={selectedInterests.includes(category.id)}
                  onCheckedChange={() => handleInterestToggle(category.id)}
                />
                <Label
                  htmlFor={category.id}
                  className="text-sm text-gray-600 cursor-pointer"
                >
                  {category.name}
                </Label>
              </div>
            ))}
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

export default Interests;
