import axios from "axios";
import { baseURL } from "../basic";

const axiosInstructorInstance = axios.create({
    baseURL:`${baseURL}/instructor`,
})

 // Request interceptor
  axiosInstructorInstance.interceptors.request.use(
    config => {
      console.log("Request Interceptor", config)
    return config
  },
  error => {
    return Promise.reject(error)
  }
  )
// Response interceptor
axiosInstructorInstance.interceptors.response.use(
  response => {
    return response
  },
  error => {
      console.log("Unauthorized access - 401")
      // window.location.href = "/login"
      // Navigate("/login")
    return Promise.reject(error)
  }
  )

  export default axiosInstructorInstance