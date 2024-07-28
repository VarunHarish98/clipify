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
import {LOGIN, LOGOUT, MY_LINKS } from "@/constants/constants";
import { LinkIcon, LogOut } from "lucide-react";
import { urlContextState } from "@/context";
import { signOutUser } from "@/db/auth";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  const { data, fetchUser } = urlContextState();
  // const handleLoginClick = () => {
  //   navigate("/auth");
  //   // setUser(!);
  // };
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
          <Button
            onClick={() => {
              navigate("/auth");
              setUser(false)
            }}
          >
            {LOGIN}
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full w-10 border-white overflow-hidden">
              <Avatar>
                <AvatarImage src={data?.user_metadata?.profile_pic} />
                <AvatarFallback>{data?.user_metadata?.name}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{data?.user_metadata?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LinkIcon className="w-4 mr-1" />
                <span>{MY_LINKS}</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-400"
                onClick={() => {
                  signOutUser();
                  navigate("/");
                  setUser(true);    
                }}
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
