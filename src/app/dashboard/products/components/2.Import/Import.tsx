"use client";

import { ProductFormData } from "@/app/dashboard/products/productSchema";
import { Label } from "@/components/ui/label";
import { IProductDetailsResponse } from "@/types/product.types";
import { motion } from "framer-motion";
import { File, Upload } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";

interface FilePreview {
  name: string;
  size: number;
  preview: string;
}

const Import = () => {
  const form = useFormContext<
    ProductFormData & { product?: IProductDetailsResponse }
  >();
  const [files, setFiles] = useState<FilePreview[]>([]);

  // const path = usePathname();
  // const isEdit = path.includes("edit");

  // useEffect(() => {
  //   if (isEdit) {
  //     const product = form.getValues("product");
  //     if (product) {
  //       setFiles(product..map((file) => ({
  //         name: file.name,
  //         size: file.size,
  //         preview: file.url,
  //       })));
  //     }
  //   }
  // }, [isEdit, form]);

  const onDrop = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      name: file.name,
      size: file.size,
      preview: file.type.startsWith("image") ? URL.createObjectURL(file) : "",
    }));
    setFiles(newFiles);
    form.setValue("files", acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    noClick: true, // Prevent opening file dialog on click
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleButtonClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      if (target.files) {
        onDrop(Array.from(target.files));
      }
    };
    input.click();
  };

  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 w-full max-w-full "
    >
      <h2 className="text-2xl font-semibold">📤 Import/Upload</h2>

      <div className="space-y-4">
        <Label className="text-lg font-semibold">Upload Product File(s)</Label>
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-8 text-center hover:border-gray-400 transition-colors"
        >
          <div className="space-y-2">
            <Upload className="w-8 h-8 sm:w-12 sm:h-12 mx-auto text-gray-400" />
            <p className="text-base sm:text-lg font-medium">
              Drag and drop files here
            </p>
            <p className="text-xs sm:text-sm text-gray-500">or</p>
            <button
              type="button"
              onClick={handleButtonClick}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Select Files
            </button>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Support for videos, music, images, PDFs, and more (up to 5GB)
            </p>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">
            Uploaded Files ({files.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {files.map((file, index) => (
              <div
                key={index}
                className="border rounded-lg p-2 sm:p-4 flex items-center space-x-2 sm:space-x-4 overflow-hidden"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
                  {file.preview ? (
                    <Image
                      src={file.preview}
                      alt={file.name}
                      width={64}
                      height={64}
                      className="rounded-md object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
                      <File className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-grow min-w-0">
                  <p className="font-medium text-sm sm:text-base truncate">
                    {file.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Import;
