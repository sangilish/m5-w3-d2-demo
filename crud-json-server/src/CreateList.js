import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function CreateList(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <React.Fragment>
      {/* 모달 열기 버튼 */}
      <Button variant="primary" onClick={handleShow}>
        Create New List
      </Button>

      {/* 모달 UI */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New List</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={props.singledata.title}
            onChange={props.handleChange}
            className="d-block my-3"
          />
          <input
            type="text"
            placeholder="Author"
            name="author"
            value={props.singledata.author}
            onChange={props.handleChange}
            className="d-block my-3"
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              props.createList();  // POST 요청 함수
              handleClose();
            }}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default CreateList;