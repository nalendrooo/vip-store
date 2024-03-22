import React from 'react'

type ButtonVariant = 'primary' | 'gray' | 'danger';

interface IPropsTypes extends React.ComponentProps<'button'> {
  type: 'button' | 'submit' | 'reset' | undefined
  onClick?: () => void
  isLoading?: boolean
  isDisabled?: boolean
  children: React.ReactNode
  variant: ButtonVariant
  className?: string
}
const Button: React.FC<IPropsTypes> = (props) => {

  const { type, isLoading, isDisabled, children, variant, onClick, className, ...rest } = props

  const variantButton = {
    primary: 'text-white bg-blue-600 hover:bg-blue-700',
    danger: 'text-white bg-red-600 hover:bg-red-700',
    gray: 'text-gray-900 bg-gray-400 hover:bg-gray-500 hover:text-white easy-out duration-300'
  }

  const variantClass = variantButton[variant as ButtonVariant] || ''

  return (
    <button
      disabled={isLoading || isDisabled}
      type={type}
      onClick={onClick}
      {...rest}
      className={`w-full ${variantClass} ${className} focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}>
      {children}
    </button>
  )
}

export default Button