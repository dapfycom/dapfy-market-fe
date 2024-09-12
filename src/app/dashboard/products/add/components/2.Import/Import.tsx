"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";

const Import = () => {
  const form = useFormContext();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      form.setValue("file", acceptedFiles[0]);
    },
  });

  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold">📤 Import/Upload</h2>

      <div className="space-y-4">
        <Label htmlFor="product-file" className="text-lg font-semibold">
          Upload Product File
        </Label>
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors"
        >
          <Input
            id="product-file"
            type="file"
            className="hidden"
            {...getInputProps()}
          />
          <Label htmlFor="product-file" className="cursor-pointer">
            <div className="space-y-2">
              <Upload className="w-12 h-12 mx-auto text-gray-400" />
              <p className="text-lg font-medium">
                Drag and drop or click to upload
              </p>
              <p className="text-sm text-gray-500">
                Support for videos, music, images, PDFs, and more (up to 5GB)
              </p>
            </div>
          </Label>
        </div>
      </div>
    </motion.div>
  );
};

export default Import;
