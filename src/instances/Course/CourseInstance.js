import { BLOB_READ_WRITE_TOKEN } from "../../basic";
import axiosInstance from "../axiosInstances";

// const accessToken = JSON.parse(localStorage.getItem("accessToken") || "");

//Get All
export const getAllCourseInstance = async (page) => {
  try {
    const response = await axiosInstance({
      url: `/getAllCourse?page=${page}`,
      method: "GET",

      // timeout: 20000,
    });
    // console.log(response.data.data);
    return response.data;
  } catch (error) {
    console.log("eeeyyyy", error);
  }
};

// Get Single
export const handleSingleCourse = async (id) => {
  try {
    const response = await axiosInstance({
      url: `/course/${id}`,
      method: "GET",

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
      const response = await axiosInstance({
        url: "/course/createCourse/",
        method: "POST",

        data: data,
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
    const response = await axiosInstance({
      url: `/course/update/${id}`,
      method: "PATCH",
      data: data,
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
    const response = await axiosInstance({
      url: `/course/delete/${id}`,
      method: "DELETE",

      // timeout: 20000,
    });
    // console.log(response.data.data);
    return response.data;
  } catch (error) {
    console.log("eeeyyyy", error);
  }
};
