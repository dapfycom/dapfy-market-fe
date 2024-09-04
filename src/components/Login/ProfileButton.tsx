import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import routes from "@/config/routes";
import useGetCurrentUser from "@/hooks/useGetCurrentUser";
import { clearUser } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store/store";

import { ChevronDown, LayoutDashboard, LogOut, Settings } from "lucide-react";
import Link from "next/link";
const ProfileButton = () => {
  const { user } = useGetCurrentUser();

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(clearUser());
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500"
        >
          {user?.email}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem asChild>
          <Link href={routes.dashboard}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Go to Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={routes.settings}>
            <Settings className="mr-2 h-4 w-4" />
            <span>User Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileButton;
