import { store } from "../app/store/store";
import axiosInstance from "./axiosInstances";

// Get All
export const getAllContentFileInstance = async (search) => {
  try {
    const accessToken = store.getState()?.accessToken;
    console.log("atP", accessToken);
    const response = await axiosInstance({
      url: `/allFiles?keyword=${search}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("cfErr", error);
    return error.response.data.message;
  }
};

//Get Single
export const getSingleContentFileInstance = async (id) => {
  try {
    const accessToken = store.getState()?.accessToken;
    console.log("atP", accessToken);
    const response = await axiosInstance({
      url: `/singleFile/${id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log("singleCFErr", error);
  }
};

// Create
export const createContentFileInstance = async (payload) => {
  try {
    const accessToken = store.getState()?.accessToken;
    console.log("atP", accessToken);
    try {
      const response = await axiosInstance({
        url: `/file/upload`,
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
    console.log("createCFErr", error);
  }
};
//Update
export const updateContentFileInstance = async (payload, id) => {
  try {
    const accessToken = store.getState()?.accessToken;
    // console.log("atP", accessToken);
    const response = await axiosInstance({
      url: `/file/update/${id}`,
      method: "PATCH",
      data: payload,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("updateCFErr", error);
  }
};

//Delete
export const deleteContentFileInstance = async (id) => {
  try {
    const accessToken = store.getState()?.accessToken;
    const response = await axiosInstance({
      url: `/file/delete/${id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("deleteCFErr", error);
  }
};
