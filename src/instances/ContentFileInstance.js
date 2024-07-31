import axiosInstance from "./axiosInstances";

// Get All
export const getAllContentFileInstance = async (search) => {
  try {
    const response = await axiosInstance({
      url: `/allFiles?keyword=${search}`,
      method: "GET",
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
    const response = await axiosInstance({
      url: `/singleFile/${id}`,
      method: "GET",
    });
    return response.data.data;
  } catch (error) {
    console.log("singleCFErr", error);
  }
};

// Create
export const createContentFileInstance = async (payload) => {
  try {
    try {
      const response = await axiosInstance({
        url: `/file/upload`,
        method: "POST",
        data: payload,
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
    const response = await axiosInstance({
      url: `/file/update/${id}`,
      method: "PATCH",
      data: payload,
    });
    return response.data;
  } catch (error) {
    console.log("updateCFErr", error);
  }
};

//Delete
export const deleteContentFileInstance = async (id) => {
  try {
    const response = await axiosInstance({
      url: `/file/delete/${id}`,
      method: "DELETE",
    });
    return response.data;
  } catch (error) {
    console.log("deleteCFErr", error);
  }
};
