"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
      <RadioGroup
        onValueChange={(pricingType) =>
          form.setValue("pricingType", pricingType)
        }
        className="space-y-4"
      >
        <div className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
          <RadioGroupItem value="onetime" id="onetime" />
          <Label htmlFor="onetime" className="text-lg">
            One-time Payment
          </Label>
        </div>
        <div className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
          <RadioGroupItem value="subscription" id="subscription" />
          <Label htmlFor="subscription" className="text-lg">
            Subscription
          </Label>
        </div>
      </RadioGroup>
      <div>
        <Label htmlFor="price" className="text-lg font-semibold">
          Price ($)
        </Label>
        <Input
          id="price"
          type="number"
          value={form.watch("price")}
          onChange={(e) => form.setValue("price", e.target.value)}
          placeholder="Enter price"
          className="mt-2"
        />
      </div>
    </motion.div>
  );
};

export default Pricing;
