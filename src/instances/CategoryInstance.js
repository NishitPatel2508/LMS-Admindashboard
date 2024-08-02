import { store } from "../app/store/store";
import axiosInstance from "./axiosInstances";

// const accessToken = store.getState()?.accessToken;
// console.log("atP", accessToken);
// const accessToken = JSON.parse(localStorage.getItem("accessToken") || "");
export const getAllCategoryInstance = async () => {
  try {
    const accessToken = store.getState()?.accessToken;
    const response = await axiosInstance({
      url: "/getAllCategory",
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log("eyyCategory", error);
  }
};
