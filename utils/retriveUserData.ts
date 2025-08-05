import { baseUrl } from "@/constants/baseUrl";
import axios from "axios";

export const retriveUserData = async (userId: string, token: string) => {
  try {
    const res = await axios.get(`${baseUrl}/api/v1/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user = res?.data?.user;
    return user;
  } catch (error: any) {
    console.log(error);
  }
};
