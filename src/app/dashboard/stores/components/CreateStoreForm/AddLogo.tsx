"use client";
import { computeSHA256 } from "@/lib/utils";
import storesService from "@/services/storesServices";
import axios from "axios";
import { Loader2, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { toast } from "react-hot-toast";
import { StoreFormData } from "./storeSchema";

const AddLogo = ({ currentLogo }: { currentLogo?: string }) => {
  const { setValue, register } = useFormContext<StoreFormData>();

  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (currentLogo) {
      setPreview(currentLogo);
      setValue("logo", currentLogo);
    }
  }, [currentLogo, setValue]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setIsUploading(true);
        try {
          // Generate preview
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result as string);
          };
          reader.readAsDataURL(file);

          // Get signed URL
          const { data: signedUrlData } = await storesService.getSignedUrl(
            file.type,
            file.size,
            await computeSHA256(file),
            file.name
          );

          // Upload to S3
          await axios.put(signedUrlData.signedUrl, file, {
            headers: { "Content-Type": file.type },
          });

          // Set the URL in the form
          setValue("logo", signedUrlData.key.split("/").pop() ?? "");
          toast.success("Logo uploaded successfully!");
        } catch (error) {
          console.error("Failed to upload logo:", error);
          toast.error("Failed to upload logo. Please try again.");
          setPreview(null);
        } finally {
          setIsUploading(false);
        }
      }
    },
    [setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg", ".gif"],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  return (
    <div className="mb-4">
      {preview ? (
        <div className="mb-4 relative w-32 h-32 mx-auto group">
          <Image
            src={preview}
            alt="Logo preview"
            fill
            className={`rounded-full object-cover transition-opacity ${
              isUploading ? "opacity-50" : "opacity-100"
            }`}
          />
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
          )}
          <div
            className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity rounded-lg ${
              isUploading ? "opacity-0" : "opacity-0 group-hover:opacity-100"
            }`}
          >
            <button
              onClick={() => {
                setPreview(null);
                setValue("logo", "");
              }}
              className="text-white p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors"
              type="button"
              aria-label="Delete logo"
              disabled={isUploading}
            >
              <Trash2 className="w-6 h-6" />
            </button>
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragActive
              ? "border-gray-400 bg-gray-100"
              : "border-gray-300 hover:border-gray-400"
          }`}
        >
          <input {...getInputProps()} />
          <div className="space-y-2">
            <Upload className="w-12 h-12 mx-auto text-gray-400" />
            <p className="text-lg font-medium">
              {isDragActive
                ? "Drop the file here"
                : "Drag and drop or click to upload"}
            </p>
            <p className="text-sm text-gray-500">
              Support for JPEG, PNG, JPG, GIF (up to 5MB)
            </p>
          </div>
        </div>
      )}

      <input type="hidden" {...register("logo")} />
      {isUploading && (
        <p className="text-sm text-blue-500 mt-2 text-center">
          Uploading logo...
        </p>
      )}
    </div>
  );
};

export default AddLogo;
