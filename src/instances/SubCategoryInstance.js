import axiosInstance from "./axiosInstances";

// Get All
export const getAllSubCategoryInstance = async () => {
  try {
    const response = await axiosInstance({
      url: "/getAllSubCategory",
      method: "GET",
    });
    return response.data.data;
  } catch (error) {
    console.log("subCategoryErr", error);
  }
};

//Get Single
export const getSingleSubCategoryInstance = async (id) => {
  try {
    const response = await axiosInstance({
      url: `/subCategory/${id}`,
      method: "GET",
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
      const response = await axiosInstance({
        url: `/subCategory/create`,
        method: "POST",
        data: payload,
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
    const response = await axiosInstance({
      url: `/subCategory/update/${id}`,
      method: "PATCH",
      data: payload,
    });
    return response.data;
  } catch (error) {
    console.log("updatesubCategoryErr", error);
  }
};

//Delete
export const deleteSubCategoryInstance = async (id) => {
  try {
    const response = await axiosInstance({
      url: `/subCategory/delete/${id}`,
      method: "DELETE",
    });
    return response.data;
  } catch (error) {
    console.log("updatesubCategoryErr", error);
  }
};
