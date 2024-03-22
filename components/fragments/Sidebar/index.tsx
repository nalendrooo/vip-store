import Button from '@/components/ui/Button'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

interface IPropTypes {
  lists: Array<{
    title: string,
    url: string,
    icon: React.ReactNode
  }>
}
const Sidebar = (props: IPropTypes) => {
  const { lists } = props

  const router = useRouter()
  return (
    <div className="w-[280px] min-h-screen bg-black text-white p-4">
      <h1 className="font-bold text-4xl mb-10">Admin Panel</h1>
      <div className="h-[90%]  justify-between flex flex-col">
        <div className="flex flex-col gap-4">
          {lists.map((item, index) => (
            <div key={index} className={`hover:bg-white hover:text-black px-4 rounded-lg transition-all delay-50 py-2 ${router.pathname === item.url && 'bg-white text-black' }`}>
              <Link className="flex items-center gap-4" href={item.url}>{item.icon}{item.title}</Link>
            </div>
          ))}
        </div>

        <div>
          <Button
          onClick={() => signOut()}
          variant="gray"
          type="button"
          >Logout</Button>

        </div>
      </div>
    </div>
  )
}

export default Sidebar