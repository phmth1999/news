import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';

import WebLayout from './layout/Web.js';
import Home from './pages/web/Home';
import Login from './pages/web/Login';
import Register from './pages/web/Register';
import New from './pages/web/New';

import AdminLayout from './layout/Admin';
import AdminHome from './pages/admin/Home';
import ManagerUser from './pages/admin/ManagerUser';
import ManagerNew from './pages/admin/ManagerNew';

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { handleRefresh } from './redux/actions/userAction';

function App() {

const dispatch = useDispatch();

  useEffect(() =>{
    if(localStorage.getItem('token')){
      dispatch(handleRefresh());
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<WebLayout />}>
            <Route index element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='new/:id' element={<New />} />
          </Route>
          <Route path='/admin' element={<AdminLayout />}>
            <Route index element={<AdminHome />} />
            <Route path='user' element={<ManagerUser />} />
            <Route path='new' element={<ManagerNew  />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </>
  );
}

export default App;
