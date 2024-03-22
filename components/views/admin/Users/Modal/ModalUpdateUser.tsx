import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Modal from '@/components/ui/Modal'
import Select from '@/components/ui/Select'
import UsersServices from '@/services/user'
import React, { Dispatch, FormEvent, useState } from 'react'


interface IPropsTypes {
  show: boolean,
  onClose: () => void,
  user: any ,
  setUpdatedUser: Dispatch<any>
  setUsersData: Dispatch<any>
}
const ModalUpdateUser = ({ show, onClose, user, setUpdatedUser, setUsersData }: IPropsTypes) => {

  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const form: any = e.target as HTMLFormElement

    const data = {
      role: form.role && form.role.value
    }

    const result = await UsersServices.updateUser(user.id, data)

    if (result.status === 200) {
      setIsLoading(false)
      setUpdatedUser({})

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
        Update User
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <Input label="Email" type="text" name="email" disabled defaultValue={user.email} />
          <Input label="Fullname" type="text" name="fullname" disabled defaultValue={user.fullname} />
          <Input label="Phone Number" type="text" name="phone" disabled defaultValue={user.phone ?? '-'} />
          <Select label="Role" name="role" defaultValue={user.role} options={
            [
              { label: "Admin", value: "admin" },
              { label: "Member", value: "member" }
            ]
          } />
        </Modal.Body>
        <Modal.Footer>
          <div className="flex gap-4 w-full">
            <Button onClick={onClose} type='button' variant='gray'>Cancel</Button>
            <Button type='submit' variant='primary'>Submit</Button>
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default ModalUpdateUser