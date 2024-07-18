import axiosInstance  from "./axiosInstances";

export const getAllLanguagesInstance = async () => {
  try {
    const response = await axiosInstance({
      url: "/getAllLanguages",
      method: "GET",
    });
    return response.data.data;
  } catch (error) {
    console.log("language", error);
  }
};
