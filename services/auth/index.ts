import instance from "@/lib/axios/instance";

const authServices = {
  registerAccount: (data: any) => instance.post('/api/user/register', data),
  loginAccount: (data: any) => instance.post('/api/user/login', data)
}

export default authServices