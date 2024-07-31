import axiosInstance from "./axiosInstances";

// Get All
export const getAllContentInstance = async (search) => {
  try {
    const response = await axiosInstance({
      url: `/getAllContent?keyword=${search}`,
      method: "GET",
    });
    return response.data;
  } catch (error) {
    console.log("ContentErr", error.response.data.message);
    return error.response.data.message;
  }
};

//Get Single
export const getSingleContentInstance = async (id) => {
  try {
    const response = await axiosInstance({
      url: `/content/${id}`,
      method: "GET",
    });
    return response.data.data;
  } catch (error) {
    console.log("singleContentErr", error);
  }
};

// Create
export const createContentInstance = async (payload) => {
  try {
    try {
      const response = await axiosInstance({
        url: `/content/create`,
        method: "POST",
        data: payload,
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  } catch (error) {
    console.log("createContentErr", error);
  }
};
//Update
export const getUpdateContentInstance = async (payload, id) => {
  try {
    const response = await axiosInstance({
      url: `/content/update/${id}`,
      method: "PATCH",
      data: payload,
    });
    return response.data;
  } catch (error) {
    console.log("updateContentErr", error);
  }
};

//Delete
export const deleteContentInstance = async (id) => {
  try {
    const response = await axiosInstance({
      url: `/content/delete/${id}`,
      method: "DELETE",
    });
    return response.data;
  } catch (error) {
    console.log("deleteContentErr", error);
  }
};
