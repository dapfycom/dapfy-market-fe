"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import UserServices from "@/services/UserServices";
import { NotificationPreferencesDto } from "@/types/user.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosResponse } from "axios";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useSWR from "swr";
import { z } from "zod";
import { tabVariants } from "../../client";

// Define the form schema
const notificationFormSchema = z.object({
  marketingEmails: z.boolean(),
  communityActivity: z.boolean(),
  newSales: z.boolean(),
  productUpdates: z.boolean(),
});

type NotificationFormData = z.infer<typeof notificationFormSchema>;

const Notifications = () => {
  const {
    data: response,
    error,
    mutate,
  } = useSWR<AxiosResponse<NotificationPreferencesDto>>(
    "/users/notification-preferences",
    UserServices.getNotificationPreferences
  );

  const notificationPreferences = response?.data;

  console.log(notificationPreferences);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NotificationFormData>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      marketingEmails: false,
      communityActivity: false,
      newSales: false,
      productUpdates: false,
    },
  });

  // Populate form when data is fetched
  useEffect(() => {
    if (notificationPreferences) {
      reset({
        marketingEmails: notificationPreferences?.marketingEmails,
        communityActivity: notificationPreferences?.communityActivity,
        newSales: notificationPreferences?.newSales,
        productUpdates: notificationPreferences?.productUpdates,
      });
    }
  }, [notificationPreferences, reset]);

  const onSubmit = async (data: NotificationFormData) => {
    try {
      await toast.promise(UserServices.updateNotificationPreferences(data), {
        loading: "Updating notification preferences...",
        success: "Notification preferences updated successfully",
        error: "Failed to update notification preferences",
      });
      mutate(); // Refresh the data after successful update
    } catch (error) {
      console.error("Error updating notification preferences:", error);
    }
  };

  if (error) return <div>Failed to load notification preferences</div>;
  if (!response) return <div>Loading...</div>;

  return (
    <motion.div
      key="notifications"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={tabVariants}
      className="space-y-6"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <Label className="text-sm font-medium text-gray-700">
            Notification Preferences 🔔
          </Label>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Controller
                name="marketingEmails"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="emailNotifications"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mr-3"
                  />
                )}
              />
              <Label
                htmlFor="emailNotifications"
                className="text-sm text-gray-600 flex-grow"
              >
                📢 Marketing emails
              </Label>
            </div>
            <div className="flex items-center justify-between">
              <Controller
                name="communityActivity"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="pushNotifications"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mr-3"
                  />
                )}
              />
              <Label
                htmlFor="pushNotifications"
                className="text-sm text-gray-600 flex-grow"
              >
                🤝 Community activity
              </Label>
            </div>
            <div className="flex items-center justify-between">
              <Controller
                name="newSales"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="smsNotifications"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mr-3"
                  />
                )}
              />
              <Label
                htmlFor="smsNotifications"
                className="text-sm text-gray-600 flex-grow"
              >
                💰 New sales
              </Label>
            </div>
            <div className="flex items-center justify-between">
              <Controller
                name="productUpdates"
                control={control}
                render={({ field }) => (
                  <Switch
                    id="marketingEmails"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mr-3"
                  />
                )}
              />
              <Label
                htmlFor="marketingEmails"
                className="text-sm text-gray-600 flex-grow"
              >
                🆕 Product updates
              </Label>
            </div>
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

export default Notifications;
