import axiosInstance from "./axiosInstances";

//Get All
export const getAllChapterInstance = async (search) => {
  try {
    const response = await axiosInstance({
      url: `/getAllChapter?keyword=${search}`,
      method: "GET",
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
    const response = await axiosInstance({
      url: `/chapter/${id}`,
      method: "GET",
    });
    return response.data.data;
  } catch (error) {
    console.log("chapter", error);
  }
};
//Update
export const updateChapterInstance = async (payload, id) => {
  try {
    const response = await axiosInstance({
      url: `/chapter/update/${id}`,
      method: "PATCH",
      data: payload,
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
      const response = await axiosInstance({
        url: `/chapter/create`,
        method: "POST",
        data: payload,
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
    const response = await axiosInstance({
      url: `/chapter/delete/${id}`,
      method: "DELETE",
    });
    return response.data;
  } catch (error) {
    console.log("chapter", error);
  }
};
