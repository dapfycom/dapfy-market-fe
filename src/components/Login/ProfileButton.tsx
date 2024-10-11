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

const ProfileButton = () => {
  const { mutate } = useGetCurrentUser();

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(clearUser());
    mutate();
  };

  return (
    <div className="flex">
      <Button
        variant="outline"
        className="bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 rounded-r-none border-r-0"
        asChild
      >
        <Link href={routes.dashboard}>Dashboard</Link>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 rounded-l-none border-l-0"
          >
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
