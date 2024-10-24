import toast, { ToastOptions } from "react-hot-toast";

export const errorToast = (
  error: any,
  defaultMessage: string,
  options?: ToastOptions
) => {
  const backendErrorMessage = (error as any)?.response?.data?.message;
  const errorMessage = backendErrorMessage || defaultMessage;
  toast.error(errorMessage, options);
};
