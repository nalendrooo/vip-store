import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Modal from '@/components/ui/Modal'
import Select from '@/components/ui/Select'
import UsersServices from '@/services/user'
import React, { Dispatch, FormEvent, useState } from 'react'


interface IPropsTypes {
  show: boolean,
  onClose: () => void,
  user: any,
  setDeletedUser: Dispatch<any>
  setUsersData: Dispatch<any>
}
const ModalDeleteUser = ({ show, onClose, user, setDeletedUser, setUsersData }: IPropsTypes) => {

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    setIsLoading(true)

    const result = await UsersServices.deleteUser(user.id)

    if (result.status === 200) {
      setIsLoading(false)
      setDeletedUser({})

      const { data } = await UsersServices.getAllUsers()
      setUsersData(data.data)
      onClose()
    } else {
      setIsLoading(false)
    }
  }
  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Header withCloseButton onClose={onClose}>
        Delete User
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <p>Are you sure you want to delete user <span className='font-bold'>{user.fullname}</span>?</p>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex gap-4 w-full">
            <Button onClick={onClose} type='button' variant='gray'>Cancel</Button>
            <Button type='submit' variant='danger' onClick={handleSubmit}>Delete</Button>
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  )
}


export default ModalDeleteUser