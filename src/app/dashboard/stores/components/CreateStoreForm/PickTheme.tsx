import { bannerThemes } from "@/config";
import { cn } from "@/lib/utils";
import { ColorTheme } from "@/types/common.types";
import { useFormContext, UseFormRegister } from "react-hook-form";
import { StoreFormData } from "./storeSchema";

const PickTheme = () => {
  const { register, watch } = useFormContext<StoreFormData>();

  const selectedTheme = watch("colorTheme");

  return (
    <div className="mb-6">
      <label
        htmlFor="logo"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Select a Color Theme for Banner
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(bannerThemes).map(([theme, { label, gradient }]) => (
          <ThemeOption
            key={theme}
            register={register}
            value={theme as ColorTheme}
            label={label}
            description={bannerThemes[theme as ColorTheme].description}
            gradient={gradient}
            isSelected={selectedTheme === theme}
          />
        ))}
      </div>
    </div>
  );
};

interface ThemeOptionProps {
  register: UseFormRegister<StoreFormData>;
  value: ColorTheme;
  label: string;
  description: string;
  gradient: string;
  isSelected: boolean;
}

function ThemeOption({
  register,
  value,
  label,
  description,
  gradient,
  isSelected,
}: ThemeOptionProps) {
  return (
    <div className="relative">
      <input
        type="radio"
        id={value}
        value={value}
        {...register("colorTheme")}
        className="sr-only"
      />
      <label
        htmlFor={value}
        className={cn(
          `flex flex-col justify-between h-full p-4 bg-gradient-to-r ${gradient} rounded-lg cursor-pointer transition-all duration-200 ease-in-out`,
          isSelected && "ring-2 ring-offset-2 ring-blue-500"
        )}
      >
        <div>
          <div className="font-semibold text-white">{label}</div>
          <div className="text-sm text-white/80">{description}</div>
        </div>
        {isSelected && (
          <div className="absolute top-2 right-2 w-4 h-4 bg-white rounded-full shadow-md"></div>
        )}
      </label>
    </div>
  );
}

export default PickTheme;
