import useGetCurrentUser from "@/hooks/useGetCurrentUser";
import dynamic from "next/dynamic";
import LoginButton from "./LoginButton";
const ProfileButton = dynamic(() => import("./ProfileButton"), { ssr: false });
const Login = () => {
  const { user } = useGetCurrentUser();

  if (user) {
    return <ProfileButton />;
  }

  return <LoginButton />;
};

export default Login;
