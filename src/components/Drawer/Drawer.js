import React from 'react'
import { useAuth } from '../../Context/AuthProvider';
import logo from "../../images/logo.png";
import { TbMessageReport } from "react-icons/tb";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdOutlineSocialDistance } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { NavLink } from 'react-router-dom';
import DrawerItem from './DrawerItem';



const Drawer = () => {

    const { currentUser, onLogout } = useAuth();


    return (
        <React.Fragment>
            <div className='hidden  lg:flex min-w-[330px]  bg-[#796fc1] h-screen  flex-col'>
                <div className='w-[150px] self-center h-[150px] mt-10 rounded-full bg-[#f2f7fb] flex justify-center items-center'>
                    <img src={logo} className='w-3/6 bounce animate-bounceCustom duration-1000' />
                </div>
                <p className='font-quickSans font-medium text-gray-100 self-center mt-5 mb-10 text-lg'>{currentUser.email}</p>
                <DrawerItem to={"/home"} text="รายงาน" icon={<TbMessageReport size={30} className='mr-7 text-gray-100 ' />} />
                <hr className='mx-5 my-2' />
                <DrawerItem to={"/home/member"} text="สมาชิก" icon={<BsFillPeopleFill size={25} className='mr-7 text-gray-100 ' />} />
                <hr className='mx-5 my-2' />
                <DrawerItem to={"/home/all-room"} text="ห้องทั้งหมด" icon={<MdOutlineSocialDistance size={30} className='mr-7 text-gray-100 ' />} />
                <div className='mx-5 my-10 flex flex-1 items-end'>
                    <div className='cursor-pointer flex w-full' onClick={onLogout}>
                        <div className='w-50px'>
                            <RiLogoutBoxLine size={25} className='mr-7 text-gray-100 ' />
                        </div>
                        <p className='text-gray-100 text-lg'>ออกจากระบบ</p>
                    </div>
                </div>
            </div>
            <div className='flex  lg:hidden bg-[#796fc1] h-[50px] w-full items-center pl-6 absolute left-0 top-0'>
                <div className='flex-1 items-start'>
                    <div className='w-[35px] h-[35px] mx-0 rounded-full bg-[#f2f7fb] flex justify-center items-center'>
                        <img src={logo} className='w-3/6' />
                    </div>
                </div>
                <NavLink to={"/home"} className=' font-sm  text-gray-100 mx-[2%] cursor-pointer'> <p >รายงาน</p></NavLink>
                <NavLink to={"/home/member"} className=' font-sm  text-gray-100 mx-[2%] cursor-pointer'><p >สมาชิก</p></NavLink>
                <NavLink to={"/home/all-room"} className=' font-sm  text-gray-100 mx-[2%] cursor-pointer'><p>ห้องทั้งหมด</p></NavLink>
                <div className='w-[50px] flex justify-center items-center ml-10 cursor-pointer' onClick={onLogout}>
                    <FiLogOut size={25} className='mr-7 text-gray-100 ' />
                </div>
            </div>
        </React.Fragment>
    )
}

export default Drawer