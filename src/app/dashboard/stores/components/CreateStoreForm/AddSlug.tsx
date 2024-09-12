import { config } from "@/config";
import { routes } from "@/config/routes";
import { useFormContext } from "react-hook-form";
import { StoreFormData } from "./storeSchema";

const AddSlug = ({
  setSlugInput,
  slugInput,
}: {
  setSlugInput: (slug: string) => void;
  slugInput: string;
}) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<StoreFormData>();

  return (
    <div className="mb-4">
      <label
        htmlFor="slug"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Slug
      </label>
      <input
        {...register("slug")}
        type="text"
        id="slug"
        className="w-full p-2 border rounded"
        value={slugInput}
        onChange={(e) => setSlugInput(e.target.value)}
      />
      {errors.slug && (
        <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>
      )}
      <p className="text-sm text-gray-500 mt-1">
        Your store URL will be: {config.appUrl}
        {routes.stores}/{slugInput}
      </p>
    </div>
  );
};

export default AddSlug;
