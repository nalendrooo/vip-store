import instance from "@/lib/axios/instance";

const UsersServices = {
  getAllUsers: () => instance.get('/api/user'),
  updateUser: (id: string, data: any) => instance.put(`/api/user`, { id, data }),
  deleteUser: (id: string) => instance.delete(`/api/user/${id}`),
}

export default UsersServices