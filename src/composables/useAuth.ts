import { loginRequest, type LoginData } from "../api/auth"

const useAuth = () => {
  const login = async(data: LoginData) => {
    try {
      const response = await loginRequest(data)
      const {token} = response.data
      localStorage.token = token
    } catch (error) {
      alert(`Что-то пошло не так ${error}`)
    }
  }
  return {
    login
  }
}

export default useAuth