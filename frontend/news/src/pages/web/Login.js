import React from 'react';
import { useState, useEffect } from "react";
import Path from "../../components/web/Path";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { handleLoginRedux } from '../../redux/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const account = useSelector(state => state.user.account);

  useEffect(() => {
    if(account && account.auth == null && window.location.pathname === "/login"){
      toast.error("Username/Password is required!");
    }else
    if(account && account.auth === true){
      navigate("/");
      toast.success("Login successfully!");
    }
  }, [account]);

  const handleClickLogin = async () => {
    if(!username || !password){
      toast.error("Username/Password is required!");
      return;
    }

    dispatch(handleLoginRedux(username, password));

  };



  return (
    <>
      <Path title="Login"/>
      <section className="container login pb-4">
        <div className="row">
          <div className="col-md-4 col-12 p-0" id="side1">
            <div>
              <h3>Hello Friend!</h3>
              <p>Create New Account</p>
              <Link to={"/register"}><button id="btn">Sign up</button></Link>
            </div>
          </div>
          <div className="col-md-8 col-12 p-0" id="side2">
            <form className="form-login" method='' action=''>
              <h3>Login Account</h3>
              <div className="inp">
                <input 
                  onChange={(event) => setUsername(event.target.value)}
                  value={username}
                  type="text" 
                  name="username" 
                  id="username" 
                  placeholder="User Name" 
                  required /> 
                <input
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete=''
                  value={password} 
                  type="password" 
                  name="password" 
                  id="password" 
                  placeholder="Password" 
                  required />
              </div>
              <div id="login">
                <button onClick={() => handleClickLogin()} type="button">Sign in</button>
              </div>
            </form>
          </div>
        </div>
		</section>
    </>
  )
}

export default Login