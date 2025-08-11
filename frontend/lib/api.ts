import API from "../config/apiClient"
export interface LoginPayload {
  email: string;
  password: string;
}
export interface SignupPayload extends LoginPayload {
  firstName: string;
  lastName: string;
  confirmPassword: string;
}
export interface verificationCode  {
  code:string
}
export const login = async (data: LoginPayload)=>
    API.post("/auth/login",data)
export const signup = async (data: SignupPayload)=>
    API.post("/auth/register",data)

export const verifyEmail = async (data: verificationCode)=>
  API.get(`/auth/email/verify/${data.code}`)

export const forgotPassword = async (email:string)=>
  API.post("/auth/password/forgot",{email})

export const resetPassword = async ({ 
  password, 
  verificationCode 
}: { 
  password: string; 
  verificationCode: string 
}) =>
  API.post("/auth/password/reset", { password, verificationCode })

export const getUser = async () =>
  API.get("/user")

export const logout = async () =>
  API.get("/auth/logout")