
import React from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";

class TopUpButton extends React.Component {

  render(){
    let buttonColor;
    
    if(this.props.mode==='dark'){
      buttonColor='primary';
    }else{
      buttonColor='secondary'
    }

    return(
      <Nav.Item>
      {!this.props.isLoadingButtons ? 
         this.props.isMnemonicAvail ? (
        (this.props.identityInfo === '') ? (
          <Nav.Link>
                <Button 
                  disabled
                  variant={buttonColor}
                  onClick={() => {
                    this.props.showModal('TopUpIdentityModal');
                  }}
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Identity</div>
                    
                  </div>
                  <Badge bg="light" text="dark" pill>
                    Top Up
                  </Badge>
                </Button>
              </Nav.Link>)
              :
              (<Nav.Link>
                <Button 
                  variant={buttonColor}
                  onClick={() => {
                    this.props.showModal('TopUpIdentityModal');
                  }}
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Identity</div>
                    
                  </div>
                  <Badge bg="light" text="dark" pill>
                    Top Up
                  </Badge>
                </Button>
              </Nav.Link>)
            ) : (
              <Nav.Link>
                <ButtonGroup vertical>
                  <Button  variant={buttonColor} disabled>
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">Identity</div>
                    </div>
                    <Badge bg="dark" text="light" pill>
                      Requires Wallet
                  
                  </Badge>
                  </Button>
                </ButtonGroup>
              </Nav.Link>
            ) : (
              <Nav.Link>
                <ButtonGroup vertical>
                  <Button  variant={buttonColor} disabled>
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">Identity</div>
                    </div>
                    <Badge bg="light" text="dark" pill>
                      Loading..
                  
                  </Badge>
                  </Button>
                </ButtonGroup>
              </Nav.Link>
            )}

        </Nav.Item>
    );
  }
}

export default TopUpButton;
