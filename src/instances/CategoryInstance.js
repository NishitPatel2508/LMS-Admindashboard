
import axiosInstance from "./axiosInstances";

// const accessToken = JSON.parse(localStorage.getItem("accessToken") || "");
export const getAllCategoryInstance = async () => {
  try {
    const response = await axiosInstance({
      url: "/getAllCategory",
      method: "GET",
    });
    return response.data.data;
  } catch (error) {
    console.log("eyyCategory", error);
  }
};
