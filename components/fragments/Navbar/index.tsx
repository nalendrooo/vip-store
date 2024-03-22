import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'

const Navbar = () => {

  const session = useSession()

  return (
    <div className="flex justify-between bg-gray-200 px-20 py-5 items-center sticky top-0">
      <p>Navbar</p>
      <div>
        <button
          onClick={() => session?.status === 'unauthenticated' ? signIn() : signOut()}
          className="px-4 py-2 bg-blue-600 rounded-lg text-white font-semibold ">
          { session?.status === 'unauthenticated' ? 'Login' : 'Logout'}
        </button>
      </div>
    </div>
  )
}

export default Navbar