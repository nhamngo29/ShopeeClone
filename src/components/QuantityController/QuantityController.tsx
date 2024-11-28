import { useState } from 'react'
import InputNumber, { InputNumberProps } from '../InputNumber'
interface Props extends InputNumberProps {
  max?: number
  defaultValue?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onType?: (value: number) => void
  classNameWrapper?: string
  onFocusOut?: (value: number) => void
}
export default function QuantityController({
  max,
  onIncrease,
  onDecrease,
  defaultValue = 1,
  classNameWrapper = 'ml-10',
  value,
  onFocusOut,
  min,
  onType,
  ...res
}: Props) {
  const [localValue, setLocalValue] = useState<number>(Number(value) || 1)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let _value = Number(event.target.value)
    if (max !== undefined && _value > max) {
      _value = max
    } else if (_value < 1) {
      _value = 1
    }
    onType && onType(_value)
    setLocalValue(_value)
  }
  const increase = () => {
    let _value = Number(value || localValue) + 1
    if (max !== undefined && _value > max) _value = max
    onIncrease && onIncrease(_value)
    setLocalValue(_value)
  }
  const decrease = () => {
    let _value = Number(value || localValue) - 1
    console.log('_value', _value)
    if (_value < Number(min) || 0) _value = 1
    onDecrease && onDecrease(_value)
    setLocalValue(_value)
  }
  const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    onFocusOut && onFocusOut(Number(event.target.value))
  }
  return (
    <div className={classNameWrapper + ' flex items-center'}>
      <button
        className='w-8 h-8 flex items-center justify-center rounded-l-sm border border-gray-300'
        onClick={decrease}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-3'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M5 12h14' />
        </svg>
      </button>
      <InputNumber
        defaultValue={defaultValue}
        classNameError='hidden'
        min={1}
        onChange={handleChange}
        value={value || localValue}
        {...res}
        classNameInput='w-14 h-8 border-t border-b border-gray-300 p-1 text-center outline-none'
        onBlur={handleBlur}
      />
      <button
        className='w-8 h-8 flex items-center justify-center rounded-r-sm border border-gray-300'
        onClick={increase}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-3'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
        </svg>
      </button>
    </div>
  )
}
