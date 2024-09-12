"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";

const Description = () => {
  const form = useFormContext();
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
          value={form.watch("name")}
          onChange={(e) => form.setValue("name", e.target.value)}
          placeholder="Enter product name"
          className="mt-2"
        />
      </div>
      <div>
        <Label htmlFor="product-description" className="text-lg font-semibold">
          Product Description
        </Label>
        <Textarea
          id="product-description"
          value={form.watch("description")}
          onChange={(e) => form.setValue("description", e.target.value)}
          placeholder="Enter product description"
          className="mt-2 min-h-[200px]"
        />
      </div>
      <div>
        <Label className="text-lg font-semibold">
          AI-Generated Product Images
        </Label>
        <div className="grid grid-cols-3 gap-4 mt-2">
          {form.watch("images").map((img: string, index: number) => (
            <Image
              key={index}
              src={img}
              alt={`AI-generated product image ${index + 1}`}
              className="w-full h-auto rounded-md shadow-md"
              width={100}
              height={100}
            />
          ))}
        </div>
      </div>
      <div>
        <Label htmlFor="custom-images" className="text-lg font-semibold">
          Upload Custom Product Images (up to 10)
        </Label>
        <Input
          id="custom-images"
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => form.setValue("customImages", e.target.files)}
          className="mt-2"
        />
        <div className="grid grid-cols-5 gap-4 mt-4">
          {form.watch("customImages").map((img: File, index: number) => (
            <div key={index} className="relative">
              <Image
                src={URL.createObjectURL(img)}
                alt={`Custom product image ${index + 1}`}
                className="w-full h-auto rounded-md shadow-md"
              />
              <button
                onClick={() =>
                  form.setValue(
                    "customImages",
                    form
                      .getValues("customImages")
                      .filter((_: any, i: number) => i !== index)
                  )
                }
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
