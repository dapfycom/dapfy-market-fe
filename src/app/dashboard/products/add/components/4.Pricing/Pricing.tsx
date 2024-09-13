"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PricingType } from "@/types/product.types";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";

const Pricing = () => {
  const form = useFormContext();
  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold">💰 Pricing Configuration</h2>
      <div>
        <Label htmlFor="pricing-type" className="text-lg font-semibold">
          Pricing Type
        </Label>
        <Select
          onValueChange={(pricingType) => form.setValue("pricing", pricingType)}
          value={form.getValues("pricing")}
        >
          <SelectTrigger id="pricing-type" className="w-full mt-2">
            <SelectValue
              placeholder="Choose pricing type"
              className="text-black placeholder:text-black"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={PricingType.SINGLE}>One-time Payment</SelectItem>
            <SelectItem value={PricingType.SUBSCRIPTION}>
              Subscription
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="price" className="text-lg font-semibold">
          Price ($)
        </Label>
        <Input
          id="price"
          type="number"
          placeholder="Enter price"
          className="mt-2"
          {...form.register("price")}
        />
      </div>
    </motion.div>
  );
};

export default Pricing;
