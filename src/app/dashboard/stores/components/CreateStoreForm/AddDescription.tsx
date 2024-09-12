import { useFormContext } from "react-hook-form";
import { StoreFormData } from "./storeSchema";

const AddDescription = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<StoreFormData>();
  return (
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
  );
};

export default AddDescription;
