import { store } from "../app/store/store";
import axiosInstance from "./axiosInstances";
// Get All

// const accessToken = store.getState()?.accessToken;
// console.log("atP", accessToken);
export const getAllContentVideoInstance = async (search) => {
  try {
    const accessToken = store.getState()?.accessToken;
    const response = await axiosInstance({
      url: `/getAllContentVideo?keyword=${search}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("CV", error.response.data.message);
    return error.response.data.message;
  }
};

//Get Single
export const getSingleContentVideoInstance = async (id) => {
  try {
    const accessToken = store.getState()?.accessToken;
    const response = await axiosInstance({
      url: `/contentvideo/${id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log("singleContentVideoErr", error);
  }
};

// Create
export const createContentVideoInstance = async (payload) => {
  try {
    try {
      const accessToken = store.getState()?.accessToken;
      const response = await axiosInstance({
        url: `/contentvideo/create`,
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
    console.log("createContentVideoErr", error);
  }
};
//Update
export const getUpdateContentVideoInstance = async (payload, id) => {
  try {
    const accessToken = store.getState()?.accessToken;
    const response = await axiosInstance({
      url: `/contentvideo/update/${id}`,
      method: "PATCH",
      data: payload,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("updateContentVideoErr", error);
  }
};

//Delete
export const deleteContentVideoInstance = async (id) => {
  try {
    const accessToken = store.getState()?.accessToken;
    const response = await axiosInstance({
      url: `/contentvideo/delete/${id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("deleteContentVideoErr", error);
  }
};
