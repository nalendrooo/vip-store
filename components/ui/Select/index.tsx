import React from 'react'

type Option = {
  label: string
  value: string
}

interface IPropsTypes  {
  label?: string
  name: string
  disabled?: boolean
  defaultValue?: string
  options: Option[]
}

const Select = (props: IPropsTypes) => {
  const { label, name, disabled, defaultValue, options, ...rest } = props

  return (
    <div>
      {label && <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>}
      <select
        name={name}
        id={name}
        defaultValue={defaultValue}
        disabled={disabled}
        {...rest}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 disabled:cursor-not-allowed disabled:bg-slate-200">
        { options.map((item, index) => (
          <option key={index} value={item.value}>{item.label}</option>
        ))}
      </select>
    </div>
  )
}

export default Select