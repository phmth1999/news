import React from 'react';
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
    <div className='mb-0 py-2 bg-dark'>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <p className="text-end mb-0">
                        <Link className="text-white" to={"/login"}>Login</Link>
                        <Link className="text-white"> / </Link>
                        <Link className="text-white" to={"/register"}>Register</Link>
                    </p>
                </div>
            </div>
        </div>
      </div>

      
      <header>
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand" to={""}><img src="/logo.svg" alt="" /></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="mynavbar">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/"}>Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/admin/user"}>Manager User</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={"/admin/new"}>Manager New</Link>
                </li>
              </ul>
              <form className="d-flex">
                <input className="form-control me-2" type="text" placeholder="Search" />
                <button className="btn btn-primary" type="button">Search</button>
              </form>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header