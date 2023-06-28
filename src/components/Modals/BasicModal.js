import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class BasicModal extends React.Component{

  // onHide={this.props.hideModal} removed

  handleCloseClick=()=>{
    this.props.hideModal();
  }

  render(){
      console.log("I was triggered.");
      console.log(this.props.isModalShowing);
    return(
      <Modal show={this.props.isModalShowing} >
        <Modal.Header closeButton onClick={this.handleCloseClick}>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleCloseClick}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleCloseClick}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default BasicModal;
