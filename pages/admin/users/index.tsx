import UsersAdminView from '@/components/views/admin/Users'
import { retriveData } from '@/lib/firebase/service'
import UsersServices from '@/services/user'
import React, { useEffect, useState } from 'react'

const AdminUsersPage = () => {
  const [users, setUsers] = useState([])

  const getAllUsers = async () => {
    const users = await UsersServices.getAllUsers()
    setUsers(users.data.data)

  }

  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <UsersAdminView users={users}/>
  )
}

export default AdminUsersPage