import React, { useState } from "react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DEMO_NAMES, LOGIN, LOGOUT, MY_LINKS } from "@/constants/constants";
import { LinkIcon, LogOut } from "lucide-react";
import { urlContextState } from "@/context";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  const {data} = urlContextState();
  const handleLoginClick = () => {
    navigate("/auth");
    setUser(!user);
  };
  return (
    <nav className="flex justify-between p-4 items-center">
      <Link to="/">
        <img
          className="h-24"
          src="src/assets/Test Img.png"
          alt="Clipify Logo"
        />
      </Link>
      <div className="">
        {user ? (
          <Button onClick={handleLoginClick}>{LOGIN}</Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full w-10 border-white overflow-hidden">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{data?.user_metadata?.name}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{DEMO_NAMES}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LinkIcon className="w-4 mr-1" />
                <span>{MY_LINKS}</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-400"
                onClick={() => setUser(!user)}
              >
                <LogOut className="w-4 mr-2" />
                {LOGOUT}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
};

export default Header;
