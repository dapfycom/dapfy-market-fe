"use client";
import { FramerButton, FramerDiv } from "@/components/framer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import storesService from "@/services/storesServices";
import { IPaginatedResponse } from "@/types/common.types";
import { IStoreResponse } from "@/types/store.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useGetUserStores } from "../../../../../hooks/useStores";
import AddDescription from "./AddDescription";
import AddLogo from "./AddLogo";
import AddName from "./AddName";
import AddSlug from "./AddSlug";
import AddSocial from "./AddSocial";
import PickTheme from "./PickTheme";
import { StoreFormData, storeSchema } from "./storeSchema";

import { errorToast } from "@/utils/hot-toast";
import { Loader2 } from "lucide-react"; // Import the Loader2 icon from lucide-react
import { toast } from "react-hot-toast";

const CreateStoreForm = ({
  setShowCreateStoreForm,
  editingStore,
}: {
  setShowCreateStoreForm: (show: boolean) => void;
  editingStore: IStoreResponse | null;
}) => {
  const [slugInput, setSlugInput] = useState("");
  const { data: stores, mutate } = useGetUserStores();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<StoreFormData>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      colorTheme: "oceanBreeze",
      socialLinks: {
        FACEBOOK: "",
        INSTAGRAM: "",
        TWITTER: "",
        YOUTUBE: "",
        TIKTOK: "",
      },
      logo: "", // Changed from null to undefined
      name: "",
      description: "",
      slug: "",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = form;

  useEffect(() => {
    if (editingStore) {
      setValue("name", editingStore.name);
      setValue("description", editingStore.description);
      setValue("slug", editingStore.slug);
      setValue("colorTheme", editingStore.banner);
      setValue("logo", editingStore.logo.split("/").pop() ?? "");

      // Set social links if available
      if (editingStore.socials) {
        reset({
          socialLinks: {
            FACEBOOK: "",
            INSTAGRAM: "",
            TWITTER: "",
            YOUTUBE: "",
            TIKTOK: "",
          },
        });
        editingStore.socials.forEach((social) => {
          setValue(`socialLinks.${social.platform}`, social.url);
        });
      }
      setSlugInput(editingStore.slug);
    }
  }, [editingStore, setValue, form]);

  const onSubmit = async (data: StoreFormData) => {
    setIsSubmitting(true);
    try {
      const createStoreDto = {
        name: data.name,
        description: data.description,
        slug: data.slug,
        banner: data.colorTheme,
        logo: data.logo, // This is now the URL of the uploaded image
        socials: JSON.stringify(
          Object.entries(data.socialLinks ?? {})
            .filter(([_, url]) => url !== "")
            .map(([platform, url]) => ({
              platform,
              url,
              id: editingStore?.socials?.find(
                (social) => social.platform === platform
              )?.id,
            }))
        ),
      };

      let updatedStores: IPaginatedResponse<IStoreResponse>;

      if (editingStore) {
        if (!stores) {
          toast.error("Failed to update store: No existing stores found");
          return;
        }
        const res = await storesService.update(editingStore.id, createStoreDto);
        updatedStores = {
          ...stores,
          data: stores.data.map((store) =>
            store.id === editingStore.id ? res.data : store
          ),
        };
        toast.success("Store updated successfully!");
      } else {
        const res = await storesService.create(createStoreDto);
        updatedStores = {
          ...stores,
          data: [...stores?.data!, res.data],
          meta: {
            ...stores!.meta,
            total: stores!.meta.total! + 1,
          },
        };
        toast.success("New store created successfully!");
      }

      await mutate(updatedStores, {
        optimisticData: updatedStores,
        rollbackOnError: true,
        populateCache: true,
        revalidate: false,
      });

      setShowCreateStoreForm(false);
      reset();
    } catch (e) {
      console.error("Failed to submit the form:", e);

      errorToast(
        e,
        `Failed to ${
          editingStore ? "update" : "create"
        } store. Please try again.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to get all error messages
  const getErrorMessages = () => {
    return Object.entries(errors)
      .map(([key, value]) => `${key}: ${value.message}`)
      .join(", ");
  };

  return (
    <FormProvider {...form}>
      <FramerDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow p-6 mt-6"
      >
        <h2 className="text-2xl font-bold mb-6">
          {editingStore ? "Edit store" : "Create a new store"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <AddName setSlugInput={setSlugInput} />
          <AddDescription />

          <AddSlug setSlugInput={setSlugInput} slugInput={slugInput} />

          <PickTheme />
          <AddLogo currentLogo={editingStore?.logo} />

          <AddSocial />

          {Object.keys(errors).length > 0 && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Please correct the following errors: {getErrorMessages()}
              </AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end space-x-4">
            <FramerButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              onClick={() => setShowCreateStoreForm(false)}
              disabled={isSubmitting}
            >
              Cancel
            </FramerButton>
            <FramerButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {editingStore ? "Updating..." : "Creating..."}
                </span>
              ) : editingStore ? (
                "Update Store"
              ) : (
                "Create Store"
              )}
            </FramerButton>
          </div>
        </form>
      </FramerDiv>
    </FormProvider>
  );
};

export default CreateStoreForm;
