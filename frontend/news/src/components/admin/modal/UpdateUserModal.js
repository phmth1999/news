import React from "react";
import { useState, useEffect } from "react";
import { putUpdateUser } from "../../../services/UserService";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const UpdateUserModal = (props) => {
  const { show, handleClose, dataUserUpdate, handleUpdateUserFormModal } = props;
  const [id, setId] = useState("");
  const [fullname, setFullname] = useState("");
  const [status, setStatus] = useState("");
  const updateUser = {id, fullname, status};

  const handleUpdateUser = async () => {
    let res = await putUpdateUser(updateUser);
    if (res && res.data && res.data.id) {
      handleUpdateUserFormModal({
        fullname: fullname,
        status: status,
        id: id,
      })
      handleClose();
      toast.success(res.message);
    }else{
      handleClose();
      toast.error(res.message);
    }
  }

  useEffect(() => {
    if(show){
      setId(dataUserUpdate.id);
      setFullname(dataUserUpdate.fullname);
      setStatus(dataUserUpdate.status);
    }
  }, [dataUserUpdate]);


  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
          <div className="form-group">
            <label htmlFor="">Id</label>
            <input
              onChange={(event) => setId(event.target.value)}
              value={id}
              type="text"
              className="form-control"
              readOnly
            />
          </div>
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
				<label htmlFor="">Status</label> 
				<select 
          className="form-control form-select"  
          required="required"
          onChange={(event) => setStatus(event.target.value)}
          value={status}
        >
					<option value="ACTIVED">ACTIVED</option>
					<option value="DISABLED">DISABLED</option>
				</select>
			</div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleUpdateUser()}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateUserModal;
