import { useRef } from "react";
import { Fragment } from "react/jsx-runtime";
import { toast as ToastError } from 'react-toastify' 
import config from 'src/constants/config'
interface Props{
    onChange?:(file?:File)=>void
}
export default function InputFile({onChange}:Props) {
    const fileInputRef=useRef<HTMLInputElement>(null)
    const handleUpload=()=>{
        fileInputRef.current?.click()
      }
      const onFileChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const fileFormLocal=event.target.files?.[0]
        if(fileFormLocal&&(fileFormLocal?.size>=config.maxSizeUploadAvatar|| !fileFormLocal.type.includes('image'))){
          ToastError.error('File không đúng hình ảnh và vượt quá kích thước vui lòng thử lại')
          return;
        }
        onChange&&onChange(fileFormLocal)
      }
  return (
    <Fragment>
         <input type='file' className='hidden' accept='.jpg,.jpeg,.png' name='avatar' ref={fileInputRef}  onClick={(e)=>{(e.target as any).value=null}} onChange={onFileChange}/>
            <button className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm' type='button' onClick={handleUpload}>
              Chọn ảnh
            </button>
    </Fragment>
  )
}
