"use client";

import SelectStore from "@/app/dashboard/products/components/1.SelectStore/SelectStore";
import Import from "@/app/dashboard/products/components/2.Import/Import";
import Description from "@/app/dashboard/products/components/3.Description/Description";
import Pricing from "@/app/dashboard/products/components/4.Pricing/Pricing";
import Review from "@/app/dashboard/products/components/5.Review/Review";
import Final from "@/app/dashboard/products/components/6.Final/Final";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle,
  ChevronLeft,
  DollarSign,
  FileText,
  Store,
  Upload,
} from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { EditProductFormData, ProductFormData } from "../productSchema";

const steps = [
  { name: "Select Store", icon: Store, emoji: "🏪" },
  { name: "Import/Upload", icon: Upload, emoji: "📤" },
  { name: "Description", icon: FileText, emoji: "📝" },
  { name: "Pricing", icon: DollarSign, emoji: "💰" },
  { name: "Review & Create", icon: CheckCircle, emoji: "🚀" },
];

interface EnhancedProductFlowProps {
  title: string;
  onSubmit: (data: any, onNextStep: () => void) => void;
  isEditing?: boolean;
  isSubmitting: boolean;
}

export default function EnhancedProductFlow({
  title,
  onSubmit,
  isEditing = false,
  isSubmitting = false,
}: EnhancedProductFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const { handleSubmit } = useFormContext<
    ProductFormData | EditProductFormData
  >();

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <SelectStore />;
      case 1:
        return <Import />;
      case 2:
        return <Description />;
      case 3:
        return <Pricing />;
      case 4:
        return <Review />;
      case 5:
        return <Final />;
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-4xl h-[90vh] m-auto bg-white shadow-xl rounded-xl overflow-auto">
      <CardHeader className="p-6 bg-gradient-to-r from-blue-500 to-blue-600">
        <CardTitle className="text-3xl font-bold text-white">{title}</CardTitle>
        <div className="mt-6 mb-2">
          <Progress
            value={(currentStep / (steps.length - 1)) * 100}
            className="w-full h-2"
          />
        </div>
        <div className="flex justify-between items-center mt-4 text-white">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className={`flex flex-col items-center ${
                index <= currentStep ? "opacity-100" : "opacity-50"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: index <= currentStep ? 1 : 0.5, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                className="mb-2 p-3 bg-white rounded-full"
                initial={{ scale: 0.8 }}
                animate={{
                  scale: index === currentStep ? 1.2 : 1,
                  backgroundColor:
                    index < currentStep
                      ? "#4CAF50"
                      : index === currentStep
                      ? "#FFFFFF"
                      : "#E0E0E0",
                }}
                transition={{ duration: 0.3 }}
              >
                {
                  <step.icon
                    className={`w-8 h-8 ${
                      index <= currentStep ? "text-blue-600" : "text-gray-400"
                    }`}
                  />
                }
              </motion.div>
              <span className="text-sm font-medium mt-1 whitespace-nowrap">
                {step.emoji} {step.name}
              </span>
            </motion.div>
          ))}
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
      </CardContent>
      <CardFooter className="p-6 bg-gray-50 flex justify-between">
        {currentStep > 0 && currentStep < steps.length && (
          <Button
            variant="outline"
            onClick={handleBack}
            className="flex items-center"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        )}
        {currentStep < steps.length - 1 && (
          <Button
            onClick={handleNext}
            className="ml-auto bg-blue-600 hover:bg-blue-700 text-white"
          >
            {currentStep === steps.length - 2 ? "Review" : "Next"}
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button
            onClick={handleSubmit((data) => onSubmit(data, handleNext))}
            className="ml-auto bg-green-600 hover:bg-green-700 text-white"
          >
            {isEditing
              ? isSubmitting
                ? "Updating Product..."
                : "Update Product"
              : isSubmitting
              ? "Creating Product..."
              : "Create Product"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
