"use client";

import { axiosInstance } from "@/lib/axios";
import { useAppDispatch } from "@/redux/hooks";
import { loginAction } from "@/redux/slices/userSlice";
import { User } from "@/types/user.type";

interface KeepLoginResponse {
  message: string;
  data: User;
}

const useKeepLogin = () => {
  const token = localStorage.getItem("token");
  const dispatch = useAppDispatch();

  const keepLogin = async () => {
    try {
      const { data } = await axiosInstance.get<KeepLoginResponse>(
        "/auth",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(loginAction(data.data));
    } catch (error) {
      console.log(error);
    }
  };
  return { keepLogin };
};

export default useKeepLogin;
