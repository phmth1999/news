import React from 'react';
import Path from "../../components/web/Path";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <Path title="Login"/>
      <section className="container login">
        <div className="row">
          <div className="col-md-4 col-12 p-0" id="side1">
            <div>
              <h3>Hello Friend!</h3>
              <p>Create New Account</p>
              <Link><button id="btn">Sign up</button></Link>
            </div>
          </div>
          <div className="col-md-8 col-12 p-0" id="side2">
            <form className="form-login" method='' action=''>
              <h3>Login Account</h3>
              <div className="inp">
                <input type="text" name="username" id="username" placeholder="User Name" required /> 
                <input type="password" name="password" id="password" placeholder="Password" required />
              </div>
              <div id="login">
                <button type="submit">Sign in</button>
              </div>
            </form>
          </div>
        </div>
		</section>
    </>
  )
}

export default Login