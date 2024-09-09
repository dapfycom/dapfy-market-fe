import { useGetUserStores } from "@/hooks/useStores";
import productsService from "@/services/productsServices";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { File, Upload, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ProductFormData, productSchema } from "./productSchema";

const AddProduct = () => {
  const { data } = useGetUserStores();

  const [images, setImages] = useState<File[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      store: "",
      name: "",
      description: "",
      pricing: "single",
      price: "0",
    },
  });

  const confirmProductCreation = () => {
    setShowConfirmModal(false);
    onSubmit(getValues());
  };

  const onSubmit = (data: ProductFormData) => {
    console.log(data, images, files);
    // Handle form submission

    const formData = new FormData();
    formData.append("title", data.name);
    formData.append("description", data.description);
    formData.append("paymentType", "SINGLE");
    formData.append("price", data.price);
    formData.append("status", "PUBLISHED");

    // Append each image file individually
    images.forEach((image, index) => {
      formData.append(`images`, image);
    });

    // Append each file individually
    files.forEach((file, index) => {
      formData.append(`digitalFiles`, file);
    });

    productsService.create(data.store, formData);

    console.log(formData);
  };

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "images" | "files"
  ) => {
    const uploadedFiles = Array.from(e.target.files || []);
    if (type === "images" && images.length + uploadedFiles.length > 10) {
      alert("You can only upload up to 10 images");
      return;
    }
    if (type === "images") {
      setImages((prev) => [...prev, ...uploadedFiles]);
    } else {
      setFiles((prev) => [...prev, ...uploadedFiles]);
    }
  };

  const removeFile = (index: number, type: "images" | "files") => {
    if (type === "images") {
      setImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      setFiles((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const stores = data?.data;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow p-6"
      >
        <h2 className="text-2xl font-bold mb-6">
          Add a new product to your store{" "}
          <a href="#" className="text-blue-600 text-sm">
            Help↗
          </a>
        </h2>
        <form onSubmit={handleSubmit(() => setShowConfirmModal(true))}>
          <div className="mb-4">
            <label
              htmlFor="store"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select Store
            </label>
            {data?.meta?.total && data?.meta?.total > 0 ? (
              <Controller
                name="store"
                control={control}
                render={({ field }) => (
                  <select {...field} className="w-full p-2 border rounded">
                    <option value="">Select a store</option>
                    {stores?.map((store) => (
                      <option key={store.id} value={store.id}>
                        {store.name}
                      </option>
                    ))}
                  </select>
                )}
              />
            ) : (
              <div>
                <p className="text-gray-600 mb-2">
                  You don&rsquo;t have any stores yet.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Create a Store
                </motion.button>
              </div>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="50-60 characters recommended"
                />
              )}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  rows={3}
                  className="w-full p-2 border rounded"
                  placeholder="120-160 characters recommended"
                ></textarea>
              )}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pricing
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center bg-blue-100 p-3 rounded-lg cursor-pointer transition-colors hover:bg-blue-200">
                <Controller
                  name="pricing"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="radio"
                      name="pricing"
                      value="single"
                      checked={field.value === "single"}
                      onChange={field.onChange}
                      className="mr-2"
                    />
                  )}
                />

                <span>Single Payment</span>
              </label>

              <label className="flex items-center bg-green-100 p-3 rounded-lg cursor-pointer transition-colors hover:bg-green-200">
                <Controller
                  name="pricing"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="radio"
                      name="pricing"
                      checked={field.value === "subscription"}
                      className="mr-2"
                    />
                  )}
                />

                <span>Subscription</span>
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price
            </label>
            <div className="flex items-center">
              <span className="mr-2">$</span>
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    id="price"
                    className="w-24 p-2 border rounded"
                    placeholder="9.99"
                    step="0.01"
                    required
                  />
                )}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Images (up to 10)
            </label>
            <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileUpload(e, "images")}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex items-center justify-center"
              >
                <Upload className="w-6 h-6 mr-2" />
                <span>Click to upload images</span>
              </label>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="relative"
                >
                  <Image
                    src={URL.createObjectURL(image)}
                    alt={`Product image ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={() => removeFile(index, "images")}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  >
                    <X size={12} />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Files (Unlimited files, 5GB total limit)
            </label>
            <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg">
              <input
                type="file"
                multiple
                onChange={(e) => handleFileUpload(e, "files")}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex items-center justify-center"
              >
                <File className="w-6 h-6 mr-2" />
                <span>Click to upload files</span>
              </label>
            </div>
            <div className="mt-2">
              {files.map((file, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between bg-gray-100 p-2 rounded mb-2"
                >
                  <span>{file.name}</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={() => removeFile(index, "files")}
                    className="text-red-500"
                  >
                    <X size={16} />
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Save as draft
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Publish product
            </motion.button>
          </div>
        </form>
      </motion.div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-8 rounded-lg max-w-md"
            >
              <h2 className="text-2xl font-bold mb-4">
                Confirm Product Creation
              </h2>
              <p>Are you sure you want to create this product?</p>
              <div className="mt-6 flex justify-end space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                  onClick={() => setShowConfirmModal(false)}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  onClick={confirmProductCreation}
                >
                  Confirm
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AddProduct;
