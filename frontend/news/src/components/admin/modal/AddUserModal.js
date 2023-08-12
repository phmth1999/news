import React from "react";
import { useState } from "react";
import { postInsertUser } from "../../../services/UserService";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const AddUserModal = (props) => {
  const { show, handleClose, handleLoadListUserByFirst } = props;

  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const InsertUser = { fullname, username, password};

  const handleSaveUser = async () => {
    let res = await postInsertUser(InsertUser);
    if (res && res.data && res.data.id) {
      handleLoadListUserByFirst();
      handleClose();
      setFullname('');
      setUsername('');
      setPassword('');
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
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
              value={password}
              type="password"
              autoComplete="on"
              className="form-control"
              required="required"
            />
          </div>
          </form>
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
