import React from "react";
import { useState } from "react";
// import { postInsertUser } from "../../../services/UserService";
// import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const AddNewModal = (props) => {
  const { show, handleClose } = props;

  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [content, setContent] = useState("");
  // const InsertNew = { title, thumbnail, shortDescription, content};

  const handleSaveNew = async () => {
   
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
          <div className="form-group pt-3">
            <label htmlFor="">Title</label>
            <input
              onChange={(event) => setTitle(event.target.value)}
              value={title}
              type="text"
              className="form-control"
              required="required"
            />
          </div>
          <div className="form-group pt-3">
            <label htmlFor="">Thumbnail</label>
            <input
              onChange={(event) => setThumbnail(event.target.value)}
              value={thumbnail}
              type="text"
              className="form-control"
              required="required"
            />
          </div>
          <div className="form-group pt-3">
            <label htmlFor="">ShortDescription</label>
            <textarea 
              onChange={(event) => setShortDescription(event.target.value)}
              value={shortDescription}
              type="text"
              className="form-control"
              required="required"
            />
          </div>
          <div className="form-group pt-3">
            <label htmlFor="">Content</label>
            <CKEditor
              editor={ ClassicEditor }
              data={content}
              onReady={ editor => {
                editor.editing.view.change((writer) => {
                  writer.setStyle('height', '200px', editor.editing.view.document.getRoot())
                })
              } }
              onChange={(event, editor) => {
                const dataContent = editor.getData()
                setContent(dataContent);
              }}
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
          <Button onClick={() => handleSaveNew()} variant="primary">
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddNewModal;
