import React, { useEffect, useState } from 'react'
import AdminLayout from '@/components/layouts/AdminLayout'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import ModalUpdateUser from './Modal/ModalUpdateUser'
import UsersServices from '@/services/user'
import ModalDeleteUser from './Modal/ModalDeleteUser'

interface IPropsTypes {
  users: any
  // users: {
  //   email: string;
  //   fullname: string;
  //   phone?: string;
  //   role?: string;
  //   created_at?: Date;
  //   updated_at?: Date;
  // }
}
const UsersAdminView = (props: IPropsTypes) => {
  const { users } = props

  const [modal, setModal] = useState({
    open: false,
    type: ''
  })

  const [updatedUser, setUpdatedUser] = useState({})
  const [deletedUser, setDeletedUser] = useState({})
  const [usersData, setUsersData] = useState(users)

  useEffect(() => {
    setUsersData(users)
  }, [users])

  return (
    <AdminLayout>
      <div className="p-10  w-full">
        <h1 className="font-bold text-3xl mb-5">User Management</h1>


        <div className="relative overflow-x-auto rounded-2xl">

          <table className="w-full">
            <thead className="text-xl bg-slate-300 w-100">
              <tr className="text-left ">
                <th className="px-2 py-4">#</th>
                <th className="px-2 py-4">Fullname</th>
                <th className="px-2 py-4">Email</th>
                <th className="px-2 py-4">Phone</th>
                <th className="px-2 py-4">Role</th>
                <th className="px-2 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user: any, index: number) => (
                <tr key={index} className={`${index % 2 !== 0 && 'bg-slate-100'} `}>
                  <td className="px-2 py-2" >{index + 1}</td>
                  <td className="px-2 py-2">{user.fullname}</td>
                  <td className="px-2 py-2">{user.email}</td>
                  <td className="px-2 py-2">{user.phone}</td>
                  <td className="px-2 py-2">{user.role}</td>
                  <td className="px-2 py-2 flex gap-5">
                    <Button
                      type='button'
                      variant='primary'
                      onClick={() => {
                        setModal({ open: true, type: 'edit' })
                        setUpdatedUser(user)
                      }}
                    >
                      Update
                    </Button>
                    <Button
                    type='button'
                    variant='danger'
                    onClick={() => {
                      setModal({ open: true, type: 'delete' })
                      setUpdatedUser(user)
                    }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}


            </tbody>
          </table>
        </div>

        <ModalUpdateUser
          user={updatedUser}
          show={modal && modal.type == 'edit'}
          setUpdatedUser={setUpdatedUser}
          setUsersData={setUsersData}
          onClose={() => {
            setModal({ open: false, type: '' })
            setUpdatedUser({})
          }} />

        <ModalDeleteUser
          user={updatedUser}
          show={modal && modal.type == 'delete'}
          setDeletedUser={setDeletedUser}
          setUsersData={setUsersData}
          onClose={() => {
            setModal({ open: false, type: '' })
            setDeletedUser({})
          }} />

      </div>
    </AdminLayout>
  )
}

export default UsersAdminView