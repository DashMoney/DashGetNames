
import React from "react";
import DashIcon from "../../images/white-d.svg";
import DashIconBlue from "../../images/blue-d.svg";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import NavLink from "react-bootstrap/NavLink";
import Badge from "react-bootstrap/Badge";
import "./TopNav.css";


class TopNav extends React.Component {
  render() {
    let buttonColor;
    
    if(this.props.mode==='primary'){
      buttonColor='secondary';
    }else{
      buttonColor='primary'
    }

    return (
      <>
        <Navbar expanded={this.props.expandedTopNav}
         className="Top" bg={this.props.mode} variant={this.props.mode} expand="lg">
          <Container>
            <Navbar.Brand>
              
              {this.props.mode === 'primary' ?
                <img
                src={DashIcon}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="Dash logo"
              />:
              <img
                src={DashIconBlue}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="Dash logo"
              />
              }
              {"   "}
              {this.props.mode === 'primary' ?
                
                <b className="lightMode">DashGetNames</b>
                
                : 
                <b>DashGetNames</b>
               
                
              }
              
            </Navbar.Brand>
            <div>
            <Form>
              <Form.Check type="switch" id="custom-switch" label=""
              onChange={()=> this.props.handleMode()} />
            </Form>
            {/* 🌜 */}
            </div>
            

            <Navbar.Toggle onClick={()=>this.props.toggleTopNav()}
            aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">

                <Dropdown as={NavLink}>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Testnet
                  </Dropdown.Toggle>

                  <Dropdown.Menu 
                  variant={this.props.mode}>
                    <Dropdown.Item as="button" id="testnet-dropdown">
                      Testnet
                    </Dropdown.Item>
                    <Dropdown.Item as="button" id="mainnet-tab" disabled>
                      Mainnet - Coming Soon
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                

                <Nav.Link>
                  <Button
                    variant={buttonColor}
                    onClick={() => {
                      this.props.showModal('ConnectToANetworkModal');
                    }}
                  >
                    Test Connection
                  </Button>
                </Nav.Link>


                {this.props.isMnemonicAvail ? (
                  <>
                  {this.props.accountBalance === 0 && this.props.identity === '' ? 
                  <Nav.Link>
                  <Button
                    variant={buttonColor}
                    onClick={() => {
                      this.props.showModal("DisconnectWalletModal");
                    }}
                  >
                    Connected
                    <Badge
                      className="createwalletbtn"
                      bg="light"
                      text="dark"
                      pill
                    >
                      Log Out
                    </Badge>
                  </Button>
                </Nav.Link>
                :
                <Nav.Link>
                  <Button
                    variant={buttonColor}
                    onClick={() => {
                      this.props.showModal("SendFundsModal");
                    }}
                  >
                    Send Funds
                    <Badge
                      className="createwalletbtn"
                      bg="light"
                      text="dark"
                      pill
                    >
                      Wallet
                    </Badge>
                  </Button>
                </Nav.Link>
                }</>
                ) : (
                  <Nav.Link>
                    <Button
                      variant={buttonColor}
                      onClick={() => {
                        this.props.showModal('CreateNewWalletModal');
                      }}
                    >
                      New Wallet
                      <Badge
                        className="createwalletbtn"
                        bg="light"
                        text="dark"
                        pill
                      >
                        Create
                      </Badge>
                    </Button>
                  </Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}
export default TopNav;
