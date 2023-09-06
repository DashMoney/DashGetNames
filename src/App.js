import React from "react";
import LocalForage from "localforage";

import DashBkgd from "./images/dash_digital-cash_logo_2018_rgb_for_screens.png";
import Image from "react-bootstrap/Image";

import ConnectToANetworkModal from "./components/TopNav/ConnectToANetworkModal";

import ConnectWalletModal from "./components/BottomNav/ConnectWalletModal";
import DisconnectWalletModal from "./components/BottomNav/DisconnectWalletModal";
import RegisterIdentityModal from "./components/BottomNav/RegisterIdentityModal";
import TopUpIdentityModal from "./components/BottomNav/TopUpIdentityModal";
import SearchForNameModal from "./components/BottomNav/SearchForNameModal";
import RegisterNameModal from "./components/BottomNav/RegisterNameModal";
import RegisterNameAliasModal from "./components/BottomNav/RegisterNameAliasModal";

import TopNav from "./components/TopNav/TopNav";
import BottomNav from "./components/BottomNav/BottomNav";

import LandingPage from "./components/Pages/LandingPage";

import Footer from "./components/Footer";

import "./App.css";

import CreateNewWalletModal from "./components/TopNav/CreateNewWalletModal";
import SendFundsModal from "./components/TopNav/SendFundsModal";
import ConnectedWalletPage from "./components/Pages/ConnectedWalletPage";

