import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Fragment, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import userApi from 'src/apis/user.api'
import Button from 'src/components/Button'
import DateSelect from 'src/components/DateSelect'
import Input from 'src/components/Input'
import InputNumber from 'src/components/InputNumber'
import Toast from 'src/components/Toast'
import { toast as ToastError } from 'react-toastify' 
import { AppContext } from 'src/contexts/app.context'
import { User } from 'src/types/user.type'
import { ResponseApi } from 'src/types/utils.type'
import { setProfileToLS } from 'src/utils/auth'
import { UserChema, userSchema } from 'src/utils/rules'
import { getAvatarUrl, isAxiosUnprocessableEntityError } from 'src/utils/utils'
import config from 'src/constants/config'
type FromDataInput=Pick<UserChema,'fullName'|'phoneNumber'|'address'|'dateOfBirth'|'avatar'|'email'>
type FromDataError=Omit<FromDataInput,'dateOfBirth'>&{
  dateOfBirth?:string
}
const profileSchema=userSchema.pick(['fullName','phoneNumber','address','dateOfBirth','avatar','email'])//này dùng cho yun resover

export default function Profile() {
  const fileInputRef=useRef<HTMLInputElement>(null)
  const {setProfile}=useContext(AppContext)
  const [file,setFile]=useState<File>()
  const  previewImage=useMemo(()=>{
    return file?URL.createObjectURL(file):''
  },[file])
  const {register,control,formState:{errors},handleSubmit,setValue,setError}=useForm<FromDataInput>({
    defaultValues:{
      fullName:'',
      phoneNumber:'',
      address:'',
      avatar:'',
      dateOfBirth:new Date(1990,0,1),
      email:''
    },resolver:yupResolver(profileSchema)
  })
  const [showToast, setShowToast] = useState(false) // Trạng thái hiển thị Toast
  const {data:profileData}=useQuery({
    queryKey:['profile'],
    queryFn:userApi.getProfile
  })
  const profile=profileData?.data.response
  const updateProfileMutation = useMutation({
    mutationFn: (body: FormData) => userApi.updateProfile(body),
    onSuccess: () => {
      setShowToast(false) // Đặt thành `false` trước để reset Toast
      setTimeout(() => setShowToast(true), 0) // Đặt lại `true` sau để hiển thị Toast

    },
    onError: (error) => {
      if (isAxiosUnprocessableEntityError<ResponseApi<FromDataError>>(error)) {
        const formError = error.response?.data.response 
        if (formError) {
          Object.keys(formError).forEach((key) => {
            const lowerCaseKey = key.charAt(0).toLowerCase() + key.slice(1); // Chuyển đổi key về chữ thường
            console.log('lowerCaseKey',lowerCaseKey)
            if(lowerCaseKey==='profilePricture')
              {
                ToastError.error('Kích thước file phải nhỏ hơn 500kb vui lòng thử lại')
              }
              setError(lowerCaseKey as keyof FromDataError, {
                message: formError[key as keyof FromDataError] as string,
                type: 'Server'
              })
          })
        }
      }
    },
    
  });
  useEffect(()=>{
    if(profile){

      setValue('fullName', profile.fullName || '');
      setValue('address', profile.address || '');
      setValue('avatar', profile.avatar || '');
      setValue('email', profile.email || '');
      setValue('phoneNumber', profile.phoneNumber || '');
      setValue(
        'dateOfBirth',
        profile.birthOfDay ? new Date(profile.birthOfDay) : new Date(1990, 0, 1)
      );
    }
  },[profile])
  const onSubmit = handleSubmit( async(data)=>{
    const formData = new FormData();
    formData.append('FullName', data.fullName || '');
    formData.append('Address', data.address || '');
    formData.append('PhoneNumber', data.phoneNumber || '');
    if(data.dateOfBirth)
    {
      formData.append('DateOfBirth', data.dateOfBirth?.toISOString());
    }
    if(file)
    {
      formData.append('ProfilePricture', file);
    }
    const res= await updateProfileMutation.mutateAsync(formData)
    setProfile(res.data.response as User)
    setProfileToLS(res.data.response as User)
  }
  )
  const handleUpload=()=>{
    fileInputRef.current?.click()
  }
  const onFileChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
    const fileFormLocal=event.target.files?.[0]
    if(fileFormLocal&&(fileFormLocal?.size>=config.maxSizeUploadAvatar|| fileFormLocal.type.includes('image'))){
      ToastError.error('File không đúng hình ảnh và vượt quá kích thước vui lòng thử lại')
      return;
    }
    setFile(fileFormLocal)
  }
  return (
    <Fragment>
      {showToast && <Toast message='Cập nhật hồ sơ thành công' />}
      <div className='rounded-sm bg-white px pb-10 md:px-7 md:pb-20 shadow'>
      
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ sở của tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sở để bảo mật tài khoản</div>
      </div>
      <form className='mt-8 flex flex-col-reverse md:flex-row md:items-start' onSubmit={onSubmit}>
        <div className='mt-6 flex-grow pr-5 md:pr-12 md:mt-0'>
          <div className='flex flex-wrap flex-col sm:flex-row'>
            <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Email</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <div className='pt-3 text-gray-700'>{profile?.email}</div>
            </div>
          </div>
          <div className='mt-6 flex flex-wrap flex-col sm:flex-row'>
            <div className='sm:w-[20%] truncate pt-3 sm:text-right'>Họ và tên</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input classNameInput='px-1 py-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
              register={register} name='fullName' placeholder='Họ và tên' errorMessage={errors.fullName?.message}></Input>
            </div>
          </div>
          <div className='mt-2 flex flex-wrap flex-col sm:flex-row'>
            <div className='sm:w-[20%] truncate pt-3 sm:text-right'>Số điện thoại</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Controller
              control={control}
              name='phoneNumber'
              render={({field})=>(<InputNumber classNameInput='px-1 py-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm' placeholder='03593xxxxxx' errorMessage={errors.phoneNumber?.message} {...field} onChange={field.onChange}></InputNumber>)}
              />
            </div>
          </div>
          <div className='mt-2 flex flex-wrap flex-col sm:flex-row'>
            <div className='sm:w-[20%] truncate pt-3 sm:text-right'>Địa chỉ</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input classNameInput='px-1 py-2 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm' register={register} name='address' placeholder='20 Cộng hòa garden' errorMessage={errors.address?.message}></Input>
            </div>
          </div>
          <Controller
          control={control}
          name='dateOfBirth'
          render={({field})=>(
            <DateSelect errorMessage={errors.dateOfBirth?.message} onChange={field.onChange} value={field.value}/>
  )}/>
          <div className='mt-2 flex flex-wrap flex-col sm:flex-row'>
          <div className='sm:w-[20%] truncate pt-3 sm:text-right'/>
          <div className='sm:w-[80%] sm:pl-5'>
            <Button className='flex items-center h-9 bg-orange px-5 text-white text-center text-sm hover:bg-orange/80 rounded-sm' >
              Lưu
            </Button>
          </div>
          </div>
        </div>
        <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <div className='my-5 h-24 w-24'>
              <img
                src={previewImage||getAvatarUrl(profile?.avatar)}
                alt='avatar'
                className='w-full h-full rounded-full object-cover'
              />
            </div>
            <input type='file' className='hidden' accept='.jpg,.jpeg,.png' name='avatar' ref={fileInputRef}  onClick={(e)=>{(e.target as any).value=null}} onChange={onFileChange}/>
            <button className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm' type='button' onClick={handleUpload}>
              Chọn ảnh
            </button>
            <div className='mt-3 text-gray-400'>
              <div>Dung lương file tối đa 1 MB</div>
              <div>Định dạng: ,JPG, .JPEG, .PNG</div>
            </div>
          </div>
        </div>
      </form>
    </div>
    </Fragment>
  )
}
