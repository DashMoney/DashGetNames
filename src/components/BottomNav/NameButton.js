import React from "react";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import Nav from "react-bootstrap/Nav";

class NameButton extends React.Component {
  render() {
    let buttonColor;

    if (this.props.mode === "dark") {
      buttonColor = "primary";
    } else {
      buttonColor = "secondary";
    }

    return (
      
      <Nav.Item>
      {!this.props.isLoadingButtons ? 
        this.props.isMnemonicAvail ? (
          this.props.identityInfo !== '' ? (
            this.props.nameList.length === 0 ? (
              <Nav.Link>
                <Button
                
                  variant={buttonColor}
                  onClick={() => {
                    this.props.showModal("RegisterNameModal");
                  }}
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Name</div>
                  </div>
                  <Badge bg="light" text="dark" pill>
                    Purchase
                  </Badge>
                </Button>
              </Nav.Link>
            ) : (
              <Nav.Link>
                <Button
                
                  variant={buttonColor}
                  onClick={() => {
                    this.props.showModal("RegisterNameAliasModal");
                  }}
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Alias</div>
                  </div>
                  <Badge bg="light" text="dark" pill>
                     Purchase
                  </Badge>
                </Button>
              </Nav.Link>
            )
          ) : (
            <Nav.Link>
              <Button
              
                disabled
                variant={buttonColor}
                // onClick={() => {
                //   this.props.showModal("RegisterNameModal");
                // }}
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Name</div>
                </div>
                <Badge bg="dark" text="light" pill>
                Identity
                </Badge>
              </Button>
            </Nav.Link>
          )
        ) : (
          <Nav.Link>
            <Button
            
              variant={buttonColor}
              onClick={() => {
                this.props.showModal("SearchForNameModal");
              }}
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">Name</div>
              </div>
              <Badge bg="light" text="dark" pill>
                Search
              </Badge>
            </Button>
          </Nav.Link>
        ):(
          <Nav.Link>
              <Button
              
                disabled
                variant={buttonColor}
                
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">Name</div>
                </div>
                <Badge bg="light" text="dark" pill>
                Loading..
                </Badge>
              </Button>
            </Nav.Link>
        )}
        </Nav.Item>
      
    );
  }
}

export default NameButton;
