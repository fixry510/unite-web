import axios from 'axios';
import React, { useEffect, useState } from 'react'
import apiUrl from '../../config/api-url';
import { useDispatch } from 'react-redux'
import { showLoad, closeLoad } from '../../store/loadSlice';
import showToast from '../../util/showToast';
import { LoadSelft } from '../../util/CustomLoad';


const AllRoom = () => {

    const [rooms, setAllRooms] = useState([]);

    const [isLoad, setIsLoad] = useState(true)


    const fetchRooms = async () => {
        try {
            const res = await axios.get(apiUrl + "/get-all-room");
            setAllRooms(res.data);
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
        fetchRooms();
    }, []);

    return (
        <div className='flex w-full justify-center items-center p-14 flex-col h-screen relative'>
            <div className='w-full h-14  text-md flex justify-start items-center pl-5 bg-gray-50 border-[2px] rounded-[2px]'>
                <h1>ห้องทั้งหมด</h1>
            </div>
            <div className='h-[65vh] mt-5 border-2  overflow-y-auto w-full'>
                <table className='w-full relative'>
                    <thead className="sticky top-0 border-b bg-gray-50">
                        <tr>
                            <th width="25%" className="text-sm font-medium text-gray-900 px-6 py-4 ">
                                ชื่อห้อง
                            </th>
                            <th width="25%" className="text-sm font-medium text-gray-900 px-6 py-4  border-l">
                                หัวหน้าห้อง
                            </th>
                            <th width="25%" className="text-sm font-medium text-gray-900 px-6 py-4 border-l ">
                                เฮรัญญิก
                            </th>
                            <th width="65%" className="border-l  text-sm font-medium text-gray-900 px-6 py-4">
                                จำนวนสมาชิก
                            </th>
                        </tr>
                    </thead >
                    <tbody  >
                        {
                            rooms.map((room) => {
                                return <tr className="border-b hover:bg-gray-100 cursor-pointer" key={room.report_id}>
                                    <td className="text-center font-light px-6 py-4 text-sm  text-gray-900">
                                        {room.room_name}
                                    </td>
                                    <td className="text-center border-l font-light px-6 py-4 text-sm  text-gray-900">
                                        {room.leader}
                                    </td>
                                    <td className="text-center border-l font-light px-6 py-4 text-sm  text-gray-900">
                                        {room.treasurer}
                                    </td>
                                    <td className="text-center border-l font-light px-6 py-4 text-sm  text-gray-900">
                                        {room.member_amount}&nbsp;&nbsp;&nbsp;คน
                                    </td>
                                </tr >
                            })
                        }
                    </tbody>
                </table>
                {isLoad && <div className='absolute w-full flex justify-center items-center  left-0 top-0 bottom-0  bg-black bg-opacity-30'>
                    <LoadSelft />
                </div>}
            </div>
        </div>
    )
}

export default AllRoom