import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'


const DrawerItem = ({ to, icon,text }) => {
    const [active, setIsActive] = useState(false);
    return (
        <NavLink
            to={to} className='flex h-[40px] items-center px-6 cursor-pointer relative'
            style={function ({ isActive }) {
                setIsActive(isActive)
            }}
            end
        >
            <div className='w-50px'>
                {icon}
            </div>
            <p className='text-gray-100 text-lg'>{text}</p>
            {active && <div className='flex-1 h-full flex justify-end items-center'><div className=' w-[10px] h-[10px] rounded-full  bg-gray-300'/></div>}
        </NavLink>
    )
}

export default DrawerItem