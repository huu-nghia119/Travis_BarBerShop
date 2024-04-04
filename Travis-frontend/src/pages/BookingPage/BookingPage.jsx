import React, { useEffect, useState } from 'react'
import InputForm from '../../components/InputForm/InputForm'
import { WrapperHeaderText,WrapperClosed, WrapperLabel,WrapperInput } from '../BookingPage/style'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as BookingService from '../../services/BookingService'
import {CloseCircleOutlined} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
import * as message from '../../components/Message/Message'



const BookingPage = () => {
  const [bookingName,setBookingName]= useState('');
  const [bookingEmail, setBookingEmail]=useState('');
  const [bookingPhone,setBookingPhone]=useState('');

  const currentDate = new Date()
  const defaultDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate()}`;
  const [bookingDate,setBookingDate]=useState(defaultDate);
  const [bookingTime,setBookingTime]=useState('');
  const navigate = useNavigate()

  const mutation = useMutationHooks(
    data => BookingService.createBooking(data)
  )
  const {data ,isError,isSuccess} = mutation
  useEffect(() => {
      if(isSuccess) {
        message.success();
        navigate('/');
      }else if(isError){
        message.error()
      }
  },[isSuccess,isError])

  
  const handleOnchangeEmail = (value) => {
    setBookingEmail(value)
  }

  const handleOnchangeName = (value) => {
    setBookingName(value)
  }
  const handleOnchangePhone = (value) => {
    setBookingPhone(value)
  }
  const handleOnchangeDate = (value) => {
    setBookingDate(value)
  }
  const handleOnchangeTime = (value) => {
    setBookingTime(value)
  }
  const handleBooking = () => {
    console.log('name,email,phone, date, time', bookingName,bookingEmail,bookingPhone, bookingDate, bookingTime)
    mutation.mutate({ 
      bookingName,
      bookingEmail,
      bookingPhone,
      bookingDate,
      bookingTime
    })
  }
 

  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",background: 'rgba(0, 0, 0, 0.2)' ,width:"100%",marginTop:"1px", fontSize:"20px", height:"100%"}}>
        <div style={{width:"40%",backgroundColor:"#fff",borderRadius:"4px",border: "1px solid #fff",marginTop:"20px"}}>
        <WrapperClosed >
          <CloseCircleOutlined onClick={()=>{navigate("/")}}/>    
        </WrapperClosed>
        <WrapperHeaderText>Đặt lịch cắt tóc</WrapperHeaderText>
          <WrapperInput>
            <WrapperLabel>Họ và tên</WrapperLabel>
            <InputForm style={{margin:"2px 0 10px"}} placeholder="Nhập họ tên" value={bookingName} onChange={handleOnchangeName}/>
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel>Email của bạn</WrapperLabel>
            <InputForm style={{margin:"2px 0 10px"}}  placeholder="Nhập email" value={ bookingEmail} onChange={handleOnchangeEmail}/>
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel>Số điện thoại</WrapperLabel>
            <InputForm style={{margin:"2px 0 10px"}} placeholder="Nhập số điện thoại" value={bookingPhone} onChange={handleOnchangePhone}/>
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel>Chọn ngày</WrapperLabel>
            <InputForm  
              style={{margin:"2px 0 10px"}}
                onChange={handleOnchangeDate}
                type="date"
                value={bookingDate}
                />
          </WrapperInput>
          <WrapperInput>
            <WrapperLabel>chọn giờ</WrapperLabel>
            <InputForm style={{margin:"2px 0 10px"}} type="time" value={bookingTime} min="08:00" max="17:00" onChange={handleOnchangeTime}/>
          </WrapperInput>
        <ButtonComponent
              disabled={!bookingName.length || !bookingEmail.length || !bookingPhone.length|| !bookingDate.length || !bookingTime.length}
              onClick={handleBooking}
              size={40}
              styleButton={{
                background: 'rgb(255, 57, 69)',
                height: '48px',

                width: '100%',
                border: 'none',
                borderRadius: '4px',
                margin: '26px 0 10px'
              }}
              textbutton={'Đặt lịch'}
              styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
            ></ButtonComponent>
        </div>
    </div>
  )
}

export default BookingPage