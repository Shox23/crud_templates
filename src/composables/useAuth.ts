import { loginRequest, type LoginData } from "../api/auth"

const useAuth = () => {
  const login = async(data: LoginData) => {
    const response = await loginRequest(data)
    const {token} = response.data
    localStorage.token = token
  }

  return {
    login
  }
}

export default useAuth