import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetUserStores } from "@/hooks/useStores";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";

const SelectStore = () => {
  const form = useFormContext();

  const { data, isLoading } = useGetUserStores();

  if (isLoading) return <div>Loading...</div>;

  const stores = data?.data;

  return (
    <motion.div
      key="step0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold">🏪 Select Store</h2>
      <Select
        onValueChange={(store) => form.setValue("store", store)}
        value={form.watch("store")}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose a store" />
        </SelectTrigger>
        <SelectContent>
          {stores?.map((store) => (
            <SelectItem key={store.id} value={store.id}>
              {store.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </motion.div>
  );
};

export default SelectStore;
