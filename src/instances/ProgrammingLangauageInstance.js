import { store } from "../app/store/store";
import axiosInstance from "./axiosInstances";

// console.log("atP", accessToken);
// Get All
export const getAllProgrammingLanguageInstance = async (search) => {
  try {
    const accessToken = store.getState()?.accessToken;
    const response = await axiosInstance({
      url: `/getAllProgrammingLanguage?keyword=${search}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("pl", error.response.data.message);
    return error.response.data.message;
  }
};

// Get Single
export const getSingleProgrammingLanguageInstance = async (id) => {
  try {
    const accessToken = store.getState()?.accessToken;
    const response = await axiosInstance({
      url: `/programmingLanguage/${id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log("pl", error);
  }
};
//Create
export const createProgrammingLanguageInstance = async (payload) => {
  try {
    try {
      const accessToken = store.getState()?.accessToken;
      const response = await axiosInstance({
        url: `/programmingLanguage/create`,
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
    console.log("pl", error);
  }
};
//Update
export const updateProgrammingLanguageInstance = async (payload, id) => {
  try {
    const accessToken = store.getState()?.accessToken;
    const response = await axiosInstance({
      url: `/programmingLanguage/update/${id}`,
      method: "PATCH",
      data: payload,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log("pl", error);
  }
};

//Delete
export const deleteProgrammingLanguageInstance = async (id) => {
  try {
    const accessToken = store.getState()?.accessToken;
    const response = await axiosInstance({
      url: `/programmingLanguage/delete/${id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log("pl", error);
  }
};
