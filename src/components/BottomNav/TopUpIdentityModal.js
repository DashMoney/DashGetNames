import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';

//const Dash = require('dash');

class TopUpIdentityModal extends React.Component{


  handleCloseClick=()=>{
    this.props.hideModal();
  }

  handleTopUp = () => {
    this.props.doTopUpIdentity(1000000);//this is where I set the top up amount*********************************************************
    this.props.hideModal();
  }

  render(){
    
    let modalBkg = "";
    let closeButtonColor;
    
    if(this.props.mode === "primary"){
      modalBkg = "modal-backcolor-primary";
      closeButtonColor = <CloseButton onClick={this.handleCloseClick}/>
    }else{
      modalBkg = "modal-backcolor-dark";
      closeButtonColor = <CloseButton onClick={this.handleCloseClick} variant="white"/>
    }
 
    return(
      <Modal show={this.props.isModalShowing} 
      contentClassName={modalBkg}>
        <Modal.Header>
          <Modal.Title>Top Up Identity</Modal.Title>
          {closeButtonColor}
        </Modal.Header>
        <Modal.Body>Purchase 0.01 Dash worth of Dash Platform Credits. (This is enough for many actions on Dash Platform.) </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.handleTopUp}>
            Top Up Identity
          </Button>
          
        </Modal.Footer>
      </Modal>
    );
  }
}

export default TopUpIdentityModal;
