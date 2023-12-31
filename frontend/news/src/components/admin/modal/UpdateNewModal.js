import React from "react";
import { useState, useEffect } from "react";
import { putUpdateNew } from "../../../services/NewService";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const UpdateNewModal = (props) => {
  const { show, handleClose, dataNewUpdate, handleLoadListNewByPage } = props;

  const [id, setId] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [content, setContent] = useState("");
  const UpdateNew = { id, category, title, thumbnail, shortDescription, content};

  const handleSaveNew = async () => {
    let res = await putUpdateNew(UpdateNew);
    if (res && res.data && res.data.id) {
      handleLoadListNewByPage();
      handleClose();
      setId('');
      setCategory('');
      setTitle('');
      setThumbnail('');
      setShortDescription('');
      setContent("");
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  useEffect(() => {
    if(show){
      setId(dataNewUpdate.id);
      setCategory(dataNewUpdate.category);
      setTitle(dataNewUpdate.title);
      setThumbnail(dataNewUpdate.thumbnail);
      setShortDescription(dataNewUpdate.shortDescription);
      setContent(dataNewUpdate.content);
    }
  }, [dataNewUpdate]);

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Update New</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
          <div className="form-group pt-3">
            <label htmlFor="">Id</label>
            <input
              onChange={(event) => setId(event.target.value)}
              value={id}
              type="text"
              className="form-control"
              readOnly
            />
          </div>
          <div className="form-group pt-3">
            <label htmlFor="">Category</label>
            <input
              onChange={(event) => setCategory(event.target.value)}
              value={category}
              type="text"
              className="form-control"
              required="required"
            />
          </div>
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
                  writer.setStyle('height', 'auto', editor.editing.view.document.getRoot())
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
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateNewModal;
