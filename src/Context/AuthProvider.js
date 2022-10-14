import React, { createContext, useState, useEffect } from 'react';
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import showToast from '../util/showToast';
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useDispatch } from 'react-redux'
import { showLoad,closeLoad } from '../store/loadSlice';

const AuthContext = createContext();

export function useAuth() {
    return React.useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const [isLoadAuth, setIsLoadAuth] = useState(true);

    const dispatch = useDispatch()

    const onLogin = async (email, password) => {
        try {
            if (!email) {
                return showToast({
                    text: 'กรุณาใส่อีเมล์',
                    type: 'error'
                })
            }
            if (!password) {
                return showToast({
                    text: 'กรุณาใส่รหัสผ่าน',
                    type: 'error'
                })
            }
            return new Promise(async (resolve, reject) => {
                const data = await signInWithEmailAndPassword(auth, email, password).catch(err => {
                    switch (err.code) {
                        case "auth/Invalid-email":
                            showToast({
                                text: 'อีเมล์ไม่ถูกต้อง',
                                type: 'error'
                            })
                            break;
                        case "auth/user-disabled":
                            showToast({
                                text: 'user-disabled',
                                type: 'error'
                            })
                            break;
                        case "auth/user-not-found":
                            showToast({
                                text: 'ไม่พบผู้ใช้',
                                type: 'error'
                            })
                            break;
                        case "auth/wrong-password":
                            showToast({
                                text: 'รหัสผ่านไม่ถูกต้อง',
                                type: 'error'
                            })
                            break;
                        default:
                            showToast({
                                text: 'เกิดข้อผิดพลาด',
                                type: 'error'
                            })
                    }
                });
                resolve(data);
            });
        } catch (e) {
            console.log(e);
            showToast({
                // text: e?.response.data?.message || 'เกิดข้อผิดพลาด',
                text: 'กรุณาลองอีกครั้ง',
                type: 'error'
            })
        }
    }

    const onLogout = async () => {
        await auth.signOut();
    }

    const fetchAdminData = async (uid) => {
        dispatch(showLoad());
        const docData = await getDoc(doc(db, `admin/${uid}`));
        if (docData.exists()) {
            setCurrentUser(docData.data());
        }
        dispatch(closeLoad());
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (us) => {
            if (us) {
                await fetchAdminData(us.uid);
            } else {
                setCurrentUser(undefined);
            }
            setIsLoadAuth(false);
        });
        return () => unsubscribe();
    }, []);


    return (
        <AuthContext.Provider value={{
            currentUser: currentUser,
            onLogin: onLogin,
            onLogout: onLogout,
        }}>
            {!isLoadAuth && children}
        </AuthContext.Provider>
    )
}

export default AuthProvider







// import React, { createContext, useState, useEffect } from 'react';
// import { auth } from "../firebase";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import showToast from '../util/showToast';

// const AuthContext = createContext();

// export function useAuth() {
//     return React.useContext(AuthContext);
// }

// const AuthProvider = ({ children }) => {
//     const [currentUser, setCurrentUser] = useState();
//     const [isLoadAuth, setIsLoadAuth] = useState(true);

//     const onLogin = async (email, password) => {
        // try {
        //     if (!email) {
        //         return showToast({
        //             text: 'กรุณาใส่อีเมล์',
        //             type: 'error'
        //         })
        //     }
        //     if (!password) {
        //         return showToast({
        //             text: 'กรุณาใส่รหัสผ่าน',
        //             type: 'error'
        //         })
        //     }
        //     return new Promise(async (resolve, reject) => {
        //         const data = await signInWithEmailAndPassword(auth, email, password).catch(err => {
        //             switch (err.code) {
        //                 case "auth/Invalid-email":
        //                     showToast({
        //                         text: 'อีเมล์ไม่ถูกต้อง',
        //                         type: 'error'
        //                     })
        //                     break;
        //                 case "auth/user-disabled":
        //                     showToast({
        //                         text: 'user-disabled',
        //                         type: 'error'
        //                     })
        //                     break;
        //                 case "auth/user-not-found":
        //                     showToast({
        //                         text: 'ไม่พบผู้ใช้',
        //                         type: 'error'
        //                     })
        //                     break;
        //                 case "auth/wrong-password":
        //                     showToast({
        //                         text: 'รหัสผ่านไม่ถูกต้อง',
        //                         type: 'error'
        //                     })
        //                     break;
        //                 default:
        //                     showToast({
        //                         text: 'เกิดข้อผิดพลาด',
        //                         type: 'error'
        //                     })
        //             }
        //         });
        //         resolve(data);
        //     });
        // } catch (e) {
        //     showToast({
        //         text: e?.response.data?.message || 'เกิดข้อผิดพลาด',
        //         type: 'error'
        //     })
        // }
//     }

//     const onLogout = async () => {
//         await auth.signOut();
//     }

//     useEffect(() => {
//         const unsubscribe = auth.onAuthStateChanged((us) => {
//             setCurrentUser(us);
//             setIsLoadAuth(false);
//         });
//         return () => unsubscribe();
//     }, []);



//     return (
//         <AuthContext.Provider value={{
//             currentUser: currentUser,
//             onLogin: onLogin,
//             onLogout: onLogout,
//         }}>
//             {!isLoadAuth && children}
//         </AuthContext.Provider>
//     )
// }

// export default AuthProvider

