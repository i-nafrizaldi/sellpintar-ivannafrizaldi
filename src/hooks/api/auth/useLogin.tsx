"use client";

import { axiosInstance } from "@/lib/axios";
import { useAppDispatch } from "@/redux/hooks";
import { loginAction } from "@/redux/slices/userSlice";
import { Role, User } from "@/types/user.type";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import { AxiosError } from "axios";

interface LoginArgs extends Pick<User, "username"> {
  password: string;
}

interface LoginResponse {
  token: string;
  role: Role;
}

interface JWTPayload {
  userId: string;
  iat: number;
}

const useLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const login = async ({ username, password }: LoginArgs) => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.post<LoginResponse>("/auth/login", {
        username,
        password,
      });

      const { token, role } = data;

      localStorage.setItem("token", token);

      const decoded = jwtDecode<JWTPayload>(token);

      dispatch(
        loginAction({
          id: String(decoded.userId),
          username,
          role,
        })
      );
      toast.success("Login success !");
      router.replace("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading };
};

export default useLogin;
