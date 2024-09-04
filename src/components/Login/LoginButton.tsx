import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import authService from "@/services/authService";
import { selectUser } from "@/store/slices/authSlice";
import { useAppSelector } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { OutlineButton, PrimaryButton } from "../buttonts";
import { GoogleIcon } from "../icons";
import { LoginFormValues, loginSchema } from "./loginSchema";
const LoginButton = ({ isLoading }: { isLoading: boolean }) => {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isMagicLinkLoading, setIsMagicLinkLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const user = useAppSelector(selectUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const handleEmailSubmit = async (data: LoginFormValues) => {
    setIsMagicLinkLoading(true);
    // Simulate API call
    await authService.loginWithMagicLink(data.email);
    setIsMagicLinkLoading(false);
    setShowSuccessMessage(true);
    // Reset success message after 5 seconds
    setTimeout(() => setShowSuccessMessage(false), 5000);
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    // Simulate API call
    const { data } = await authService.loginWithGoogle();
    setIsGoogleLoading(false);
    // Here you would implement the actual Google authentication logic
    window.location.href = data.url;
  };

  return (
    <Dialog open={isOpen} onOpenChange={isLoading ? () => {} : setIsOpen}>
      <DialogTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <OutlineButton disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}{" "}
            Log in
          </OutlineButton>
        </motion.div>
      </DialogTrigger>
      <AnimatePresence>
        {isOpen && (
          <DialogContent className="sm:max-w-[425px] bg-blue-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader>
                <motion.h2
                  className="text-2xl font-bold text-blue-900 text-center"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  Log in to Dapfy.com
                </motion.h2>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Button
                    onClick={handleGoogleLogin}
                    variant="outline"
                    className="w-full border-blue-300 text-blue-700 hover:bg-blue-100"
                    disabled={isGoogleLoading}
                  >
                    {isGoogleLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <GoogleIcon className="mr-2 h-4 w-4" />
                    )}
                    {isGoogleLoading ? "Logging in..." : "Login with Google"}
                  </Button>
                </motion.div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-blue-300" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-blue-50 px-2 text-blue-700">Or</span>
                  </div>
                </div>
                <motion.form
                  onSubmit={handleSubmit(handleEmailSubmit)}
                  className="space-y-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <div className="grid w-full items-center gap-1.5">
                    <Label htmlFor="email" className="text-blue-900">
                      Email
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      {...register("email")}
                      className="border-blue-300 focus:border-blue-500"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <PrimaryButton type="submit" disabled={isMagicLinkLoading}>
                    {isMagicLinkLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Mail className="mr-2 h-4 w-4" />
                    )}
                    {isMagicLinkLoading ? "Sending..." : "Send Magic Link"}
                  </PrimaryButton>
                </motion.form>
                <AnimatePresence>
                  {showSuccessMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Alert className="bg-green-100 border-green-500 text-green-800">
                        <AlertDescription>
                          We sent you a link, check your inbox ✅
                        </AlertDescription>
                      </Alert>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
};

export default LoginButton;
