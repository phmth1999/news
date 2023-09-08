import React, {useEffect} from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../assets/images/logo.svg';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { handleLogoutRedux } from "../../redux/actions/userAction";
import { toast } from "react-toastify";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.account);
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() =>{
    if(user && user.auth === false && window.location.pathname !== "/login"){
      navigate("/login");
      toast.success("Logout successfully!");
    }
  }, [user]);

  const handleClickLogout = () => {
    dispatch(handleLogoutRedux());
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
            {user && user.auth === true && user.username && <span className="nav-link text-white">Welcome {user.username}</span>}
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