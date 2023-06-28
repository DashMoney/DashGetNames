import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import CloseButton from "react-bootstrap/CloseButton";
import "./SearchForNameModal.css";

const Dash = require("dash");

class SearchForNameModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isError: false,
      nameTaken: false,
      nameAvailable: false,
      searchedName: "",
      validated: true,
      validityCheck: false,
    };
  }

  handleCloseClick = () => {
    this.props.hideModal();
  };

  onChange = (event) => {
    this.setState({
      isError: false,
      isLoading: false,
      nameTaken: false,
      nameAvailable: false,
    });
    if (this.formValidate(event.target.value) === true) {
      event.preventDefault();
      event.stopPropagation();
      this.setState({
        validityCheck: true,
      });
    } else {
      event.preventDefault();
      event.stopPropagation();
      this.setState({
        validityCheck: false,
      });
    }
  };

  searchName = (nameToRetrieve) => {
    let client = new Dash.Client({ network: this.props.whichNetwork });

    const retrieveName = async () => {
      // Retrieve by full name (e.g., myname.dash)

      return client.platform.names.resolve(`${nameToRetrieve}.dash`);
    };

    retrieveName()
      .then((d) => {
        if (d === null) {
          this.setState({
            nameAvailable: true,
            nameTaken: false,
            isLoading: false,
            isError: false,
          });
        } else {
          console.log("Name retrieved:\n", d.toJSON());
          this.setState({
            nameTaken: true,
            nameAvailable: false,
            isLoading: false,
            isError: false,
          });
        }
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);

        this.setState({
          nameTaken: false,
          nameAvailable: false,
          isError: true,
          isLoading: false,
        });
      })
      .finally(() => client.disconnect());
  };

  handleSubmitClick = (event) => {
    event.preventDefault();
    //call the SearchName
    //setState to loading
    //disable button
    let nameToTry = event.target.validationCustom02.value;

    if (this.state.validityCheck) {
      this.setState({
        isLoading: true,
        searchName: event.target.value,
        isError: false,
      });

      if (this.formValidate(nameToTry)) {
        console.log(`A good one: ${nameToTry}`);
        this.searchName(nameToTry);
      } else {
        console.log(`Not a good one: ${nameToTry}`);
        this.setState({
          isLoading: false,
        });
      }
    }
  };

  formValidate = (nameInput) => {
    let regex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]$/;
    let valid = regex.test(nameInput);

    if (valid) {
      this.setState({
        searchedName: nameInput,
      });
      return true;
    } else {
      return false;
    }
  };

  componentDidMount() {
    this.props.collapseTopNav()
   }

  render() {
    let modalBkg = "";
    let closeButtonColor;
    let modalBackdrop;
    
    if(this.props.mode === "primary"){
      modalBackdrop = "modal-backdrop-nochange";
      modalBkg = "modal-backcolor-primary";
      closeButtonColor = <CloseButton onClick={this.handleCloseClick}/>
    }else{
      modalBackdrop = "modal-backdrop-dark";
      modalBkg = "modal-backcolor-dark";
      closeButtonColor = <CloseButton onClick={this.handleCloseClick} variant="white"/>
    }

    return (
      <>
        <Modal contentClassName={modalBkg} backdropClassName={modalBackdrop} show={this.props.isModalShowing}>
          <Modal.Header>
            <Modal.Title><b>Search Name</b></Modal.Title>
            {closeButtonColor}
          </Modal.Header>
          <Modal.Body>
            <Form
              noValidate
              onSubmit={this.handleSubmitClick}
              onChange={this.onChange}
            >
              <Form.Group className="mb-3" controlId="validationCustom02">
                {this.state.isLoading ? (
                  <Form.Control
                    type="text"
                    placeholder={this.state.searchedName}
                    disabled
                  />
                ) : (
                  <Form.Control
                    type="text"
                    placeholder="Enter desired name here..."
                    required
                    isInvalid={!this.state.validityCheck}
                  />
                )}

                <Form.Control.Feedback className="floatLeft" type="invalid">
                  Please use proper naming format
                </Form.Control.Feedback>

                {this.state.isError ? (
                  <Alert variant="warning">
                    Testnet Platform is having difficulties...
                  </Alert>
                ) : (
                  <></>
                )}

                {this.state.nameAvailable ? (
                  <Alert variant="success">
                    {this.state.searchedName} is available to purchase!
                  </Alert>
                ) : (
                  <></>
                )}

                {this.state.nameTaken ? (
                  <Alert variant="danger">
                    {this.state.searchedName} is unavailable.
                  </Alert>
                ) : (
                  <></>
                )}
                {this.state.isLoading ? (
                  <>
                    <p></p>
                    <div id="spinner">
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {/* TEST */}
                {/* {this.state.validityCheck ? (
                  <>
                    <p> </p>
                    <Button variant="primary" type="submit">
                      Check Availabilty
                    </Button>
                  </>
                ) : (
                  <Button disabled variant="primary" type="submit">
                    Check Availabilty
                  </Button>
                )} */}

                <>
                  <p> </p>
                  <Button variant="primary" type="submit">
                    <b>Check Availabilty</b>
                  </Button>
                </>

                <p></p>

                <ul>
                  <li>
                    A name can consist of any combination of letters (UPPERCASE
                    or lowercase) and numbers with one hyphen (-) anywhere in
                    the middle.
                  </li>
                  <li>No spaces are allowed.</li>
                  <li>Length must be between 3 to 63 characters</li>
                </ul>
                {/* <li>
                      Examples
                      <ul>
                        <li>john</li>
                        <li>JohnDoe</li>
                        <li>John-Doe</li>
                        <li>JohnDoe001</li>
                        <li>THEJOHNDOE001</li>
                        <li>JOHN-DOE</li>
                      </ul>
                    </li>
                  </ul>
                  <p>
                    Interesting fact: If you own the name "JohnDoe", no one can
                    purchase any combination of UPPERCASE or lowercase characters
                    that match. Therefore, johndoe, JOHNDOE, johnDoe, etc.. would all be
                    unavailable.
                  </p> */}
              </Form.Group>
            </Form>
            {this.state.nameAvailable ? (
              <div className="d-grid gap-2" id="button-edge">
                <Button
                  variant="primary"
                  onClick={() => {
                    this.props.showModal("ConnectWalletModal");
                  }}
                >
                  <b>Connect Wallet to Purchase</b>
                </Button>
              </div>
            ) : (
              <></>
            )}
          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="primary" onClick={this.handleCloseClick}>
              Close
            </Button> */}
            <p></p>
            <>
              <p>
                If you do not have a wallet, <b>Create New Wallet</b> below.
              </p>

              <Button
                variant="primary"
                onClick={() => {
                  this.props.showModal("CreateNewWalletModal");
                }}
              >
                <b>Create New Wallet</b>
              </Button>
            </>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default SearchForNameModal;
