import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { routes } from "@/config/routes";
import useGetCurrentUser from "@/hooks/useGetCurrentUser";
import { clearUser } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store/store";
import { ChevronDown, LogOut } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const ProfileButton = () => {
  const { mutate, user } = useGetCurrentUser();

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(clearUser());
    mutate();
  };

  return (
    <div className="flex items-center">
      <Button
        className="bg-transparent text-gray-800 hover:bg-transparent flex items-center gap-2 px-0"
        asChild
      >
        <Link href={routes.dashboard}>
          <span>
            <Avatar className="w-6 h-6">
              <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
              <AvatarImage src={user?.avatar ?? undefined} />
            </Avatar>
          </span>
          {user?.name || user?.email}
        </Link>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="p-2 h-[32px] px-2">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileButton;
