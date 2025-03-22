import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

function UpdateList(props) {
  // 모달 표시 여부
  const [show, setShow] = useState(false);

  // 모달 열기
  const handleShow = (evt) => {
    // Update 버튼을 클릭할 때, App.js의 getList()를 호출하여
    // 현재 아이템의 데이터를 가져오도록 합니다.
    props.getList(evt, props.elementId);
    setShow(true);
  };

  // 모달 닫기
  const handleClose = () => setShow(false);

  return (
    <React.Fragment>
      {/* Update 버튼 */}
      <Button
        variant="primary"
        onClick={(evt) => {
          handleShow(evt);
        }}
      >
        Update
      </Button>

      {/* 모달 */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update List</Modal.Title>
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
              // Update 버튼을 누르면, App.js에 있는 updateList 호출
              // 그리고 모달 닫기
              props.updateList(props.elementId);
              handleClose();
            }}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default UpdateList;