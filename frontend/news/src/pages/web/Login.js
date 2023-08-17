import React from 'react';
import { useState, useEffect } from "react";
import Path from "../../components/web/Path";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from '../../services/UserService';
import { toast } from "react-toastify";
import {useContext} from 'react';
import {UserContext} from '../../context/UserContext';

const Login = () => {
  const {loginContext} = useContext(UserContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    let token = localStorage.getItem("token");
    if(token){
      navigate("/");
    }
  }, []);

  const handleClickLogin = async () => {
    if(!username || !password){
      toast.error("Username/Password is required!");
      return;
    }else{
      try {
        let res = await loginApi(username, password);
        if(res && res.token){
          loginContext(username, res.token);
          navigate("/");
          toast.success("Login successfully!");
        }else{
          toast.error("Username/Password is correct!");
        }
      } catch (error) {
        toast.error("Username/Password is correct!");
      }
    }
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