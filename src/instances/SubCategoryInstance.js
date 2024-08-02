import { store } from "../app/store/store";
import axiosInstance from "./axiosInstances";

// console.log("atP", accessToken);
// Get All
export const getAllSubCategoryInstance = async (keyword) => {
  try {
    const accessToken = store.getState()?.accessToken;
    const response = await axiosInstance({
      url: `/getAllSubCategory?keyword=${keyword}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("subCategoryErr", error);
    return error.response.data.message;
  }
};

//Get Single
export const getSingleSubCategoryInstance = async (id) => {
  try {
    const accessToken = store.getState()?.accessToken;
    const response = await axiosInstance({
      url: `/subCategory/${id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log("singlesubCategoryErr", error);
  }
};

// Create
export const createSubCategoryInstance = async (payload) => {
  try {
    try {
      const accessToken = store.getState()?.accessToken;
      const response = await axiosInstance({
        url: `/subCategory/create`,
        method: "POST",
        data: payload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  } catch (error) {
    console.log("createsubCategoryErr", error);
  }
};
//Update
export const getUpdateSubCategoryInstance = async (payload, id) => {
  try {
    const accessToken = store.getState()?.accessToken;
    const response = await axiosInstance({
      url: `/subCategory/update/${id}`,
      method: "PATCH",
      data: payload,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("updatesubCategoryErr", error);
  }
};

//Delete
export const deleteSubCategoryInstance = async (id) => {
  try {
    const accessToken = store.getState()?.accessToken;
    const response = await axiosInstance({
      url: `/subCategory/delete/${id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("updatesubCategoryErr", error);
  }
};
