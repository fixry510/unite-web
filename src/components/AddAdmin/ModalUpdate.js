import React, { useState, useEffect } from 'react'
import ProgressiveImage from 'react-progressive-graceful-image'
import { LoadSelft } from '../../util/CustomLoad';
import showToast from '../../util/showToast';
import { showLoad, closeLoad } from '../../store/loadSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from '../../firebase';
import { onSnapshot, doc, collection, updateDoc } from "firebase/firestore";

const ModalUpdadte = ({ adminData, onCloseUpdate }) => {

    const dispatch = useDispatch();


    const [newAdminData, setNewAdminData] = useState({
        fullName: '',
        phone: '',
        email: '',
        img: '',
        file: '',
        uid: '',
    });

    useEffect(() => {
        setNewAdminData({
            fullName: adminData.fullName,
            phone: adminData.phone,
            email: adminData.email,
            img: adminData.profile,
            file: '',
            uid: adminData.uid,
        });
    }, [])


    const onSubmit = async () => {
        const { fullName, phone, email, img, file, uid } = newAdminData;

        try {
            dispatch(showLoad());
            let url = img;
            if (file) {
                const storageRef = ref(storage, `admin/${uid}/profile-${Date.now()}`);
                const uploadTask = uploadBytesResumable(storageRef, file);
                url = await new Promise((resolve, reject) => {
                    uploadTask.on(
                        "state_changed",
                        undefined,
                        (err) => reject(''),
                        async () => resolve((await getDownloadURL(uploadTask.snapshot.ref)))
                    );
                })
            }
            await updateDoc(doc(db, `admin/${uid}`), {
                email,
                fullName,
                phone,
                profile: url,
            })
            showToast({ text: 'อัปเดต Admin สำเร็จ', type: 'success' })
        } catch (e) {
            console.log(e);
            showToast({
                text: e?.response?.data?.message || 'เกิดข้อผิดพลาด',
                type: "failed"
            });
        } finally {
            setTimeout(() => {
                dispatch(closeLoad());
                onCloseUpdate();
            }, 500)
        }
    }


    const onSelectImage = (e) => {
        if (!e.target.files || e.target.files.length == 0) {
            return;
        }
        const [file] = e.target.files;
        setNewAdminData((val) => {
            return {
                ...val,
                img: URL.createObjectURL(file),
                file: file,
            }
        })
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
        setNewAdminData(val => {
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

    return (
        <React.Fragment>
            <div onClick={() => onCloseUpdate()} className='absolute left-0 top-0 bg-black opacity-50 w-screen h-screen' />
            <div className='absolute left-[50%] top-[40%] translate-x-[-50%] translate-y-[-50%] pl-7 pr-7 pb-7 border shadow-lg flex-col bg-white rounded-md'>
                <div className='h-[70px] flex justify-center items-center'>
                    <h1 className='text-center  font-medium text-[18px]'>อัปเดต Admin</h1>
                </div>
                <div className='justify-center  items-start  flex py-5'>
                    <div className='flex flex-col items-center '>
                        <div className='flex items-center w-full mb-3'>
                            <p className='w-[80px]'>อีเมล์</p>
                            <input disabled name='email' value={newAdminData.email} onChange={onChangeTextUser} type='text' className='ml-4 bg-gray-100 outline-none py-1 flex-1 rounded-md pl-3' />
                        </div>
                        <div className='flex items-center w-full mb-3'>
                            <p className='w-[80px]'>ชื่อ นามสกุล</p>
                            <input name='fullName' value={newAdminData.fullName} onChange={onChangeTextUser} type='text' className='ml-4 bg-gray-100 outline-none py-1 flex-1 rounded-md pl-3' />
                        </div>
                        <div className='flex items-center w-full mb-3'>
                            <p className='w-[80px]'>เบอร์โทร</p>
                            <input name='phone' value={newAdminData.phone} onChange={onChangeTextUser} onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) event.preventDefault();
                            }} type='text' className='ml-4 bg-gray-100 outline-none py-1 flex-1 rounded-md pl-3' />
                        </div>
                        <button onClick={onSubmit} className="self-end w-[65%] py-[5px] rounded-md mt-[20px]
                             font-normal text-[#796fc1] border-[2px]  bg-transparent border-[#796fc1] 
                             hover:bg-[#796fc1] hover:text-white">
                            ยืนยัน
                        </button>
                    </div>
                    <label for="file-upload" className='cursor-pointer'>
                        {newAdminData.img ?
                            <ProgressiveImage src={newAdminData.img} placeholder=''>
                                {
                                    (src, loading) => {
                                        return loading ?
                                            <div className='ml-[20px] min-w-[150px] min-h-[150px] w-[150px] h-[150px] rounded-full bg-gray-100 flex justify-center items-center'>
                                                <LoadSelft />
                                            </div>
                                            : <img src={src} alt='' className='ml-[20px] min-w-[150px] min-h-[150px]     w-[150px] h-[150px] rounded-full bg-gray-100   object-cover' />
                                    }
                                }
                            </ProgressiveImage> :
                            <div className='ml-[20px] min-w-[150px] min-h-[150px] w-[150px] h-[150px] rounded-full bg-gray-100 flex justify-center items-center' />}
                        <input className='hidden' id="file-upload" type="file" accept="image/png, image/jpg, image/gif, image/jpeg" onChange={onSelectImage} />
                    </label>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ModalUpdadte