"use client";

import {
  EditProductFormData,
  ProductFormData,
} from "@/app/dashboard/products/productSchema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { config } from "@/config";
import { routes } from "@/config/routes";
import { useDebounce } from "@/hooks/useDebounce";
import { computeSHA256, generateSlug } from "@/lib/utils";
import productsService from "@/services/productsServices";
import axios from "axios";
import { motion } from "framer-motion";
import { Loader2, Upload, X } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import toast from "react-hot-toast";
import useSWR from "swr";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

interface ImagePreview {
  file: File;
  preview: string;
  isUploading: boolean;
}

const Description = () => {
  const pathname = usePathname();
  const productId = pathname.split("/").pop();

  const form = useFormContext<ProductFormData | EditProductFormData>();
  const product = form.watch("product");

  const [debouncedSlug, setDebouncedSlug] = useState("");
  const [previewMode, setPreviewMode] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);

  const uploadImages = async (files: File[]) => {
    const newImages = files.map((file) => ({
      file,
      name: file.name,
      size: file.size,
      preview: URL.createObjectURL(file),
      isUploading: true,
    }));

    form.setValue("images", [...form.getValues("images"), ...newImages]);

    try {
      const signedUrlRequests = await Promise.all(
        newImages.map(async (image) => ({
          contentType: image.file.type,
          fileSize: image.file.size,
          checksum: await computeSHA256(image.file),
          fileName: image.file.name,
        }))
      );

      const { data: signedUrlData } =
        await productsService.getSignedUrlsForImages({
          files: signedUrlRequests,
        });

      newImages.forEach(async (image, index) => {
        try {
          await axios.put(
            signedUrlData.signedUrls[index].signedUrl,
            image.file,
            {
              headers: { "Content-Type": image.file.type },
            }
          );

          const key = signedUrlData.signedUrls[index].key.split("/").pop();
          if (key) {
            form.setValue(
              "images",
              form
                .getValues("images")
                .map((img, i) =>
                  i ===
                  form.getValues("images").length - newImages.length + index
                    ? { ...img, isUploading: false, key }
                    : img
                )
            );
          }
        } catch (error) {
          console.error(`Failed to upload ${image.name}:`, error);
          toast.error(`Failed to upload ${image.name}. Please try again.`);
          form.setValue(
            "images",
            form
              .getValues("images")
              .filter(
                (_, i) =>
                  i !==
                  form.getValues("images").length - newImages.length + index
              )
          );
        }
      });
    } catch (error) {
      console.error("Failed to get signed URLs:", error);
      toast.error("Failed to prepare upload. Please try again.");
      form.setValue(
        "images",
        form.getValues("images").filter((img) => !newImages.includes(img))
      );
    }
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      uploadImages(acceptedFiles);
    },
    [form]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 10,
  });

  const slug = form.watch("slug");
  const debouncedValue = useDebounce(slug, 500);

  const name = form.watch("name");
  const debouncedName = useDebounce(name, 2000);

  const { data, error: slugError } = useSWR(
    debouncedValue ? `/products/check-slug/${debouncedValue}` : null,
    () => productsService.checkSlugAvailability(debouncedValue as string)
  );

  const isSlugAvailable = data?.data.available || data?.data.id === productId;

  useEffect(() => {
    setDebouncedSlug(debouncedValue);
  }, [debouncedValue]);

  useEffect(() => {
    if (debouncedName && !form.getValues("slug")) {
      const newSlug = generateSlug(debouncedName);
      form.setValue("slug", newSlug);
    }
  }, [debouncedName, form]);

  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold">📝 Description</h2>
      <div>
        <Label htmlFor="product-name" className="text-lg font-semibold">
          Product Name
        </Label>
        <Input
          id="product-name"
          {...form.register("name")}
          placeholder="Enter product name"
          className="mt-2"
        />
      </div>
      <div>
        <Label htmlFor="product-slug" className="text-lg font-semibold">
          Product Slug
        </Label>
        <div className="flex justify-center mt-2 flex-col">
          <Input
            id="product-slug"
            {...form.register("slug")}
            placeholder="Enter product slug"
            className={`flex-grow mb-2 ${
              !isSlugAvailable && !slugError && debouncedSlug
                ? "border-red-500"
                : ""
            }`}
          />
          {isSlugAvailable && debouncedSlug && (
            <span className="ml-2 text-sm text-gray-500">
              Preview: {config.appUrl}
              {routes.products}/{debouncedSlug}
            </span>
          )}
          {!isSlugAvailable && !slugError && debouncedSlug && (
            <span className="text-sm text-red-500 ">
              This slug is already in use. Please choose a different one.
            </span>
          )}
        </div>
      </div>
      <div>
        <Label htmlFor="product-description" className="text-lg font-semibold">
          Product Description
        </Label>
        <Textarea
          id="product-description"
          {...form.register("description")}
          placeholder="Enter product description"
          className="mt-2 min-h-[200px]"
        />
      </div>
      <div>
        <Label
          htmlFor="product-long-description"
          className="text-lg font-semibold"
        >
          Long Description (Markdown)
        </Label>
        <div className="mt-2">
          <MDEditor
            value={form.watch("longDescription") || ""}
            onChange={(value) => form.setValue("longDescription", value || "")}
            preview={previewMode ? "preview" : "edit"}
            height={400}
          />
          <button
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            {previewMode ? "Edit" : "Preview"}
          </button>
        </div>
      </div>
      <div>
        <Label htmlFor="custom-images" className="text-lg font-semibold">
          Upload Product Images (up to 10)
        </Label>
        <div
          {...getRootProps()}
          className={`mt-2 border-2 border-dashed rounded-md p-4 text-center cursor-pointer ${
            isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">
            {isDragActive
              ? "Drop the images here..."
              : "Drag 'n' drop images here, or click to select files"}
          </p>
        </div>
        <div className="grid grid-cols-5 gap-4 mt-4">
          {form.getValues("images").map((img, index) => (
            <div key={index} className="relative">
              <Image
                src={img.preview}
                alt={`Custom product image ${index + 1}`}
                width={100}
                height={100}
                className="w-full h-auto rounded-md shadow-md object-cover"
              />
              {img.isUploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md">
                  <Loader2 className="w-6 h-6 text-white animate-spin" />
                </div>
              )}
              <button
                onClick={() => {
                  form.setValue(
                    "images",
                    form.getValues("images").filter((_, i) => i !== index)
                  );
                }}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Description;
