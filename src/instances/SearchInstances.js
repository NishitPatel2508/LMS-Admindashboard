import axiosInstance from "./axiosInstances"

export const searchDBInstance = async(keyword) =>{
    try {
        const response = await axiosInstance({
            url:`/search?keyword=${keyword}`,
            method:'GET'
        })
         return response.data;
    } catch (error) {
        console.log("Search",error);
    }
}