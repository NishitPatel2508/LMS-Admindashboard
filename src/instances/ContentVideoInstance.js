import axiosInstance from "./axiosInstances";
// Get All

export const getAllContentVideoInstance = async (search) => {
  try {
    const response = await axiosInstance({
      url: `/getAllContentVideo?keyword=${search}`,
      method: "GET",
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
    const response = await axiosInstance({
      url: `/contentvideo/${id}`,
      method: "GET",
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
      const response = await axiosInstance({
        url: `/contentvideo/create`,
        method: "POST",
        data: payload,
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
    const response = await axiosInstance({
      url: `/contentvideo/update/${id}`,
      method: "PATCH",
      data: payload,
    });
    return response.data;
  } catch (error) {
    console.log("updateContentVideoErr", error);
  }
};

//Delete
export const deleteContentVideoInstance = async (id) => {
  try {
    const response = await axiosInstance({
      url: `/contentvideo/delete/${id}`,
      method: "DELETE",
    });
    return response.data;
  } catch (error) {
    console.log("deleteContentVideoErr", error);
  }
};
