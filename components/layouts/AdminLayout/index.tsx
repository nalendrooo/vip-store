import Sidebar from '@/components/fragments/Sidebar'
import React from 'react'
import { AiFillDashboard  } from "react-icons/ai";
import { BsFillBagHeartFill } from "react-icons/bs";
import { IoPersonCircleSharp } from "react-icons/io5";

interface IPropTypes {
  children: React.ReactNode
}

const AdminLayout = (props: IPropTypes) => {
  const { children } = props

  const listSidebarItem = [
    {
      title: 'Dashboard',
      url: '/admin',
      icon: <AiFillDashboard size={25}/>
    },
    {
      title: 'Products',
      url: '/admin/products',
      icon: <BsFillBagHeartFill  size={25}/>
    },
    {
      title: 'Users',
      url: '/admin/users',
      icon: <IoPersonCircleSharp size={25}/>
    },
  ]
  return (
    <div className="flex">
      <Sidebar lists={listSidebarItem}/>
      { children }
    </div>
  )
}

export default AdminLayout