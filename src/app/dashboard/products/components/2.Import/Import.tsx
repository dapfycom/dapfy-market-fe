"use client";

import { ProductFormData } from "@/app/dashboard/products/productSchema";
import { Label } from "@/components/ui/label";
import { computeSHA256 } from "@/lib/utils";
import productsService from "@/services/productsServices";
import { SignedUrlRequestDto } from "@/types/common.types";
import axios from "axios";
import { motion } from "framer-motion";
import { File, Loader2, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { toast } from "react-hot-toast";

interface FilePreview {
  file: File;
  name: string;
  size: number;
  preview: string;
  key?: string;
  isUploading: boolean;
}

const Import = () => {
  const form = useFormContext<ProductFormData>();
  const files = useMemo(() => form.watch("files") || [], [form]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) => ({
        file,
        name: file.name,
        size: file.size,
        preview: file.type.startsWith("image") ? URL.createObjectURL(file) : "",
        isUploading: true,
      }));

      form.setValue("files", [...files, ...newFiles]);

      try {
        const signedUrlRequests: SignedUrlRequestDto[] = await Promise.all(
          newFiles.map(async (filePreview) => ({
            contentType: filePreview.file.type,
            fileSize: filePreview.file.size,
            checksum: await computeSHA256(filePreview.file),
            fileName: filePreview.file.name,
          }))
        );

        const { data: signedUrlData } =
          await productsService.getSignedUrlsForDigitalFiles({
            files: signedUrlRequests,
          });

        newFiles.map(async (filePreview, index) => {
          try {
            await axios.put(
              signedUrlData.signedUrls[index].signedUrl,
              filePreview.file,
              {
                headers: { "Content-Type": filePreview.file.type },
              }
            );

            const key = signedUrlData.signedUrls[index].key.split("/").pop();
            const prevFiles = form.getValues("files") || [];

            if (key) {
              form.setValue(
                "files",
                prevFiles.map((f: FilePreview, i: number) =>
                  i === prevFiles.length - newFiles.length + index
                    ? { ...f, isUploading: false, key }
                    : f
                )
              );
            }
          } catch (error) {
            console.error(`Failed to upload ${filePreview.name}:`, error);
            toast.error(
              `Failed to upload ${filePreview.name}. Please try again.`
            );
            const prevFiles = form.getValues("files") || [];

            form.setValue(
              "files",
              prevFiles.filter(
                (_, i) => i !== prevFiles.length - newFiles.length + index
              )
            );
          }
        });
      } catch (error) {
        console.error("Failed to get signed URLs:", error);
        toast.error("Failed to prepare upload. Please try again.");
        const prevFiles = form.getValues("files") || [];

        form.setValue(
          "files",
          prevFiles.filter((f) => !newFiles.includes(f))
        );
      }
    },
    [files, form]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleRemoveFile = (index: number) => {
    form.setValue(
      "files",
      files.filter((_, i) => i !== index)
    );
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
          <input {...getInputProps()} />
          <div className="space-y-2">
            <Upload className="w-8 h-8 sm:w-12 sm:h-12 mx-auto text-gray-400" />
            <p className="text-base sm:text-lg font-medium">
              {isDragActive
                ? "Drop the files here"
                : "Drag and drop files here"}
            </p>
            <p className="text-xs sm:text-sm text-gray-500">or</p>
            <button
              type="button"
              onClick={() => {}}
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
                <div className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 relative">
                  {file.preview ? (
                    <Image
                      src={file.preview}
                      alt={file.name}
                      fill
                      className="rounded-md object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
                      <File className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                    </div>
                  )}
                  {file.isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md">
                      <Loader2 className="w-6 h-6 text-white animate-spin" />
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
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                  disabled={file.isUploading}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Import;
