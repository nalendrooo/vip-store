import React from 'react'

interface IPropsTypes extends React.ComponentProps<'input'> {
  label?: string
  name: string
  type: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  defaultValue?: string
}
const Input = (props: IPropsTypes) => {

  const { label, type, name, placeholder, required, disabled, defaultValue, ...rest } = props
  return (
    <div>
      { label && <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label> }
      <input
        type={type}
        name={name}
        id={name}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
        {... rest}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-slate-200"
      />
    </div>
  )
}

export default Input