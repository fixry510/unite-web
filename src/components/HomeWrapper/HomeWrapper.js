import React from 'react'
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../Context/AuthProvider';
import Drawer from '../Drawer/Drawer';

const HomeWrapper = () => {
    const { onLogout } = useAuth();

    return (
        <div className='flex flex-col md:flex-row justify-start  w-full '>
            <Drawer />
            <div className='mt-[50px] lg:mt-0 w-full'>
                <Outlet />
            </div>
        </div>
    )
}

export default HomeWrapper