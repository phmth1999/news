import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../assets/images/logo.svg';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {useContext} from 'react';
import {UserContext} from '../../context/UserContext';

const Header = () => {
  const {logout, user} = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const handleClickLogout = () => {
    logout();
    navigate("/");
    toast.success("Logout successfully!");
  };
  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary header">
      <Container>
        <Navbar.Brand href="/"><img src={logo} alt="" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" activeKey={location.pathname}>
            <Nav.Link href="/admin/user" >User Management</Nav.Link>
            <Nav.Link href="/admin/new" >News Management</Nav.Link>
          </Nav>
          <Nav>
            {user && user.username && <span className="nav-link text-white">Welcome {user.username}</span>}
            <NavDropdown title="Settings" id="basic-nav-dropdown" className="setting">
              {user && user.auth === true
                ? <NavDropdown.Item onClick={() => handleClickLogout()}>Logout</NavDropdown.Item>
                : <NavLink className="dropdown-item" to={"/login"}>Login</NavLink>
              }
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
};

export default Header;