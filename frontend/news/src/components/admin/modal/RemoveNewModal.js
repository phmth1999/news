import React from "react";
// import { useState } from "react";
import { deleteNew } from "../../../services/NewService";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const RemoveUserModal = (props) => {
  const { show, handleClose, dataNewDelete, handleLoadListNewByPage } = props;

  const handleConfirmDelete = async () => {
    let res = await deleteNew(dataNewDelete.id);
    if (res && res.data) {
      handleLoadListNewByPage();
      handleClose();
      toast.success(res.message);
    }else{
      handleClose();
      toast.error(res.message);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Remove New</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This action can't be  undone!
          Do want to delete this New?
          <br />
          <b>Title = {dataNewDelete.title}?</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={() => handleConfirmDelete()} variant="primary">
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RemoveUserModal;
