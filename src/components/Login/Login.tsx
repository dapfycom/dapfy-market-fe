import useGetCurrentUser from "@/hooks/useGetCurrentUser";
import LoginButton from "./LoginButton";
import ProfileButton from "./ProfileButton";
const Login = () => {
  const { user } = useGetCurrentUser();

  if (user) {
    return <ProfileButton />;
  }

  return <LoginButton />;
};

export default Login;
