import axios from 'axios';
import React, { useEffect, useState } from 'react'
import apiUrl from '../../config/api-url';
import { useDispatch } from 'react-redux'
import { showLoad, closeLoad } from '../../store/loadSlice';
import showToast from '../../util/showToast';
import { LoadSelft } from '../../util/CustomLoad';


const Member = () => {

    const [users, setAllUsers] = useState([]);

    const [isLoad, setIsLoad] = useState(true)


    const fetchUsers = async () => {
        try {
            const res = await axios.get(apiUrl + "/users");
            const usr = res.data.map(user => {
                user.birthday = new Date(user.birthday).toLocaleString().split(",")[0];
                return user;
            })
            setAllUsers(usr);
        } catch (e) {
            showToast({
                text: e.message || 'เกิดข้อผิดพลาด',
                type: "failed"
            });
        } finally {
            setTimeout(() => {
                setIsLoad(false);
            }, 500)
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className='flex w-full  items-center p-14 flex-col h-screen relative'>
            <div className='w-full h-14  text-md flex justify-start items-center pl-5 bg-gray-50 border-[2px] rounded-[2px]'>
                <h1>สมาชิก</h1>
            </div>
            <div className='h-[36.6vh] mt-5 border-2  overflow-y-auto w-full'>
                <table className='w-full relative'>
                    <thead className="sticky top-0 border-b bg-gray-50">
                        <tr>
                            <th width="25%" className="text-sm font-medium text-gray-900 px-6 py-4 ">
                                ชื่อ นามสกุล
                            </th>
                            <th width="25%" className="text-sm font-medium text-gray-900 px-6 py-4 border-l ">
                                อีเมล์
                            </th>
                            <th width="25%" className="text-sm font-medium text-gray-900 px-6 py-4 border-l ">
                                วันเกิด
                            </th>
                            <th width="25%" className="border-l  text-sm font-medium text-gray-900 px-6 py-4">
                                จำนวนห้องที่อยู่
                            </th>
                        </tr>
                    </thead >
                    <tbody  >
                        {
                            users.map((user) => {
                                return <tr className="border-b hover:bg-gray-100 cursor-pointer" key={user.report_id}>
                                    <td className="text-center font-light px-6 py-4 text-sm  text-gray-900">
                                        {user.fullName}
                                    </td>
                                    <td className="text-center border-l font-light px-6 py-4 text-sm  text-gray-900">
                                        {user.email}
                                    </td>
                                    <td className="text-center border-l font-light px-6 py-4 text-sm  text-gray-900">
                                        {user.birthday}
                                    </td>
                                    <td className="text-center border-l font-light px-6 py-4 text-sm  text-gray-900">
                                        {user.live}&nbsp;&nbsp;&nbsp;ห้อง
                                    </td>
                                </tr >
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className='justify-center items-center   mt-9 flex p-10 shadow-lg border rounded-sm'>
                <div className='flex flex-col items-center '>
                    <div className='flex items-center w-full mb-3'>
                        <p className='w-[80px]'>ชื่อ นามสกุล</p>
                        <input type='text' className='ml-4 bg-gray-100 outline-none py-1 flex-1 rounded-md pl-3' />
                    </div>
                    <div className='flex items-center w-full mb-3'>
                        <p className='w-[80px]'>วันเกิด</p>
                        <input type='text' className='ml-4 bg-gray-100 outline-none py-1 flex-1 rounded-md pl-3' />
                    </div>
                    <div className='flex items-center w-full mb-3'>
                        <p className='w-[80px]'>เบอร์โทร</p>
                        <input type='text' className='ml-4 bg-gray-100 outline-none py-1 flex-1 rounded-md pl-3' />
                    </div>
                    <button  className="self-end w-[65%] py-[5px] rounded-md mt-[20px]
                      font-normal text-[#796fc1] border-[2px]  bg-transparent border-[#796fc1] hover:bg-[#796fc1] hover:text-white
                     ">
                        ยืนยัน
                    </button>
                </div>
                <div className='ml-[20px] w-[150px] h-[150px] rounded-full bg-gray-100'>

                </div>
            </div>
            {isLoad && <div className='absolute w-full flex justify-center items-center  left-0 top-0 bottom-0  bg-black bg-opacity-30'>
                <LoadSelft />
            </div>}
        </div>
    )
}

export default Member