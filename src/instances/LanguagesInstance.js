import { store } from "../app/store/store";
import axiosInstance from "./axiosInstances";

export const getAllLanguagesInstance = async () => {
  try {
    const accessToken = store.getState()?.accessToken;
    const response = await axiosInstance({
      url: "/getAllLanguages",
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log("language", error);
  }
};
