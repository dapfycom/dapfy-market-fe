import { generateSlug } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { StoreFormData } from "./storeSchema";

const AddName = ({
  setSlugInput,
}: {
  setSlugInput: (slug: string) => void;
}) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<StoreFormData>();

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    const generatedSlug = generateSlug(name);
    setSlugInput(generatedSlug);
    // Update the slug field in the form
    setValue("slug", generatedSlug);
  };
  return (
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
        onChange={onNameChange}
      />
      {errors.name && (
        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
      )}
    </div>
  );
};

export default AddName;
