"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import Image from "next/image";
import { useFormContext } from "react-hook-form";

const Review = () => {
  const form = useFormContext();

  const onSubmit = () => {
    console.log(form.getValues());
  };

  return (
    <motion.div
      key="step4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold">🚀 Review and Create</h2>
      <div className="space-y-4">
        <div>
          <Label className="font-semibold">Store</Label>
          <p>{form.watch("store")}</p>
        </div>
        <div>
          <Label className="font-semibold">Product Name</Label>
          <p>{form.watch("name")}</p>
        </div>
        <div>
          <Label className="font-semibold">Description</Label>
          <div
            dangerouslySetInnerHTML={{ __html: form.watch("description") }}
          />
        </div>
        <div>
          <Label className="font-semibold">Pricing</Label>
          <p>
            {form.watch("pricingType") === "onetime"
              ? "One-time Payment"
              : "Subscription"}
            : ${form.watch("price")}
          </p>
        </div>
        <div>
          <Label className="font-semibold">Images</Label>
          <div className="grid grid-cols-5 gap-4 mt-2">
            {(form.watch("customImages").length > 0
              ? form.watch("customImages")
              : form.watch("images")
            ).map((img: string, index: number) => (
              <Image
                key={index}
                src={img}
                alt={`Product image ${index + 1}`}
                className="w-full h-auto rounded-md shadow-md"
                width={100}
                height={100}
              />
            ))}
          </div>
        </div>
      </div>
      <Button
        onClick={() => form.handleSubmit(onSubmit)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
      >
        Create Product
      </Button>
    </motion.div>
  );
};

export default Review;
