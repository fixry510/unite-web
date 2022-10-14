import React, { useState, useEffect } from 'react'
import ProgressiveImage from 'react-progressive-graceful-image'
import { LoadSelft } from '../../util/CustomLoad';
import { onSnapshot, doc, collection } from "firebase/firestore";
import { db } from '../../firebase';
import ModalAdd from './ModalAdd';

const AddAdmin = () => {
    const [allAdmin, setAllAdmin] = useState([]);
    const [isAddAdmin, setIsAddAdmin] = useState(false);

    const [isLoad, setIsLoad] = useState(false);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "admin"), (doc) => {
            setIsLoad(true);
            const listAdmin = [];
            doc.docs.forEach(d => {
                listAdmin.push(d.data());
            });
            setTimeout(() => {
                setAllAdmin(listAdmin);
                setIsLoad(false);
            }, 500)
        });
        return () => unsubscribe()
    }, []);


    const onAddAdmin = () => {
        setIsAddAdmin(true);
    }


    return (
        <div className='p-5 relative'>
            <div className='flex w-full  items-center p-14 flex-col h-screen relative'>
                <div className='w-full h-14  text-md flex items-center pl-5 bg-gray-50 border-[2px] rounded-[2px] pr-5'>
                    <h1 className='flex-1'>Admin</h1>
                    <button onClick={onAddAdmin} className="bg-blue-500 hover:bg-blue-700 text-white  text-sm py-2 px-4 rounded">
                        เพิ่ม Admin
                    </button>
                </div>
                <div className='flex-1 mt-5 border-2  overflow-y-auto w-full'>
                    <table className='w-full relative'>
                        <thead className="sticky top-0 border-b bg-gray-50">
                            <tr>
                                <th width="30%" className="text-sm font-medium text-gray-900 px-6 py-4 ">
                                    อีเมล์
                                </th>
                                <th width="20%" className="text-sm font-medium text-gray-900 px-6 py-4 border-l ">
                                    ชื่อ นามสกุล
                                </th>
                                <th width="20%" className="text-sm font-medium text-gray-900 px-6 py-4 border-l ">
                                    เบอร์โทร
                                </th>
                                <th width="10%" className="text-sm font-medium text-gray-900 px-6 py-4 border-l ">
                                    รูปโปร์ไฟล์
                                </th>
                            </tr>
                        </thead >
                        <tbody  >
                            {
                                allAdmin.map((admin) => {
                                    return <tr className="border-b hover:bg-gray-100 cursor-pointer" key={admin.uid}>
                                        <td className="text-center font-light px-6 py-4 text-sm  text-gray-900">
                                            {admin.email}
                                        </td>
                                        <td className="text-center border-l font-light px-6 py-4 text-sm  text-gray-900">
                                            {admin.fullName}
                                        </td>
                                        <td className="text-center border-l font-light px-6 py-4 text-sm  text-gray-900">
                                            {admin.phone}
                                        </td>
                                        <td className="text-center border-l font-light px-6 py-4 text-sm  text-gray-900">
                                            <ProgressiveImage src={admin.profile} placeholder=''>
                                                {
                                                    (src, loading) => {
                                                        return loading ?
                                                            <div className='min-w-[50px] min-h-[50px] w-[50px] h-[50px m-auto rounded-full bg-gray-100 flex justify-center items-center'>
                                                                <LoadSelft />
                                                            </div>
                                                            : <img src={src} alt='' className='min-w-[50px] min-h-[50px] w-[50px] h-[50px] rounded-full bg-gray-100 m-auto  object-cover' />
                                                    }
                                                }
                                            </ProgressiveImage>
                                        </td>
                                    </tr >
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {isAddAdmin && <ModalAdd setIsAddAdmin={setIsAddAdmin} />}
            {isLoad && <div className='absolute w-full flex justify-center items-center  left-0 top-0 bottom-0  bg-black bg-opacity-30'>
                <LoadSelft />
            </div>}
        </div>
    )
}

export default AddAdmin
