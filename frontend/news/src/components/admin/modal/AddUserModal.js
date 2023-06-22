import React from "react";
import { useState } from "react";
import { postSignup } from "../../../services/UserService";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const AddUserModal = (props) => {
  const { show, handleClose, handleUpdateTable } = props;

  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStateUser] = useState("");
  const [roles, setRole] = useState("");
  const SignupForm = { fullname, username, password, status, roles };

  const handleSaveUser = async () => {
    let res = await postSignup(SignupForm);
    if (res && res.data && res.data.id) {
      console.log(res);
      console.log(SignupForm);
      handleClose();
      setFullname("");
      setUsername("");
      setPassword("");
      setStateUser("");
      setRole("");
      handleUpdateTable(true);
      toast.success("A user is created success!");
      console.log(SignupForm);
    } else {
      handleUpdateTable(false);
      toast.error("An error!");
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="">Fullname</label>
            <input
              onChange={(event) => setFullname(event.target.value)}
              value={fullname}
              type="text"
              className="form-control"
              required="required"
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Username</label>
            <input
              onChange={(event) => setUsername(event.target.value)}
              value={username}
              type="text"
              className="form-control"
              required="required"
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Password</label>
            <input
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              autoComplete="on"
              className="form-control"
              required="required"
            />
          </div>
          <div className="form-group">
            <label htmlFor="">StateUser</label>
            <select
              onChange={(event) => setStateUser(event.target.value)}
              className="form-control form-select"
              required="required"
            >
              <option value="0">PENDING</option>
              <option value="1">ACTIVED</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="">Role</label>
            <select
              onChange={(event) => setRole(event.target.value)}
              className="form-control form-select"
              required="required"
            >
              <option value="1">ROLE_ADMIN</option>
              <option value="2">ROLE_USER</option>
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={() => handleSaveUser()} variant="primary">
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddUserModal;
