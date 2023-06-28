import React from "react";
import Button from "react-bootstrap/Button";
import DGNLandingPage from "../../images/DGNLandingPage.png";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Figure from "react-bootstrap/Figure";

import "./LandingPage.css";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: true,
      howToUseInfo: false,
    };
  }

  handlehowToUseInfo = () => {
    if (this.state.howToUseInfo === false)
      this.setState({
        howToUseInfo: true,
      });
    else {
      this.setState({
        howToUseInfo: false,
      });
    }
  };

  handleAlert = () => {
    if (this.state.showAlert) {
      this.setState({
        showAlert: false,
      });
    }
  };

  render() {
    let buttonColor;

    if (this.props.mode === "primary") {
      buttonColor = "outline-dark";
    } else {
      buttonColor = "outline-light";
    }

    return (
      <>
        <p></p>
        <h4 className="paragraph-shift" id="title-bar">
          <b>Dash, the Evolution is here..</b>
        </h4>

        <p className="paragraph-shift">
          With Dash, you no longer need long cryptic addresses to interact with
          others. But first, you will need a name.
        </p>
        <p></p>
        <div className="d-grid gap-2" id="button-edge">
          <Button
            variant="primary"
            onClick={() => {
                      this.props.showModal('SearchForNameModal');
                    }}
          >
            <b>Search Name Availabilty</b>

            
          </Button>
        </div>
        <p></p>
        {/* <p id="title-bar">or</p> */}

        <div className="d-grid gap-2" id="button-edge">
          <Button
            variant="primary"
            onClick={() => {
                      this.props.showModal('ConnectWalletModal');
                    }}
          >
            <b>Connect Existing Wallet</b>

           
          </Button>
        </div>
        <p></p>

        <Container>
          <Row>
            <Col xs={1} md={3}></Col>
            <Col xs={10} md={6} className="positionCaption">
              <div className="positionCaption">
                <Image
                  fluid
                  rounded
                  id="dash-landing-page"
                  src={DGNLandingPage}
                  alt="Dash Wallet with Name"
                />
                <p></p>
                <Figure.Caption>
                  <b>Dash Name Purchase - Preview</b>
                </Figure.Caption>
              </div>
            </Col>
            <Col xs={1} md={3}></Col>
          </Row>
        </Container>
        <p></p>
        <p className="paragraph-shift">
          If you are a new to "Crypto", welcome to Dash! Dash is like Bitcoin.
          But instead of developers like "Satoshi Nakamoto", we have "Quantum
          Explorer!"
        </p>
        <p></p>
        <div id="bodytext">
          
          
                <Button
                  variant={buttonColor}
                  onClick={() => {
                    this.handlehowToUseInfo();
                  }}
                >
                  <h3>How to Use</h3>
                </Button>
              
            
         

          {this.state.howToUseInfo ? (
            <>
              <p></p>
              <div className="indentStuff">
                <ol>
                <li>
                    <p>
                      Search to see if the name you want is available or connect your existing Dash Wallet.
                    </p>
                  </li>
                  {/* <li>
                    If you are new to Dash, you will need a wallet. You can get
                    one with the <b>New Wallet - Create</b> button above.
                    <p>
                      (Currently, this is all working on Testnet, so it is not
                      real Dash. Also, actions like Identity Register and Name
                      Purchase may take up to 20 seconds so please be patience,
                      it is only Testnet.)
                    </p>
                  </li> */}
                  
                  <li>
                    <p>
                      Once your Wallet is connected, click <b>Register Identity</b> at the bottom of your screen.
                    </p>
                  </li>
                  <li>
                     With your wallet and identity, <b>Purchase your Name</b> and begin the Dash Evolution
                    experience!
                  </li>
                </ol>
              </div>
            </>
          ) : (
            <></>
          )}

          
        </div>
      </>
    );
  }
}

export default LandingPage;
