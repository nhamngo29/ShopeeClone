import { InputHTMLAttributes, useState } from 'react'
import { useController, UseControllerProps } from 'react-hook-form'

export interface InputNumberProps extends InputHTMLAttributes<HTMLElement> {
  classNameInput?: string
  classNameError?: string
}
function InputV2(props: UseControllerProps<any> & InputNumberProps) {
  const {
    type,
    onChange,
    className,
    classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
    classNameError = 'mt-1 text-red-600 min-h-[1.25rem]  text-sm',
    value = '',
    ...rest
  } = props
  const { field, fieldState } = useController(props)
  const [localValue, setLocalValue] = useState<string>(field.value)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueFormInput = event.target.value
    const numberCondition = type === 'number' && (/^\d+$/.test(valueFormInput) || valueFormInput === '')
    if (numberCondition || type !== 'number') {
      //cập nhật localvalue state
      setLocalValue(valueFormInput)
      field.onChange(event)
      onChange && onChange(event)
      //Thuc thi onChange callback từ bên ngoài truyền vào props
    }
  }
  return (
    <div className={className}>
      <input className={classNameInput} {...rest} {...field} onChange={handleChange} value={value || localValue} />
      <div className={classNameError}>{fieldState.error?.message}</div>
    </div>
  )
}
export default InputV2
