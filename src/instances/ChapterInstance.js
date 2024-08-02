import { store } from "../app/store/store";
import axiosInstance from "./axiosInstances";

//Get All

export const getAllChapterInstance = async (search) => {
  try {
    const accessToken = store.getState()?.accessToken;
    console.log("atP", accessToken);
    const response = await axiosInstance({
      url: `/getAllChapter?keyword=${search}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log("ChapterErr", error.response.data.message);
    return error.response.data.message;
  }
};

//Get Single
export const getSingleChapterInstance = async (id) => {
  try {
    const accessToken = store.getState()?.accessToken;
    console.log("atP", accessToken);
    const response = await axiosInstance({
      url: `/chapter/${id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log("chapter", error);
  }
};
//Update
export const updateChapterInstance = async (payload, id) => {
  try {
    const accessToken = store.getState()?.accessToken;
    console.log("atP", accessToken);
    const response = await axiosInstance({
      url: `/chapter/update/${id}`,
      method: "PATCH",
      data: payload,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("chapter", error);
  }
};
//Create
export const createChapterInstance = async (payload) => {
  try {
    try {
      const accessToken = store.getState()?.accessToken;
      console.log("atP", accessToken);
      const response = await axiosInstance({
        url: `/chapter/create`,
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
    console.log("chapter", error);
  }
};
//Delete
export const deleteChapterInstance = async (id) => {
  try {
    const accessToken = store.getState()?.accessToken;
    console.log("atP", accessToken);
    const response = await axiosInstance({
      url: `/chapter/delete/${id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("chapter", error);
  }
};
