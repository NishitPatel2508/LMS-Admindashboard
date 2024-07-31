import axios from "axios"
import { baseURL,BLOB_READ_WRITE_TOKEN } from "../basic"


// localStorage.setItem("accessToken",JSON.stringify("ABC"))
// const accessToken = useaccessTokenes()
// debugger
const accessToken = JSON.parse(localStorage.getItem("accessToken") || null);
console.log(accessToken)
// if(!accessToken){
// window.location.href = "/login"
// }

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
    token:BLOB_READ_WRITE_TOKEN
  }})
  // Request interceptor
  axiosInstance.interceptors.request.use(
    config => {
      console.log("Request Interceptor", config)
      return config
    },
    error => {
      return Promise.reject(error)
    }
    )
    // Response interceptor
    axiosInstance.interceptors.response.use(
      response => {
        return response
      },
      error => {
        if (!accessToken) {
          console.log("Unauthorized access - 401")
          window.location.href = "/login"
          // Navigate("/login")
    }
    return Promise.reject(error)
  }
  )
  
  
  
  
  // export {}
  export default axiosInstance;
  
  
  // export default axiosInstances



