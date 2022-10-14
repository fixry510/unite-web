import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import { useAuth } from './Context/AuthProvider';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeWrapper from './components/HomeWrapper/HomeWrapper';
import CustomLoad from './util/CustomLoad';
import Report from './components/Report/Report';
import Member from './components/Member/Member';
import AllRoom from './components/AllRoom/AllRoom';
import AddAdmin from './components/AddAdmin/AddAdmin';

function App() {

  const { currentUser } = useAuth();

  return (
    <React.Fragment>
      <Routes>
        {
          !currentUser ?
            <Route path="/login" element={<Login />} /> :
            <Route path='/home' element={<HomeWrapper />}>
              <Route index element={<Report />} />
              <Route path='/home/member' element={<Member />} />
              <Route path='/home/all-room' element={<AllRoom />} />
              {
                currentUser.status === 1 && <Route path='/home/add-admin' element={<AddAdmin />} />
              }
            </Route>
        }
        <Route path='*' element={<Navigate to={!currentUser ? "/login" : "/home"} replace />} />
      </Routes>
      <ToastContainer
        style={{
          fontSize: '16px',
          color: 'black'
        }}
      />
      <CustomLoad />
    </React.Fragment>
  );
}

export default App;
