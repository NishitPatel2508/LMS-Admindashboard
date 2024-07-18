import axiosInstance from "./axiosInstances";

// import axiosInstance from "./AxiosInstances";
export const getAllDataDBInstance = async () =>{
    try {
        const response = await axiosInstance({
            url:"/dashboard",
            method:"GET"
        })
        return response.data.data
    } catch (error) {
        console.log("DB",error);
    }
}
// import axiosInstance from "./AxiosInstances";
export const getAllRevenueInstance = async () =>{
    try {
        const response = await axiosInstance({
            url:"/getAllRevenue",
            method:"GET"
        })
        return response.data.data
    } catch (error) {
        console.log("getAllRevenue",error);
    }
}