
import React from "react";
//import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";


class WalletButton extends React.Component {

  render(){
    let buttonColor;
    //let buttonText;
    if(this.props.mode==='dark'){
      buttonColor='primary';
    }else{
      buttonColor='secondary'
    }

    return(
      <Nav.Item>
      { this.props.isMnemonicAvail ?( this.props.accountBalance === 0 ? (
        <Nav.Link>
          
        <Button  variant={buttonColor}
        onClick={()=>this.props.retrieveIdentitiesfromWallet(this.props.mnemonic,this.props.skipSynchronizationBeforeHeight)} >
          <div className="ms-2 me-auto">
          <div className="fw-bold">Wallet</div>
        </div>
        
        <Badge bg="light" text="dark" pill>
          Retry
        </Badge>
        </Button>
    </Nav.Link> )
    : 
        <Nav.Link>
          
            <Button  variant={buttonColor}
            onClick={()=>this.props.showModal('DisconnectWalletModal')} >
              <div className="ms-2 me-auto">
              <div className="fw-bold">Wallet</div>
            </div>
            
            <Badge bg="light" text="dark" pill>
              Disconnect
            </Badge>
            </Button>
        </Nav.Link> )
        : 
        (<Nav.Link>
          <Button
          
            variant={buttonColor}

            onClick={() => {
              this.props.showModal('ConnectWalletModal');
            }}
            >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Wallet</div>
              
            </div>
            <Badge bg="light" text="dark" pill>
              Connect
            </Badge>
          </Button>
        </Nav.Link>)
        }
        </Nav.Item>
    );
  }
}

export default WalletButton;
