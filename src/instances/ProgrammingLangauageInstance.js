import axiosInstance from "./axiosInstances";

// Get All
export const getAllProgrammingLanguageInstance = async (search) => {
  try {
    const response = await axiosInstance({
      url: `/getAllProgrammingLanguage?keyword=${search}`,
      method: "GET",
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
    const response = await axiosInstance({
      url: `/programmingLanguage/${id}`,
      method: "GET",
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
      const response = await axiosInstance({
        url: `/programmingLanguage/create`,
        method: "POST",
        data: payload,
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
    const response = await axiosInstance({
      url: `/programmingLanguage/update/${id}`,
      method: "PATCH",
      data: payload,
    });
    return response.data.data;
  } catch (error) {
    console.log("pl", error);
  }
};

//Delete
export const deleteProgrammingLanguageInstance = async (id) => {
  try {
    const response = await axiosInstance({
      url: `/programmingLanguage/delete/${id}`,
      method: "DELETE",
    });
    return response.data.data;
  } catch (error) {
    console.log("pl", error);
  }
};
