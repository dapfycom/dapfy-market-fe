"use client";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { StoreFormData } from "./storeSchema";

const AddLogo = ({ currentLogo }: { currentLogo?: string }) => {
  const { setValue, watch } = useFormContext<StoreFormData>();
  const [preview, setPreview] = useState<string | null>(currentLogo ?? null);

  useEffect(() => {
    setPreview(currentLogo ?? null);
  }, [currentLogo]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        setValue("logo", file);
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
      <Label
        htmlFor="logo"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Store Logo
      </Label>

      {preview ? (
        <div className="mb-4 relative w-32 h-32 mx-auto">
          <Image
            src={preview}
            alt="Logo preview"
            fill
            className="rounded-lg object-cover"
          />
          <button
            onClick={() => {
              setPreview(null);
              setValue("logo", undefined);
            }}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs"
            type="button"
          >
            X
          </button>
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
    </div>
  );
};

export default AddLogo;
