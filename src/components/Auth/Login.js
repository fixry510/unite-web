import React, { useState } from 'react'
import logo from "../../images/logo.png";
import { MdPassword, MdEmail } from 'react-icons/md'
import { useAuth } from '../../Context/AuthProvider';

import { useDispatch } from 'react-redux'
import { showLoad,closeLoad } from '../../store/loadSlice';

const Login = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const { onLogin } = useAuth();


    return (
        <div className='w-full h-screen bg-[#796fc1] pt-16 flex flex-col items-center'>
            <div className='w-[150px] h-[150px] rounded-full bg-[#f2f7fb] flex justify-center items-center'>
                <img src={logo} className='w-3/6 bounce animate-bounceCustom duration-1000' />
            </div>
            <p className='font-quickSans text-[25px] font-medium text-white mt-5'>Classroom unite</p>
            <div className="animate-transition-bottom  rounded-lg shadow-xl w-[80%] sm:w-[420px] h-[300px] bg-gray-50 mt-10 flex flex-col p-5 items-center">
                <p className='font-quickSans text-[25px] font-medium'>Login</p>
                <div className='relative w-[85%] mt-[25px]'>
                    <input value={email} onChange={(event) => setEmail(event.target.value)} type='text' placeholder='Email' className='
                    outline-none  border-b-2 bg-transparent  w-full pl-12  h-[35px]
                      border-b-[#CCCCCC]  focus:border-[#796fc1] border-solid pb-1
                    ' />
                    <MdEmail size={20} className='text-gray-400 absolute top-[35%] translate-y-[-50%] left-[10px]' />
                </div>
                <div className='relative w-[85%] mt-[20px]'>
                    <input value={password} onChange={(event) => setPassword(event.target.value)} type='password' placeholder='Password' className='
                    outline-none  border-b-2 bg-transparent  w-full pl-12  h-[35px]
                      border-b-[#CCCCCC]  focus:border-[#796fc1] border-solid pb-1
                    ' />
                    <MdPassword size={20} className='text-gray-400 focus:text-[#796fc1]  absolute top-[35%] translate-y-[-50%] left-[12px]' />
                </div>
                <div className='flex flex-col w-full items-center justify-center flex-1'>
                    <button onClick={() => onLogin(email,password)} className="w-[85%] py-[5px] rounded-full mt-[20px]
                      font-medium text-[#796fc1] border-[2px]  bg-transparent border-[#796fc1] hover:bg-[#796fc1] hover:text-white
                     ">
                        Login
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login