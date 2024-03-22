import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import authServices from '@/services/auth'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FormEvent, useState } from 'react'

const RegisterView = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setErrror] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setErrror('')
        const form = e.target as HTMLFormElement
        const { fullname, phone, email, password } = form

        const data = {
            fullname: fullname.value,
            phone: phone.value,
            email: email.value,
            password: password.value
        }

        const result = await authServices.registerAccount(data)

        if (result.status === 200) {
            form.reset()
            router.push('/auth/login')
        } else {
            setErrror('Email sudah terdaftar')
        }

        setIsLoading(false)
    }
    return (
        <div className="flex bg-slate-200 flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen h-full lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                        Register
                    </h1>
                    { error && <p className="text-red-500 text-sm font-bold py-2 px-4 text-center w-full rounded-lg bg-red-100">{error && error}</p>}
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>

                        <Input label='Full Name' type='text' name='fullname' required placeholder='John Doe'/>
                        <Input label='Phone Number' type='text' name='phone' required placeholder='+628123456789'/>
                        <Input label='Email' type='email' name='email' required placeholder='example@example.com'/>
                        <Input label='Password' type='password' name='password' required placeholder='********'/>

                        <Button
                            variant='primary'
                            type='submit'
                            isDisabled={isLoading}
                        >
                            {isLoading ? 'Loading' : 'Sign up'}
                        </Button>

                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don’t have an account yet? <Link href="/auth/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                Sign in
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterView