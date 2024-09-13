"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { config } from "@/config";
import { routes } from "@/config/routes";
import { generateSlug } from "@/lib/utils";
import { motion } from "framer-motion";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { ProductFormData } from "../../productSchema";

const Description = () => {
  const form = useFormContext<ProductFormData>();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const currentImages = form.getValues("images") || [];
      const newImages = [...currentImages, ...acceptedFiles].slice(0, 10);
      form.setValue("images", newImages);
    },
    [form]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 10,
  });

  useEffect(() => {
    const name = form.watch("name");
    if (name && !form.getValues("slug")) {
      form.setValue("slug", generateSlug(name));
    }
  }, [form.watch("name")]);

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
            className="flex-grow mb-2"
          />
          <span className="ml-2 text-sm text-gray-500">
            Preview: {config.appUrl}
            {routes.products}/{form.watch("slug")}
          </span>
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
          {form.watch("images")?.map((img: File, index: number) => (
            <div key={index} className="relative">
              <Image
                src={URL.createObjectURL(img)}
                alt={`Custom product image ${index + 1}`}
                width={100}
                height={100}
                className="w-full h-auto rounded-md shadow-md object-cover"
              />
              <button
                onClick={() => {
                  const currentImages = form.getValues("images") || [];
                  form.setValue(
                    "images",
                    currentImages.filter((_: any, i: number) => i !== index)
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
