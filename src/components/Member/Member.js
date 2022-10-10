import axios from 'axios';
import React, { useEffect, useState } from 'react'
import apiUrl from '../../config/api-url';
import { useDispatch } from 'react-redux'
import { showLoad, closeLoad } from '../../store/loadSlice';
import showToast from '../../util/showToast';
import { LoadSelft } from '../../util/CustomLoad';
import ProgressiveImage from 'react-progressive-graceful-image'
import { RotatingLines } from 'react-loader-spinner';
import moment from 'moment';


const Member = () => {

    const [users, setAllUsers] = useState([]);

    const [isLoad, setIsLoad] = useState(true)

    const [currentSelect, setCurrentSelect] = useState();

    const [file, setFile] = useState();

    const onSelectImage = (e) => {
        if (!e.target.files || e.target.files.length == 0) {
            return;
        }
        const [file] = e.target.files;
        setFile(file);
        setCurrentSelect(val => {
            return {
                ...val,
                profile_url: URL.createObjectURL(file),
            }
        })
    }

    const fetchUsers = async () => {
        try {
            const res = await axios.get(apiUrl + "/users");
            setAllUsers(res.data);
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


    const onSubmit = async () => {
        try {
            setIsLoad(true);
            const formData = new FormData()
            if (file) {
                formData.append('image', file)
            }
            formData.append('userId', currentSelect.user_id);
            formData.append('fullName', currentSelect.fullName);
            formData.append('phone', currentSelect.phone);
            formData.append('birthDay', moment(currentSelect.birthday).format('YYYY-MM-DD'));
            await axios.patch(apiUrl + `/admin/user/${currentSelect.user_id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            });
            await fetchUsers();
            showToast({ text: 'อัพเดตสำเร็จ', type: 'success' })
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

    const onChangeTextUser = (e) => {
        let str = e.target.value;
        if (e.target.name === 'phone') {
            if (str.length > 12) {
                return;
            } else {
                str = formatNumber(str);
            }
        }
        setCurrentSelect(val => {
            return {
                ...val,
                [e.target.name]: str,
            }
        })
    }

    const formatNumber = (str) => {
        let n = str;
        if (str.length == 3 || str.length == 7) {
            n = n + "-";
        }
        return n;
    }

    const onClickUser = async (e, newUser) => {
        setCurrentSelect({ ...newUser });
        console.log(newUser);
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        if (users && !currentSelect) {
            setCurrentSelect(users[0]);
        }
    }, [users])

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
                                return <tr onClick={(e) => onClickUser(e, user)} className="border-b hover:bg-gray-100 cursor-pointer" key={user.report_id}>
                                    <td className="text-center font-light px-6 py-4 text-sm  text-gray-900">
                                        {user.fullName}
                                    </td>
                                    <td className="text-center border-l font-light px-6 py-4 text-sm  text-gray-900">
                                        {user.email}
                                    </td>
                                    <td className="text-center border-l font-light px-6 py-4 text-sm  text-gray-900">
                                        {moment(user.birthday).format('DD-MM-YYYY')}

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
            <div className='justify-center items-center mt-9 flex p-10 shadow-lg border rounded-sm'>
                <div className='flex flex-col items-center '>
                    <div className='flex items-center w-full mb-3'>
                        <p className='w-[80px]'>ชื่อ นามสกุล</p>
                        <input name='fullName' value={currentSelect?.fullName} onChange={(e) => onChangeTextUser(e)} type='text' className='ml-4 bg-gray-100 outline-none py-1 flex-1 rounded-md pl-3' />
                    </div>
                    <div className='flex items-center w-full mb-3'>
                        <p className='w-[80px]'>วันเกิด</p>
                        <input name='birthday' value={moment(currentSelect?.birthday).format('YYYY-MM-DD')} onChange={(e) => onChangeTextUser(e)} type='date' className='ml-4 bg-gray-100 outline-none py-1 flex-1 rounded-md pl-3' />
                    </div>
                    <div className='flex items-center w-full mb-3'>
                        <p className='w-[80px]'>เบอร์โทร</p>
                        <input name='phone' onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) event.preventDefault();
                        }} value={currentSelect?.phone} onChange={(e) => onChangeTextUser(e)} type='text' className='ml-4 bg-gray-100 outline-none py-1 flex-1 rounded-md pl-3' />
                    </div>
                    <button onClick={onSubmit} className="self-end w-[65%] py-[5px] rounded-md mt-[20px]
                      font-normal text-[#796fc1] border-[2px]  bg-transparent border-[#796fc1] hover:bg-[#796fc1] hover:text-white
                     ">
                        ยืนยัน
                    </button>
                </div>
                <label for="file-upload" className='cursor-pointer'>
                    <ProgressiveImage src={currentSelect?.profile_url} placeholder=''>
                        {
                            (src, loading) => {
                                return loading ?
                                    <div className='ml-[20px] w-[150px] h-[150px] rounded-full bg-gray-100 flex justify-center items-center'>
                                        <LoadSelft />
                                    </div>
                                    : <img src={src} alt='' className='ml-[20px] w-[150px] h-[150px] rounded-full bg-gray-100   object-cover' />
                            }
                        }
                    </ProgressiveImage>
                    <input className='hidden' id="file-upload" type="file" accept="image/png, image/jpg, image/gif, image/jpeg" onChange={onSelectImage} />
                </label>
            </div>
            {isLoad && <div className='absolute w-full flex justify-center items-center  left-0 top-0 bottom-0  bg-black bg-opacity-30'>
                <LoadSelft />
            </div>}
        </div>
    )
}

export default Member