import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import CloseButton from 'react-bootstrap/CloseButton';

class RegisterIdentityModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isError: false,
    };
  }

  handleCloseClick = () => {
    this.props.hideModal();
  };

  handleClick = (event) => {
    
    this.props.registerIdentity();
    this.props.hideModal();
  };


  render() {
    let modalBkg = "";
    let closeButtonColor;
    
    if(this.props.mode === "primary"){
      modalBkg = "modal-backcolor-primary";
      closeButtonColor = <CloseButton onClick={this.handleCloseClick}/>
    }else{
      modalBkg = "modal-backcolor-dark";
      closeButtonColor = <CloseButton onClick={this.handleCloseClick} variant="white"/>
    }
    return (
      <>
        <Modal show={this.props.isModalShowing}
        contentClassName={modalBkg}>
        <Modal.Header> 
          <Modal.Title>Register Identity</Modal.Title>
          {closeButtonColor}
        </Modal.Header>
        <Modal.Body>
         <p>Registering an Identity from Dash Platform will cost 0.01 Dash from your wallet funds. </p>
         <p>This is for an Identity and Platform Credits which will connect your wallet to Platform and allow you to perform actions like purchasing a name.</p>
         {this.state.isError ? (
                <Alert variant="warning">
                  Testnet Platform is having difficulties...
                </Alert>
              ) : (
                <></>
              )}
        </Modal.Body>

        <Modal.Footer>
        <Button variant="primary" onClick={this.handleClick}>
            Register New Identity
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
    
  }
}

export default RegisterIdentityModal;
