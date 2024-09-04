import useGetCurrentUser from "@/hooks/useGetCurrentUser";
import LoginButton from "./LoginButton";
import ProfileButton from "./ProfileButton";
const Login = () => {
  const { user, isLoading } = useGetCurrentUser();

  if (user) {
    return <ProfileButton />;
  }

  return <LoginButton isLoading={isLoading} />;
};

export default Login;
