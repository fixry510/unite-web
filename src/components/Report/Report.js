import axios from 'axios';
import React, { useEffect, useState } from 'react'
import apiUrl from '../../config/api-url';
import { useDispatch } from 'react-redux'
import { showLoad, closeLoad } from '../../store/loadSlice';
import showToast from '../../util/showToast';
import { LoadSelft } from '../../util/CustomLoad';


const Report = () => {

    const [reports, setReport] = useState([]);

    const [isLoad, setIsLoad] = useState(true)


    const fetchReport = async () => {
        try {
            const res = await axios.get(apiUrl + "/report");
            setReport(res.data);
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
        fetchReport();
    }, []);

    return (
        <div className='flex w-full justify-center items-center p-14 flex-col h-screen relative'>
            <div className='w-full h-14  text-md flex justify-start items-center pl-5 bg-gray-50 border-[2px] rounded-[2px]'>
                <h1>รายงาน</h1>
            </div>
            <div className='h-[65vh] mt-5 border-2  overflow-y-auto w-full'>
                <table className='w-full relative'>
                    <thead className="sticky top-0 border-b bg-gray-50">
                        <tr>
                            <th width="20%" className="text-sm font-medium text-gray-900 px-6 py-4 ">
                                ชื่อห้อง
                            </th>
                            <th width="20%" className="text-sm font-medium text-gray-900 px-6 py-4 border-l ">
                                หัวข้อ
                            </th>
                            <th width="60%" className="border-l  text-sm font-medium text-gray-900 px-6 py-4">
                                รายละเอียด
                            </th>
                        </tr>
                    </thead >
                    <tbody  >
                        {
                            reports.map((report) => {
                                return <tr className="border-b hover:bg-gray-100 cursor-pointer" key={report.report_id}>
                                    <td className="text-center font-light px-6 py-4 text-sm  text-gray-900">
                                        {report.room_name}
                                    </td>
                                    <td className="text-center border-l font-light px-6 py-4 text-sm  text-gray-900">
                                        {report.title}
                                    </td>
                                    <td className="text-center border-l font-light px-6 py-4 text-sm  text-gray-900">
                                        {report.description}
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

export default Report