const Dash = require("dash");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isLoadingNames: false,
      isLoadingButtons: false,
      isLoadingPlatform:false,

      mode: "dark",
      presentModal: "",
      isModalShowing: false,
      whichNetwork: "testnet",
      isMnemonicAvail: false,
      isIdentitiesAvail: false,
      isNamesAvail: false,
      mnemonic: "",
      identity: "",
      identityRaw: "",
      identityInfo: "",
      nameList: [],

      accountBalance: "",
      accountAddress: "",

      accountState: "", //TEST Save account to state
      clientState: '', //TEST

      walletId: "",

      LocalForageKeys: [],
      DashMoneyLFKeys: [],

      platformLogin: false,

      skipSynchronizationBeforeHeight: 900000, //Shift to 900000 for v0.25 from 855000 for v0.24

      mostRecentBlockHeight: 900000,
      expandedTopNav: false,
    };
  }


  collapseTopNav = () => {
    this.setState({ expandedTopNav: false });
  };

  toggleTopNav = () => {
    if (this.state.expandedTopNav) {
      this.setState({ expandedTopNav: false });
    } else {
      this.setState({
        expandedTopNav: true,
      });
    }
  };

  hideModal = () => {
    this.setState({
      isModalShowing: false,
    });
  };

  showModal = (modalName) => {
    this.setState({
      presentModal: modalName,
      isModalShowing: true,
    });
  };

  handleMode = () => {
    if (this.state.mode === "primary")
      this.setState({
        mode: "dark",
      });
    else {
      this.setState({
        mode: "primary",
      });
    }
  };

  handleSkipSyncLookBackFurther = () => {
    this.setState(
      {
        skipSynchronizationBeforeHeight:
          this.state.skipSynchronizationBeforeHeight - 10000,
        isLoading: true, // Need because Balance ===0 hides all the other spinners
      },
      () => this.handleLoginforRefreshWallet()
    );
  };

  handleLoginforRefreshWallet = () => {
    const client = new Dash.Client({
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
    });

    const retrieveIdentityIds = async () => {
      const account = await client.getWalletAccount();

      this.setState({
        // accountWallet: client, //Can I use this for the send TX? -> no
        accountBalance: account.getTotalBalance(),
        accountAddress: account.getUnusedAddress().address,
      });

      return account;
    };

    retrieveIdentityIds()
      .then((d) => {
        //console.log("Wallet Account:\n", d);
        this.setState({
          isLoading: false, //Need for Balance ===0, sets true
        });
      })
      .catch((e) => {
        console.error("Something went wrong getting Wallet:\n", e);
        this.setState({
          isLoading: false, //Need for Balance ===0, sets true
        });
      })
      .finally(() => client.disconnect());
  };

  triggerButtonLoading = () => {
    this.setState({
      isLoadingButtons: true,
    });
  };

  triggerNameLoading = () => {
    this.setState({
      isLoadingNames: true,
    });
  };

  //TRIGGER THE LOGIN PROCESS
  handleWalletConnection = (theMnemonic) => {

    this.getWalletIdBeforeLogin(theMnemonic, this.state.skipSynchronizationBeforeHeight);

    this.setState({
      mnemonic: theMnemonic,
      isMnemonicAvail: true,
      isLoading: true,
      isLoadingPlatform: true,
    });
  };

  //Only if LFKeys.length === 0
  handleNEWWalletConnection = (theMnemonic) => {

    this.getWalletIdBeforeLogin(theMnemonic, this.state.mostRecentBlockHeight);

    this.setState({
      mnemonic: theMnemonic,
      isMnemonicAvail: true,
      isLoading: true,
      isLoadingPlatform: true,
      skipSynchronizationBeforeHeight: this.state.mostRecentBlockHeight,
    });
  };

  handleWalletDisconnect = () => {
    this.setState(
      {
        isLoading: false,
        isLoadingNames: false,
        isLoadingButtons: false,
        isLoadingPlatform: false,
        presentModal: "",
        isModalShowing: false,
        isMnemonicAvail: false,
        isIdentitiesAvail: false,
        isNamesAvail: false,
        mnemonic: "",
        identity: "",
        identityRaw: "",
        identityInfo: "",
        nameList: [],
        accountBalance: "",
        accountAddress: "",

        walletId: "",
        LocalForageKeys: [],
        skipSynchronizationBeforeHeight: 855000,
        mostRecentBlockHeight: 855000,
        expandedTopNav: false,
      },
      () => this.componentDidMount()
    );

  };

  componentDidMount() {

    //1) GET WALLETID KEYS For New Wallet Login and Wallet Sync
    LocalForage.config({
      name: "dashevo-wallet-lib", 
    });

    let dashevo = LocalForage.createInstance({
      name: "dashevo-wallet-lib",
    });

    dashevo.keys()
      .then((keys) => {
        this.setState({
          LocalForageKeys: keys,
        });
        console.log(keys);
      })
      .catch(function (err) {
        console.log(err);
      });

  //****************************** */   
  
  //2) GET WALLETID KEYS FOR OBTAINING IDENTITY

    LocalForage.config({
      name: "dashmoney-platform-login",
    });

    let DashMoneyLF = LocalForage.createInstance({
      name: "dashmoney-platform-login",
    });

    DashMoneyLF.keys()
      .then((keys) => {
        this.setState({
          DashMoneyLFKeys: keys,
        });
        console.log(keys);
      })
      .catch(function (err) {
        console.log(err);
      });

//****************************** */ 
    //3) GET MOST RECENT BLOCK HEIGHT FOR NEW WALLET LOGIN

    const clientOpts = {
      network: this.state.whichNetwork,
    };

    const client = new Dash.Client(clientOpts);

    const getMostRecentBlockHeight = async () => {
      const status = await client.getDAPIClient().core.getStatus();

      return status;
    };

    getMostRecentBlockHeight()
      .then((d) => {
        let blockHeight = d.chain.blocksCount;
        console.log("Most Recent Block Height:\n", blockHeight);
        this.setState({
          mostRecentBlockHeight: blockHeight - 2500,
        });
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
      })
      .finally(() => client.disconnect());
  }

  getWalletIdBeforeLogin = (theMnemonic,skipHeight) => {

    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: theMnemonic,
        offlineMode: true,
      },
    };
    const client = new Dash.Client(clientOpts);

    const createWallet = async () => {
      const account = await client.getWalletAccount();
      
      console.log("walletId:", account.walletId);
      return account.walletId;
    };

    createWallet()
      .then((d) => {
        this.setState({
          walletId: d,
        },()=>this.retrieveIdentitiesfromWallet(theMnemonic, skipHeight));
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  }

  retrieveIdentitiesfromWallet = (theMnemonic, blockHeight) => {

    if (!this.state.isLoading) {//For Wallet Retry 
      this.setState({
        isLoading: true,
      });
    }

    const client = new Dash.Client({
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: theMnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight: blockHeight,
        },
      },
    });

    const retrieveIdentityIds = async () => {
      const account = await client.getWalletAccount();

      this.setState({

        accountBalance: account.getTotalBalance(),
        accountAddress: account.getUnusedAddress().address,
      });

       //console.log(account);

      return account.identities.getIdentityIds();
    };

    retrieveIdentityIds()
      .then((d) => {
        console.log("Mnemonic identities:\n", d);
        if (d.length === 0) {
          this.setState({
            isLoading: false,
            isLoadingPlatform:false,
            isIdentitiesAvail: true,
          });
        } else {
          this.setState(
            {
              isIdentitiesAvail: true,
              isLoading: false,
              identity: d[0],
            },
            () => this.conductFullLogin(d[0])
          );
        }
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          identity: 'Err',
          isLoading: false,
        });
      })
      .finally(() => client.disconnect());

    
    console.log('Checking Platform Login')
      this.checkPlatformOnlyLogin(theMnemonic);
    
  };

  conductFullLogin = (theIdentity) => {
    if (!this.state.platformLogin) {
      this.handleLoginQueries(theIdentity);
    }
  };

  checkPlatformOnlyLogin = (theMnemonic) => {
    //THIS RUNS IN PARALLEL WITH THE retrieveIdentitiesfromWallet
    
  let isKeyAvail =this.state.DashMoneyLFKeys.includes(this.state.walletId);
    
        console.log(`DashMoney LF Test -> ${isKeyAvail}`);

        if (isKeyAvail) {
          console.log("Parallel Login");

          let DashMoneyLF = LocalForage.createInstance({
            name: "dashmoney-platform-login",
          });

          DashMoneyLF.getItem(this.state.walletId)
            .then((val) => {
              console.log("Value Retrieved", val);

              if (
                val !== null ||
                typeof val.identity !== "string" ||
                val.identity === ""
              ) {
                this.setState({
                  platformLogin: true,
                  identity: val.identity,
                  walletId: this.state.walletId,
                },()=>this.handleLoginQueries(val.identity));
                
              } else {
                console.log("Local Forage Values Failed");
              }
            })
            .catch((err) => {
              console.error(
                "Something went wrong getting from localForage:\n",
                err
              );
            });

        }
      
  };

  handleLoginQueries = (theIdentity) => { 
    console.log("Called handleLoginQueries");
    this.getIdentityInfo(theIdentity);
    this.getNamesfromIdentities(theIdentity);

    if(!this.state.platformLogin){
     //CREATE AN OBJECT AND PUT IT IN THERE!!!
     let lfObject = {
      identity: theIdentity,
    };

    let DashMoneyLF = LocalForage.createInstance({
      name: "dashmoney-platform-login",
    });
    //This is where I save to localForage if walletId is not there.
    DashMoneyLF.setItem(this.state.walletId, lfObject)
      .then((d) => {
        //return LocalForage.getItem(walletId);
        console.log("Return from LF setitem:", d);
      })
      .catch((err) => {
        console.error("Something went wrong setting to localForage:\n", err);
      });
    //******************** */    
    }

  };

  getIdentityInfo = (theIdentity) => {
    console.log("Called get identity info");

    const client = new Dash.Client({
      network: this.state.whichNetwork,
    });

    const retrieveIdentity = async () => {
      return client.platform.identities.get(theIdentity); // Your identity ID
    };

    retrieveIdentity()
      .then((d) => {
        if(d !== null){
        console.log("Identity retrieved:\n", d.toJSON());
        let idInfo = d.toJSON();
        this.setState({
          identityInfo: idInfo,
          identityRaw: d,
          
          //isLoading: false, //Remove from here and put in names -> BC names should take longer...
        });
      }else{
        console.log("No Identity Info retrieved");
      }
      })
      .catch((e) => {
        console.error("Something went wrong in retrieving the identity:\n", e);
        this.setState({
          isLoading: false,
          identityInfo: "Error", //NEED TO HANDLE SO CAN DISPLAY ->
        });
      })
      .finally(() => client.disconnect());
  };

  handleNames = (nameToAdd) => {
    if (!this.state.nameList.includes(nameToAdd)) {
      this.setState({
        nameList: [...this.state.nameList, nameToAdd],
      });
    }
    this.setState({
      //Should catch the new name and aliases and stop spinner
      isLoadingNames: false,
      isLoadingButtons: false,
    });
  };

  getNamesfromIdentities = (theIdentity) => {
    const client = new Dash.Client({ network: this.state.whichNetwork });

    const retrieveNameByRecord = async () => {
      // Retrieve by a name's identity ID
      return client.platform.names.resolveByRecord(
        "dashUniqueIdentityId",
        theIdentity // Your identity ID
      );
    };

    retrieveNameByRecord()
      .then((d) => {
        if (d.length === 0) {
          console.log("There are no Names.");
        } else {
          let nameRetrieved = d[0].toJSON();
          console.log("Name retrieved:\n", nameRetrieved);
          this.handleNames(nameRetrieved.label);
        }

        this.getAliasfromIdentity(theIdentity);
      })
      .catch((e) => {
        this.setState({       
          isLoading: false,
        });
        console.error("Something went wrong:\n", e);
        console.log("There is no dashUniqueIdentityId to retrieve");
        this.getAliasfromIdentity(theIdentity);
      })
      .finally(() => client.disconnect());
  };

  getAliasfromIdentity = (theIdentity) => {
    const client = new Dash.Client({ network: this.state.whichNetwork });

    const retrieveNameByRecord = async () => {
      // Retrieve by a name's identity ID
      return client.platform.names.resolveByRecord(
        "dashAliasIdentityId",
        theIdentity // Your identity ID
      );
    };

    retrieveNameByRecord()
      .then((d) => {
        if (d.length === 0) {
          console.log("There are no Aliases.");
          this.setState({
            isLoading: false,
            isLoadingPlatform: false,
          });
        } else {
          let aliasesRetrieved = d.map((alias) => {
            console.log("Alias: ", alias.toJSON().label);
            return alias.toJSON().label;
          });

          let filteredAliases = aliasesRetrieved.filter(
            (alias) => !this.state.nameList.includes(alias)
          );
          this.setState({
            isLoading: false,
            nameList: [...this.state.nameList, ...filteredAliases],
          });
        }
      })
      .catch((e) => console.error("Something went wrong:\n", e))
      .finally(() => client.disconnect());
  };

  registerIdentity = () => {
    
    this.setState({
      isLoading: true,
    });


    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight: this.state.skipSynchronizationBeforeHeight,
        },
      },
    };

    const client = new Dash.Client(clientOpts);


    const createIdentity = async () => {
      return client.platform.identities.register();
    };

    createIdentity()
      .then((d) => {
        console.log("Registered Identity:\n", d.toJSON());
        let idInfo = d.toJSON();
        this.setState(
          {
            identity: idInfo.id,
            identityInfo: idInfo,
            identityRaw: d,
            isLoading: false,
            accountBalance: this.state.accountBalance - 1000000,
          }
        );
        if(!this.state.platformLogin){
          //CREATE AN OBJECT AND PUT IT IN THERE!!!
          let lfObject = {
           identity: idInfo.id,
         };
     
         let DashMoneyLF = LocalForage.createInstance({
           name: "dashmoney-platform-login",
         });
         //This is where I save to localForage if walletId is not there.
         DashMoneyLF.setItem(this.state.walletId, lfObject)
           .then((d) => {
             //return LocalForage.getItem(walletId);
             console.log("Return from LF setitem:", d);
           })
           .catch((err) => {
             console.error("Something went wrong setting to localForage:\n", err);
           });
         //******************** */    
         }
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          isLoading: false,
        });
      })
      .finally(() => client.disconnect());
  };

  doTopUpIdentity = (numOfCredits) => {
    this.setState({
      isLoading: true,
      isLoadingButtons: true,
    });
    const clientOpts = {
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: this.state.mnemonic, 
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight:
            this.state.skipSynchronizationBeforeHeight,
        },
      },
    };
    const client = new Dash.Client(clientOpts);

    const topupIdentity = async () => {
      const identityId = this.state.identity; // Your identity ID
      const topUpAmount = numOfCredits; // Number of duffs ie 1000

      await client.platform.identities.topUp(identityId, topUpAmount);
      return client.platform.identities.get(identityId);
    };

    topupIdentity()
      .then((d) => {
        console.log("Identity credit balance: ", d.balance);
        this.setState({
          identityInfo: d.toJSON(),
          identityRaw: d,
          isLoading: false,
          isLoadingButtons: false,
          accountBalance: this.state.accountBalance - 1000000,
        });
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          isLoading: false,
          isLoadingButtons: false,
        });
      })
      .finally(() => client.disconnect());
  };

  //Test

  render() {

    this.state.mode === "primary"
      ? (document.body.style.backgroundColor = "rgb(280,280,280)")
      : (document.body.style.backgroundColor = "rgb(20,20,20)");

    this.state.mode === "primary"
      ? (document.body.style.color = "black")
      : (document.body.style.color = "white");

    return (
      <>
        <TopNav
          accountBalance={this.state.accountBalance}
          identity={this.state.identity}
          handleMode={this.handleMode}
          mode={this.state.mode}
          showModal={this.showModal}
          whichNetwork={this.state.whichNetwork}
          isMnemonicAvail={this.state.isMnemonicAvail}
          expandedTopNav={this.state.expandedTopNav}
          collapseTopNav={this.collapseTopNav}
          toggleTopNav={this.toggleTopNav}
        />

        <Image fluid="true" id="dash-bkgd" src={DashBkgd} alt="Dash Logo" />

        {!this.state.isMnemonicAvail ? (
          <LandingPage showModal={this.showModal} mode={this.state.mode} />
        ) : (
          <>
            <ConnectedWalletPage
              handleSkipSyncLookBackFurther={this.handleSkipSyncLookBackFurther}
              showModal={this.showModal}
              isLoading={this.state.isLoading}
              isLoadingNames={this.state.isLoadingNames}
              isLoadingPlatform={this.state.isLoadingPlatform}
              identity={this.state.identity}
              identityInfo={this.state.identityInfo}
              nameList={this.state.nameList}
              accountBalance={this.state.accountBalance}
              mode={this.state.mode}
            />

            <BottomNav
              retrieveIdentitiesfromWallet={this.retrieveIdentitiesfromWallet}
              accountBalance={this.state.accountBalance}
              nameList={this.state.nameList}
              isLoading={this.state.isLoading}
              isLoadingButtons={this.state.isLoadingButtons}
              mode={this.state.mode}
              mnemonic={this.state.mnemonic}
              skipSynchronizationBeforeHeight={this.state.skipSynchronizationBeforeHeight}
              identity={this.state.identity}
              identityInfo={this.state.identityInfo}
              showModal={this.showModal}
              isMnemonicAvail={this.state.isMnemonicAvail}
              handleWalletDisconnect={this.handleWalletDisconnect}
              expandedBottomNav={this.state.expandedBottomNav}
              collapseTopNav={this.collapseTopNav}
            />
          </>
        )}

        <Footer />

        {this.state.isModalShowing &&
        this.state.presentModal === "ConnectToANetworkModal" ? (
          <ConnectToANetworkModal
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "CreateNewWalletModal" ? (
          <CreateNewWalletModal
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            collapseTopNav={this.collapseTopNav}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "SendFundsModal" ? (
          <SendFundsModal
            isModalShowing={this.state.isModalShowing}
            accountAddress={this.state.accountAddress}
            hideModal={this.hideModal}
            mode={this.state.mode}
            collapseTopNav={this.collapseTopNav}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "ConnectWalletModal" ? (
          <ConnectWalletModal
            LocalForageKeys={this.state.LocalForageKeys}
            showModal={this.showModal}
            isModalShowing={this.state.isModalShowing}
            handleNEWWalletConnection={this.handleNEWWalletConnection}
            handleWalletConnection={this.handleWalletConnection}
            hideModal={this.hideModal}
            mode={this.state.mode}
            collapseTopNav={this.collapseTopNav}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "DisconnectWalletModal" ? (
          <DisconnectWalletModal
            isModalShowing={this.state.isModalShowing}
            handleWalletDisconnect={this.handleWalletDisconnect}
            hideModal={this.hideModal}
            mode={this.state.mode}
            collapseTopNav={this.collapseTopNav}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "RegisterIdentityModal" ? (
          <RegisterIdentityModal
            isModalShowing={this.state.isModalShowing}
            registerIdentity={this.registerIdentity}
            hideModal={this.hideModal}
            mode={this.state.mode}
            skipSynchronizationBeforeHeight={
              this.state.skipSynchronizationBeforeHeight
            }
            whichNetwork={this.state.whichNetwork}
            collapseTopNav={this.collapseTopNav}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "TopUpIdentityModal" ? (
          <TopUpIdentityModal
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            doTopUpIdentity={this.doTopUpIdentity}
            collapseTopNav={this.collapseTopNav}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "SearchForNameModal" ? (
          <SearchForNameModal
            showModal={this.showModal}
            whichNetwork={this.state.whichNetwork}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            collapseTopNav={this.collapseTopNav}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "RegisterNameModal" ? (
          <RegisterNameModal
            triggerButtonLoading={this.triggerButtonLoading}
            triggerNameLoading={this.triggerNameLoading}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            identity={this.state.identity}
            identityRaw={this.state.identityRaw}
            mnemonic={this.state.mnemonic}
            whichNetwork={this.state.whichNetwork}
            skipSynchronizationBeforeHeight={
              this.state.skipSynchronizationBeforeHeight
            }
            handleNames={this.handleNames}
            collapseTopNav={this.collapseTopNav}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "RegisterNameAliasModal" ? (
          <RegisterNameAliasModal
            triggerButtonLoading={this.triggerButtonLoading}
            triggerNameLoading={this.triggerNameLoading}
            isModalShowing={this.state.isModalShowing}
            hideModal={this.hideModal}
            mode={this.state.mode}
            identity={this.state.identity}
            identityRaw={this.state.identityRaw}
            mnemonic={this.state.mnemonic}
            whichNetwork={this.state.whichNetwork}
            skipSynchronizationBeforeHeight={
              this.state.skipSynchronizationBeforeHeight
            }
            handleNames={this.handleNames}
            collapseTopNav={this.collapseTopNav}
          />
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default App;
