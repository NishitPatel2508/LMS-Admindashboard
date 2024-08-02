import { store } from "../app/store/store";
import axiosInstance from "./axiosInstances";

// import axiosInstance from "./AxiosInstances";

export const getAllDataDBInstance = async () => {
  const accessToken = store.getState()?.accessToken;
  console.log("atP", accessToken);
  try {
    const response = await axiosInstance({
      url: "/dashboard",
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log("DB", error);
  }
};
// import axiosInstance from "./AxiosInstances";
export const getAllRevenueInstance = async () => {
  try {
    const accessToken = store.getState()?.accessToken;
    console.log("atP", accessToken);
    const response = await axiosInstance({
      url: "/getAllRevenue",
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log("getAllRevenue", error);
  }
};
