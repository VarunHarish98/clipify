import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";
import Login from "@/components/Login";
import SignUp from "@/components/SignUp";

const Auth = () => {
  const [searchParams] = useSearchParams(); // React hook to search the query param of a url
  return (
    <>
      <h2 className="text-5xl text-white font-extrabold text-center">
        {searchParams.get("createNew")
          ? "Hold on, Let's Login first!"
          : "Login / Signup"}
      </h2>
      <div className="flex items-center justify-center py-20">
        <Tabs
          defaultValue="Login"
          className="flex flex-col items-center justify-center w-[400px]"
        >
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="Login">Login</TabsTrigger>
            <TabsTrigger value="Sign-Up">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent className="w-[400px]" value="Login">
            <Login />
          </TabsContent>
          <TabsContent className="w-[400px]" value="Sign-Up">
            <SignUp />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Auth;
