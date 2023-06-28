import React from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
//import Dropdown from "react-bootstrap/Dropdown";

import "./ConnectedWalletPage.css";

class ConnectedWalletPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      extraInfo: false,
      IdentityInfo: false,
    };
  }

  handleExtraInfo = () => {
    if (this.state.extraInfo === false)
      this.setState({
        extraInfo: true,
      });
    else {
      this.setState({
        extraInfo: false,
      });
    }
  };

  handleIdentityInfo = () => {
    if (this.state.IdentityInfo === false)
      this.setState({
        IdentityInfo: true,
      });
    else {
      this.setState({
        IdentityInfo: false,
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
    let listofNames = this.props.nameList.map((name, index) => {
      return (
        <li key={index}>
          <b>{name}</b>
        </li>
      );
    });


    let dashAmt = this.props.accountBalance / 100000000;
    let dashAmt2Display = dashAmt.toFixed(3); 

    return (
      <div id="bodytext">
        <h3>
          <Badge bg="primary">Your Connected Wallet</Badge>
        </h3>

        {this.props.isLoading &&
         this.props.accountBalance === 0 &&
         this.props.identity !== "" &&
         this.props.identity !== "Err"? (
              <>
                <p></p>
                <div id="spinner">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
                <p></p>
              </>
            ) : (
              <></>
            )}

        {this.props.accountBalance === 0 && this.props.identity !== "" &&
         this.props.identity !== "Err" ? (
          <>
            <span>
              There appears to be insufficient funds in your wallet.
              <span> </span>
              <Button
                variant="primary"
                onClick={() => {
                  this.props.handleSkipSyncLookBackFurther();
                }}
              >
                <b>Check Again..</b>

                <Badge bg="light" text="dark" pill>
                  Wallet
                </Badge>
              </Button>
            </span>
            <p></p>
            <p>
              {" "}
              This happens on occassion, when you are sure there should be funds
              in your wallet, you just need to look farther back on the
              blockchain. It will just take a little extra time.
            </p>
            <p>
              {" "}
              Press Check Again to search farther back on the blockchain for
              your transactions.
            </p>
            <p></p>
          </>
        ) : (
          <>
            {this.props.accountBalance !== 0 &&
            this.props.accountBalance !== "" &&
            this.props.identity !== "Err" ? (
              <>
                <p> </p>
                <div className="indentStuff">
                  <b>Dash Balance</b>
                  <h4>
                    <b>{dashAmt2Display}</b>
                  </h4>
                </div>
                <p></p>
              </>
            ) : (
              <></>
            )}

            {this.props.isLoading ? (
              <>
                <p></p>
                <div id="spinner">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
                <p></p>
              </>
            ) : (
              <></>
            )}

            <div>
              {!this.props.isLoading &&
              !this.props.isLoadingPlatform &&
              this.props.identity === "" &&
              this.props.accountBalance === 0 ? (
                <div id="bodytext">
                  <p>
                    There are insufficient funds in your wallet. Please use{" "}
                    <span> </span>
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => {
                        this.props.showModal("SendFundsModal");
                      }}
                    >
                      <b>Send Wallet</b>

                      <Badge bg="light" text="dark" pill>
                        Funds
                      </Badge>
                    </Button>
                    <span> </span>
                    and <b>Retry Wallet</b> below.
                  </p>
                  <p></p>
                </div>
              ) : (
                <></>
              )}

         {this.props.identity === "Err"?
         <><p>
         Testnet Platform may be down, please refresh page and try again. Or check the network with <b>Test Connection</b>.
       </p></>
         :
         <></>}

              {!this.props.isLoading &&
              !this.props.isLoadingPlatform &&
              this.props.identityInfo === "" &&
              this.props.identity !== "Err" &&
              this.props.accountBalance !== 0 ? (
                <div id="bodytext">
                  <p>
                    You are ready to
                    <b> Register Identity</b> below to begin name purchasing!
                  </p>
                  {/* <p>
                    If this action doesn't work, Testnet Platform may be down.
                  </p> */}
                </div>
              ) : (
                <></>
              )}
            </div>

            {!this.props.isLoading && this.props.identityInfo !== "" &&
         this.props.identity !== "Err" ? (
              <>
                <p></p>
                <div className="ms-2 me-auto">
                  <div className="id-line ">
                    
                    {/* Insert beginning************** */}
{/* 
                    <Dropdown>
                      <Dropdown.Toggle
                        size="sm"
                        variant="primary"
                        id="dropdown-basic"
                        onClick={() => {
                          this.handleIdentityInfo();
                        }}
                      >
                        <b>Identity</b>
                      </Dropdown.Toggle>
                    </Dropdown>

                    {this.state.IdentityInfo ? (
                      <>
                        <p>{this.props.identityInfo.id}</p>
                      </>
                    ) : (
                      <></>
                    )} */}

                    {/* Insert Ending *******************************/}

                <h5>
                  <Badge className="paddingBadge" bg="primary">
                    Identity
                  </Badge>
                </h5>

                    <p>
                      <Badge className="paddingBadge" bg="primary" pill>
                        {this.props.identityInfo.balance} Credits
                      </Badge>
                    </p>
                  </div>
                  <div className="indentStuff">
                    <h5>
                      {/* This will be singular or plural */}

                      {this.props.nameList.length !== 0 ? (
                        this.props.nameList.length === 1 ? (
                          <Badge bg="primary">Your Dash Name</Badge>
                        ) : (
                          <Badge bg="primary">Your Dash Names</Badge>
                        )
                      ) : (
                        <Badge bg="primary">Your Dash Names</Badge>
                      )}
                    </h5>
                    <ul>
                      {this.props.nameList.length === 0 ? (
                        <p>(Names appear here after purchase)</p>
                      ) : (
                        listofNames
                      )}
                    </ul>
                    {this.props.isLoadingNames ? (
                      <div id="spinner">
                        <p></p>
                        <Spinner animation="border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <p></p>
              </>
            ) : (
              <></>
            )}
          </>
        )}

{!this.props.isLoading && this.props.isLoadingPlatform ? (
              <>
                <p></p>
                <div id="spinner">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
                <p></p>
              </>
            ) : (
              <></>
            )}

        {/* %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% */}

        <div className="positionButton">
        <Button
                  variant={buttonColor}
                  onClick={() => {
                    this.handleExtraInfo();
                  }}
                >
                  <h3>Extra about names</h3>
                </Button>
              
        </div>

        {this.state.extraInfo ? (
          <>
            <p></p>
            <div className="indentStuff">
              <p>
                The <b>first name</b> purchased for an Identity is the{" "}
                <b>dashUniqueIdentityId</b>, and all names purchased after are{" "}
                <b>dashAliasIdentityId</b> or "aliases". But rest assured, be it
                the first name or an alias, it will successfully retrieve your
                identity. (But the Dapps build by DashMoney will focus on the
                DashUniqueIdentityID, so if you want to use a name make sure it
                is the first.)
              </p>
              <p>
                It is recommended that names for an Identity be related. For
                example, JohnDoe (dashUniqueIdentityId), John-Doe
                (dashAliasIdentityId), and JohnDoe007 (dashAliasIdentityId). But
                do not forget, you can always do what you want, it is your Dash.
              </p>
              <p>
                A good practice is for different entities to have separate
                Identities. For example, if the owner of Bob's Burger and
                Chicken Palace purchased the names: BobsBurger and
                ChickenPalace, he should purchase them under different
                Identities.
              </p>
              <p>
                <b>DashGetNames</b> is implemented such that you can only
                purchase a single Identity for your Wallet(mnemonic). This is to
                maintain a simple implementation and not add complexity in the
                future. Currently, there is no trustless way to exchange names
                with others.
              </p>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default ConnectedWalletPage;
