import React from "react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <nav className="flex justify-between">
      <Link to="/">
        <img
          className="h-24"
          src="src/assets/Test Img.png"
          alt="Clipify Logo"
          
        />
      </Link>
      <div className="p-8">
        <Button onClick={() => navigate("/auth")}>Login</Button>
      </div>
    </nav>
  );
};

export default Header;
