import { range } from "lodash"
import { useState } from "react"
interface Props{
    onChange?: (Value:Date)=>void
    value?:Date
    errorMessage?:string
}
export default function DateSelect({value,onChange,errorMessage}:Props) {
    const [date,setDate]=useState({
        day:value?.getDay()||1,
        month:value?.getMonth()||0,
        year:value?.getFullYear()||1990,
    })
    const handleChange=(event:React.ChangeEvent<HTMLSelectElement>)=>{
        const {value,name}=event.target
        const newDate={
            ...date,
            [name]:value
        }
        setDate(newDate)
        onChange && onChange(new Date(newDate.year,newDate.month,newDate.day))
    }
  return (
    <div className='mt-2 flex flex-wrap flex-col sm:flex-row'>
            <div className='sm:w-[20%] truncate pt-3 sm:text-right'>Ngày sinh</div>
            <div className='flex justify-between sm:pl-5 sm:w-[50%]'>
              <select onChange={handleChange} name="day" className='h-10 w-[32%] rounded-sm border border-black/10 px-3 cursor-pointer hover:border-orange outline-none' value={value?.getDate() || date.day}>
                <option value='' disabled selected hidden className='text-black/10'>
                  Ngày
                </option>
                {
                    range(1,31).map(item=>(
                        <option value={item} key={item}>{item}</option>
                    ))
                }
              </select>
              <select name="month" className='h-10 w-[32%] rounded-sm border border-black/10 px-3 cursor-pointer hover:border-orange outline-none' value={value?.getMonth()||date.month}>
                <option value='' disabled selected hidden className='text-black/10'>
                  Tháng
                </option>
                {
                    range(0,12).map(item=>(
                        <option value={item} key={item}>Tháng {item+1}</option>
                    ))
                }
              </select>
              <select name="year" className='h-10 w-[32%] rounded-sm border border-black/10 px-3 cursor-pointer hover:border-orange outline-none' value={value?.getFullYear()||date.year}>
                <option value='' disabled selected hidden className='text-black/10'>
                  Năm
                </option>
                {
                    range((new Date().getFullYear())-100,(new Date().getFullYear())).map(item=>(
                        <option value={item} key={item}>{item}</option>
                    ))
                }
              </select>
                          
            <div className="mt-1 text-red-600 min-h-[1.25rem] text-sm">{errorMessage}</div>
            </div>

          </div>
  )
}
