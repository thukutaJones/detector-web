import { baseUrl } from "@/constants/baseUrl";
import axios from "axios";

export const retriveUserData = async (userId: string, token: string) => {
  try {
    console.log("userId", userId);
    console.log("token", token);
    const res = await axios.get(`${baseUrl}/api/v1/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user = res?.data?.user;
    console.log("user", user);
    return user;
  } catch (error: any) {
    console.log(error);
  }
};
