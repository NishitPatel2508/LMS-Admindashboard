import axiosInstance  from "./axiosInstance";

export const signUpInstance = async (payload) =>{
    try {
        try {
            
                const response = await axiosInstance({
                    url:"/instructor/create",
                    method:"POST",
                    data:payload
                })
            return response.data.data;
        } 
        catch (error) {
            return error.response;
        }

    } catch (error) {
        console.log("Error during signup: ",error);
    }
}