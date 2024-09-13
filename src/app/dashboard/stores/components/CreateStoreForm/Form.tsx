"use client";
import { FramerButton, FramerDiv } from "@/components/framer";
import { randomString } from "@/lib/utils";
import storesService from "@/services/storesServices";
import { IPaginatedResponse } from "@/types/common.types";
import { IStoreResponse } from "@/types/sotre.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useGetUserStores } from "../../../../../hooks/useStores";
import AddDescription from "./AddDescription";
import AddLogo from "./AddLogo";
import AddName from "./AddName";
import AddSlug from "./AddSlug";
import AddSocial from "./AddSocial";
import PickTheme from "./PickTheme";
import { StoreFormData, storeSchema } from "./storeSchema";

import { Loader2 } from "lucide-react"; // Import the Loader2 icon from lucide-react

const CreateStoreForm = ({
  setShowCreateStoreForm,
}: {
  setShowCreateStoreForm: (show: boolean) => void;
}) => {
  console.log("render create store form");

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
      logo: undefined,
      name: "",
      description: "",
      slug: "",
    },
  });
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = form;
  console.log(errors);

  const onSubmit = async (data: StoreFormData) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("slug", data.slug);
      formData.append("banner", data.colorTheme);

      if (data.logo) {
        formData.append("logo", data.logo);
      }

      if (data.socialLinks) {
        const socialArray = Object.entries(data.socialLinks)
          .filter(([_, url]) => url !== "")
          .map(([platform, url]) => ({ platform, url }));
        formData.append("socials", JSON.stringify(socialArray));
      }

      const createStore = async (): Promise<
        IPaginatedResponse<IStoreResponse>
      > => {
        const res = await storesService.create(formData);

        return {
          ...stores,
          data: [...stores?.data!, res.data],
          meta: {
            ...stores!.meta,
            total: stores!.meta.total! + 1,
          },
        };
      };

      await mutate(createStore, {
        optimisticData: {
          ...stores,
          data: [
            ...stores!.data,
            {
              id: randomString(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              ownerId: randomString(),
              name: data.name,
              description: data.description,
              slug: data.slug,
              logo: "",
              socials: [],
              banner: data.colorTheme, // Add this line
              products: [],
            },
          ],
          meta: {
            ...stores!.meta,
            total: stores?.meta.total! + 1,
          },
        },
        rollbackOnError: true,
        populateCache: true,
        revalidate: false,
      });

      setShowCreateStoreForm(false);
      reset();
    } catch (e) {
      console.error("Failed to add the new item:", e);
    } finally {
      setIsSubmitting(false);
    }
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
        <h2 className="text-2xl font-bold mb-6">Create a new store</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AddName setSlugInput={setSlugInput} />
          <AddDescription />

          <AddSlug setSlugInput={setSlugInput} slugInput={slugInput} />

          <PickTheme />
          <AddLogo />

          <AddSocial />

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
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
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
