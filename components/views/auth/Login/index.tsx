import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FormEvent, useState } from 'react'

const LoginView = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setErrror] = useState('')
    const router = useRouter()

    const callbackUrl: any = router.query.callbackUrl || '/'


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        setErrror('')
        const form = e.target as HTMLFormElement
        const { email, password } = form

        try {
            const res = await signIn('credentials', {
                redirect: false,
                email: email.value,
                password: password.value,
                callbackUrl
            })

            if (!res?.error) {
                form.reset()
                router.push(callbackUrl)
            } else {
                setErrror('Email atau Password salah')
            }

        } catch (error) {
            setErrror('Email atau Password salah')
        } finally {
            setIsLoading(false)
        }


    }
    return (
        <div className="bg-slate-200 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                        Login
                    </h1>
                    {error && <p className="text-red-500 text-sm font-bold py-2 px-4 text-center w-full rounded-lg bg-red-100">{error && error}</p>}
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>

                        <Input label='Email' type='email' name='email' required placeholder='example@example.com' />
                        <Input label='Password' type='password' name='password' required placeholder='********' />


                        <Button
                            variant='primary'
                            type='submit'
                            isDisabled={isLoading}
                        >
                            {isLoading ? 'Loading' : 'Sign in'}
                        </Button>
                        <Button
                            variant='gray'
                            type='button'
                            isDisabled={isLoading}
                            onClick={() => signIn('google', { callbackUrl, redirect: false })}
                        >
                            {isLoading ? 'Loading' : 'Login with Google'}
                        </Button>

                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don’t have an account yet? <Link href="/auth/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                Sign up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginView