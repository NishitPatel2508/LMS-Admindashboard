import axiosInstance  from "./axiosInstances";
import axiosInstructorInstance from "./axiosInstructorInstance";


//Signup
export const signUpInstance = async (payload) =>{
    try {
        try {
            const response = await axiosInstructorInstance({
                    url:"/create",
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

//Login
export const instructorLoginInstance = async(payload) =>{
    
    try {
        try {
            
            const response = await axiosInstructorInstance({
                  url:"/login",
                  method:"POST",
                  data:payload
            })
            return response.data
        } catch (error) {
            return error.response
        }
    } catch (error) {
        console.log("Error during login: ",error);
        return error.response
    }
}

export const getInstructorInfoInstance = async() =>{
    try {
        const response =  await axiosInstance({
             url:"/instructor/get",
            method:"GET",
        })
        return response.data.data
    } catch (error) {
        console.log("Error during Single data: ",error);
    }
}
export const updateInstructorInfoInstance = async(payload,id) =>{
    try {
        const response =  await axiosInstance({
             url:`/instructor/update/${id}`,
            method:"PATCH",
            data:payload
        })
        return response.data.data
    } catch (error) {
        console.log("Error during Update Profile : ",error);
    }
}

