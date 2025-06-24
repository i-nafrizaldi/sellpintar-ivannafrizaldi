import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { FromLogin } from "./components/FormLogin";

const Login = () => {
  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center ">
      <FromLogin />
    </div>
  );
};

export default Login;
