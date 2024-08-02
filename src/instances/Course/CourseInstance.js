import { store } from "../../app/store/store";
import axiosInstance from "../axiosInstances";

// const accessToken = JSON.parse(localStorage.getItem("accessToken") || "");

//Get All
export const getAllCourseInstance = async (page, keyword) => {
  try {
    const accessToken = store.getState()?.accessToken;
    const response = await axiosInstance({
      url: `/getAllCourse?page=${page}&keyword=${keyword}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },

      // timeout: 20000,
    });
    // console.log(response.data.data);
    return response.data;
  } catch (error) {
    console.log("eeeyyyy", error);
    return error.response.data.message;
  }
};

// Get Single
export const handleSingleCourse = async (id) => {
  try {
    const accessToken = store.getState()?.accessToken;
    const response = await axiosInstance({
      url: `/course/${id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      // timeout: 20000,
    });
    // console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log("eeeyyyy", error);
  }
};

//Create

export const handleCreateCourse = async (data) => {
  try {
    try {
      const accessToken = store.getState()?.accessToken;
      const response = await axiosInstance({
        url: "/course/createCourse/",
        method: "POST",

        data: data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        // timeout: 20000,
      });
      // console.log(response.data.data);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  } catch (error) {
    console.log("eeeyyyy", error);
  }
};

// Update

export const handleUpdateCourse = async (data, id) => {
  try {
    const accessToken = store.getState()?.accessToken;
    const response = await axiosInstance({
      url: `/course/update/${id}`,
      method: "PATCH",
      data: data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      // timeout: 20000,
    });
    // console.log(response.data.data);
    return response.data;
  } catch (error) {
    console.log("eeeyyyy", error);
  }
};

//Delete
export const handleDeleteCourse = async (id) => {
  try {
    const accessToken = store.getState()?.accessToken;
    const response = await axiosInstance({
      url: `/course/delete/${id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },

      // timeout: 20000,
    });
    // console.log(response.data.data);
    return response.data;
  } catch (error) {
    console.log("eeeyyyy", error);
  }
};
