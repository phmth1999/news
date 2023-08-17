import React from 'react';
import Path from "../../components/web/Path";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <>
      <Path title="Register"/>
      <section className="container login pb-4">
        <div className="row">
          <div className="col-md-4 col-12 p-0" id="side1">
            <div>
              <h3>Welcome Back!</h3>
              <p>Login Account</p>
              <Link to={"/login"}><button id="btn">Sign in</button></Link>
            </div>
          </div>
          <div className="col-md-8 col-12 p-0" id="side2">
            <form className="form-login" method='' action=''>
              <h3>Create Account</h3>
              <div className="inp">
                <input type="text" name="username" id="username" placeholder="Full Name" required /> 
                <input type="text" name="email" id="email" placeholder="Email" required />
                <input type="password" name="password" id="password" placeholder="Password" required />
              </div>
              <div id="login">
                <button type="submit">Sign up</button>
              </div>
            </form>
          </div>
        </div>
		</section>
    </>
  )
}

export default Register