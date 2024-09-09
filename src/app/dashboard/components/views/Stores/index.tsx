import { randomString } from "@/lib/utils";
import storesService from "@/services/storesServices";
import { IPaginatedResponse } from "@/types/common.types";
import { IStoreResponse } from "@/types/sotre.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useGetUserStores } from "../../../../../hooks/useStores";
import { StoreFormData, storeSchema } from "./storeSchema";

const Stores = () => {
  const { data: stores, mutate } = useGetUserStores();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<StoreFormData>({
    resolver: zodResolver(storeSchema),
  });
  const [showCreateStoreForm, setShowCreateStoreForm] = useState(false);

  const onSubmit = async (data: StoreFormData) => {
    try {
      const createStore = async (): Promise<
        IPaginatedResponse<IStoreResponse>
      > => {
        const res = await storesService.create(data);

        return {
          ...stores,
          data: [...stores?.data!, res.data],
          meta: {
            ...stores!.meta,
            total: stores!.meta.total! + 1,
          },
        };
      };

      await mutate(createStore, {
        optimisticData: {
          ...stores,
          data: [
            ...stores!.data,
            {
              id: randomString(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              ownerId: randomString(),
              name: data.name,
              description: data.description,
            },
          ],
          meta: {
            ...stores!.meta,
            total: stores?.meta.total! + 1,
          },
        },
        rollbackOnError: true,
        populateCache: true,
        revalidate: false,
      });

      toast.success("Successfully added the new item.");

      setShowCreateStoreForm(false);
      reset();
    } catch (e) {
      toast.error("Failed to add the new item.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {stores?.meta.total === 0 && !showCreateStoreForm ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-xl mb-4">You don&apos;t have a store yet</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => setShowCreateStoreForm(true)}
          >
            Create your store
          </motion.button>
        </motion.div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stores?.data.map((store, index) => (
              <motion.div
                key={store.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <h3 className="text-lg font-semibold mb-2">{store.name}</h3>
                <p className="text-gray-600 mb-2">{store.description}</p>
                <a
                  href={store.name}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit store
                </a>
              </motion.div>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white rounded-lg shadow p-6 border-2 border-dashed border-gray-300 flex items-center justify-center hover:bg-gray-50"
              onClick={() => setShowCreateStoreForm(true)}
            >
              <PlusCircle className="w-8 h-8 text-gray-400" />
            </motion.button>
          </div>
        </>
      )}
      <AnimatePresence>
        {showCreateStoreForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow p-6 mt-6"
          >
            <h2 className="text-2xl font-bold mb-6">Create a new store</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Store Name
                </label>
                <input
                  {...register("name")}
                  type="text"
                  id="name"
                  className="w-full p-2 border rounded"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  {...register("description")}
                  id="description"
                  rows={3}
                  className="w-full p-2 border rounded"
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="url"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Store URL
                </label>
                <input
                  {...register("url")}
                  type="url"
                  id="url"
                  className="w-full p-2 border rounded"
                />
                {errors.url && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.url.message}
                  </p>
                )}
              </div>
              <div className="flex justify-end space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                  onClick={() => setShowCreateStoreForm(false)}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Create Store
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Stores;
