import React from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";

class RegisterIdentButton extends React.Component {
  render() {
    let buttonColor;

    if (this.props.mode === "dark") {
      buttonColor = "primary";
    } else {
      buttonColor = "secondary";
    }

    return (
      <Nav.Item>
        {this.props.isMnemonicAvail && !this.props.isLoading ? (
          this.props.accountBalance!==0 ? (
            <Nav.Link>
              <Button 
                variant={buttonColor}
                onClick={() => {
                  this.props.showModal("RegisterIdentityModal");
                }}
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Identity</div>
                </div>
                <Badge bg="light" text="dark" pill>
                  Register
                </Badge>
              </Button>
            </Nav.Link>
          ) : (
            <Nav.Link>
              <Button 
                variant={buttonColor}
                disabled
                
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Identity</div>
                </div>
                <Badge bg="dark" text="light" pill>
                    Wallet
                  </Badge>
              </Button>
            </Nav.Link>
          )
        ) : (
          <Nav.Link>
            <ButtonGroup vertical>
              <Button  variant={buttonColor} disabled>
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Identity</div>
                </div>
                {this.props.isLoading ? (
                  <Badge bg="light" text="dark" pill>
                    Checking..
                  </Badge>
                ) : (
                  <Badge bg="dark" text="light" pill>
                    Wallet
                  </Badge>
                )}
              </Button>
            </ButtonGroup>
          </Nav.Link>
        )}
      </Nav.Item>
    );
  }
}

export default RegisterIdentButton;
