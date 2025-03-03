import axios from "axios";

const apiInstance = axios.create({
  baseURL: "https://dev-api.aiscreen.io/api/v1/",
})

apiInstance.interceptors.request.use(
  config => {
    const token = localStorage.token
    if(token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
)

export default apiInstance