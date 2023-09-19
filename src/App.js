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
//import BottomNav from "./components/BottomNav/BottomNav";

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

      isLoggedIn: false,

      //instead of isLoading just combine the others and that will control the flow. and 
      // wallet === 0 && identity === "no identity" -> send funds to wallet
            // display no topup or names
      // wallet !== 0 && identity === 'no identity' -> Register an identity
            // display no topup/credits or names
      // I dont think credits can with 0 with an identity but I can implement the red credits <- 
      //

      //SO INSTEAD OF ISLOADING AND USING A RACE JUST PASS THE FULL LOADING STATE THROUGH WITH THE 5 BELOW AND HANDLE FLOW WITH THEM.
      
      isLoadingIdentity: true, 
      isLoadingIdInfo: true,

      isLoadingName: true,
      isLoadingAlias: true,

      isLoadingWallet: true,

      mode: "dark",
      presentModal: "",
      isModalShowing: false,
      whichNetwork: "testnet",


      mnemonic: "",
      identity: "",  //"no identity" -> handle possiblity -> DONE
      identityRaw: "",
      identityInfo: "",

      uniqueName: '',
      aliasList: [],

      accountBalance: "",
      accountHistory:"",
      accountAddress: "",

      //walletId: "",

      //LocalForageKeys: [], //Platform handles itself <-
      //DashMoneyLFKeys: [],

      //platformLogin: false,

      skipSynchronizationBeforeHeight: 900000, //Shift to 900000 for v0.25 from 855000 for v0.24

      //mostRecentBlockHeight: 900000,
      expandedTopNav: false,

      identityError: false,
      idInfoError: false,
      nameError: false,
      aliasError: false,

      walletError:false, //REMOVE THIS BC GET WALLET AND IDENTITY AT THE SAME TIME AND IDENTITY WILL BE THE ERROR..
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

  // handleLoginforRefreshWallet = () => { //Nothing call this. What is it for?? ->

  //   this.setState({
    //  isLoadingWallet: true,
  //   })

  //   const client = new Dash.Client({
  //     network: this.state.whichNetwork,
  //     wallet: {
  //       mnemonic: this.state.mnemonic,
  //       adapter: LocalForage.createInstance,
  //       unsafeOptions: {
  //         skipSynchronizationBeforeHeight:
  //           this.state.skipSynchronizationBeforeHeight,
  //       },
  //     },
  //   });

  //   const retrieveIdentityIds = async () => {
  //     const account = await client.getWalletAccount();

  //     this.setState({
  //       // accountWallet: client, //Can I use this for the send TX? -> no
  //       accountBalance: account.getTotalBalance(),
  //       accountAddress: account.getUnusedAddress().address,
  //     });

  //     return account;
  //   };

  //   retrieveIdentityIds()
  //     .then((d) => {
  //       //console.log("Wallet Account:\n", d);
  //       this.setState({
  //         isLoadingWallet: false, //Need for Balance ===0, sets true
  //       });
  //     })
  //     .catch((e) => {
  //       console.error("Something went wrong getting Wallet:\n", e);
  //       this.setState({
  //         isLoadingWallet: false, //Need for Balance ===0, sets true
  //       });
  //     })
  //     .finally(() => client.disconnect());
  // };


  triggerNameLoading = () => { 
    this.setState({
      isLoadingName: true,
    });
  };

  triggerAliasLoading = () => { 
    this.setState({
      isLoadingAlias: true,
    });
  };

  //TRIGGER THE LOGIN PROCESS
  handleWalletConnection = (theMnemonic) => {

    this.getWalletAndIdentitywithMnem(theMnemonic);

    this.setState({
      mnemonic: theMnemonic,
      isLoggedIn: true,
    });
  };

  // //Only if LFKeys.length === 0

  // handleNEWWalletConnection = (theMnemonic) => {

  //   this.getWalletIdBeforeLogin(theMnemonic, this.state.mostRecentBlockHeight);

  //   this.setState({
  //     mnemonic: theMnemonic,
  //     isLoggedIn: true,
  //     skipSynchronizationBeforeHeight: this.state.mostRecentBlockHeight,
  //   });
  // };

  handleWalletDisconnect = () => {
    this.setState(
      {
        isLoggedIn: false,
        
        isLoadingIdentity: true, 
        isLoadingIdInfo: true,
  
        isLoadingName: true,
        isLoadingAlias: true,
  
        isLoadingWallet: true,
  
        mode: "dark",
        presentModal: "",
        isModalShowing: false,
        whichNetwork: "testnet",
  
  
        mnemonic: "",
        identity: "",  
        identityRaw: "",
        identityInfo: "",
  
        uniqueName: '',
        aliasList: [],
  
        accountBalance: "",
        accountHistory:"",
        accountAddress: "",
  
        skipSynchronizationBeforeHeight: 900000, 
        expandedTopNav: false,
  
        identityError: false,
        idInfoError: false,
        nameError: false,
        aliasError: false,
  
        walletError:false,
      },
      () => this.componentDidMount()
    );

  };

  componentDidMount() {

    //1) GET WALLETID KEYS For New Wallet Login and Wallet Sync
    //I don't need any of this because the wallet login handles it itself..
    // LocalForage.config({
    //   name: "dashevo-wallet-lib", 
    // });

    // let dashevo = LocalForage.createInstance({
    //   name: "dashevo-wallet-lib",
    // });

    // dashevo.keys()
    //   .then((keys) => {
    //     this.setState({
    //       LocalForageKeys: keys,
    //     });
    //     console.log(keys);
    //   })
    //   .catch(function (err) {
    //     console.log(err);
    //   });

  //****************************** */   
  
  //2) GET WALLETID KEYS FOR OBTAINING IDENTITY

  //  WHEN I INTRODUCE THIS FEATURE GET THE DGM VERSION IT IS DOING WHAT I WANT <- !!!!!!!!!!!!!!!!!!!!! -> 

    // LocalForage.config({
    //   name: "dashmoney-platform-login",
    // });

    // let DashMoneyLF = LocalForage.createInstance({
    //   name: "dashmoney-platform-login",
    // });

    // DashMoneyLF.keys()
    //   .then((keys) => {
    //     this.setState({
    //       DashMoneyLFKeys: keys,
    //     });
    //     console.log(keys);
    //   })
    //   .catch(function (err) {
    //     console.log(err);
    //   });

//****************************** */ 
    //3) GET MOST RECENT BLOCK HEIGHT FOR NEW WALLET LOGIN

    // const clientOpts = {
    //   network: this.state.whichNetwork,
    // };

    // const client = new Dash.Client(clientOpts);

    // const getMostRecentBlockHeight = async () => {
    //   const status = await client.getDAPIClient().core.getStatus();

    //   return status;
    // };

    // getMostRecentBlockHeight()
    //   .then((d) => {
    //     let blockHeight = d.chain.blocksCount;
    //     console.log("Most Recent Block Height:\n", blockHeight);
    //     this.setState({
    //       mostRecentBlockHeight: blockHeight - 2500,
    //     });
    //   })
    //   .catch((e) => {
    //     console.error("Something went wrong:\n", e);
    //   })
    //   .finally(() => client.disconnect());
  }

  getWalletAndIdentitywithMnem = (theMnemonic) => { //gOT FROM DGM
    const client = new Dash.Client({
      network: this.state.whichNetwork,
      wallet: {
        mnemonic: theMnemonic,
        adapter: LocalForage.createInstance,
        unsafeOptions: {
          skipSynchronizationBeforeHeight: this.state.skipSynchronizationBeforeHeight,
        },
      },
    });

    const retrieveIdentityIds = async () => {
      const account = await client.getWalletAccount();

      //console.log(account.getTotalBalance());
      // console.log(account.getUnusedAddress().address);
      //console.log(account.getTransactionHistory());

      this.setState({
        //accountWallet: client, //Can I use this for the send TX?-> NO

        accountBalance: account.getTotalBalance(),
        accountAddress: account.getUnusedAddress().address, //This can be used if you havent created the DGMDocument <-
        //accountHistory: account.getTransactionHistory(),
      });

      return account.identities.getIdentityIds();
    };

    retrieveIdentityIds()
      .then((d) => {
      //  console.log("Mnemonic identities:\n", d);
        if (d.length === 0) {
          this.setState({
            isLoadingIdentity: false,
            isLoadingWallet:false,

            //These are not called so end loading
            isLoadingIdInfo:false,
            isLoadingAlias:false,
            isLoadingName:false,

            identity: "no identity",
          });
        } else {
          this.setState(
            {
              identity: d[0],
              isLoadingIdentity: false,
              isLoadingWallet:false,
              //maintain Loading bc continuing to other functions
            },
            () => this.conductFullLogin(d[0])
          );
        }
      })
      .catch((e) => {
        console.error("Something went wrong getWalletAndIdentitywithMnem:\n", e);
        this.setState({
          identityError: true,
          isLoadingIdentity:false,
        });
      })
      .finally(() => client.disconnect());

  };


  // retrieveIdentitiesfromWallet = (theMnemonic, blockHeight) => {

  //   if (!this.state.isLoading) {//For Wallet Retry <- removed
  //     this.setState({
  //       isLoadingIdentity: true,
  //     });
  //   }

  //   const client = new Dash.Client({
  //     network: this.state.whichNetwork,
  //     wallet: {
  //       mnemonic: theMnemonic,
  //       adapter: LocalForage.createInstance,
  //       unsafeOptions: {
  //         skipSynchronizationBeforeHeight: blockHeight,
  //       },
  //     },
  //   });

  //   const retrieveIdentityIds = async () => {
  //     const account = await client.getWalletAccount();

  //     this.setState({

  //       accountBalance: account.getTotalBalance(),
  //       accountAddress: account.getUnusedAddress().address,
  //     });

  //      //console.log(account);

  //     return account.identities.getIdentityIds();
  //   };

  //   retrieveIdentityIds()
  //     .then((d) => {
  //       console.log("Mnemonic identities:\n", d);
  //       if (d.length === 0) {
  //         this.setState({
  //           isLoadingIdentity:false,
  //           isLoadingWallet:false,
  //           identity:"no identity"
  //         });
  //       } else {
  //         this.setState(
  //           {
  //             isLoadingIdentity:false,
  //             isLoadingWallet:false,
  //             identity: d[0],
  //           },
  //           () => this.conductFullLogin(d[0])
  //         );
  //       }
  //     })
  //     .catch((e) => {
  //       console.error("Something went wrong:\n", e);
  //       this.setState({
  //         identityError: true, //Add handle for error -> 
  //         isLoadingIdentity:false,
  //         isLoadingWallet:false,
  //       });
  //     })
  //     .finally(() => client.disconnect());

    
  //   console.log('Checking Platform Login')
  //     this.checkPlatformOnlyLogin(theMnemonic);
    
  // };

  conductFullLogin = (theIdentity) => {
    // if (!this.state.platformLogin) { //Disconnected bc no platformlogin for now
    //   this.handleLoginAndLFobjectCreate(theIdentity);
    // }

    //THIS SHOULD CALL IDINFO, NAMES, AND ALIASES
    this.getIdentityInfo(theIdentity);
    this.getNamesfromIdentity(theIdentity);
    this.getAliasfromIdentity(theIdentity);
  };

  // checkPlatformOnlyLogin = (theMnemonic) => {
  //   //THIS RUNS IN PARALLEL WITH THE retrieveIdentitiesfromWallet
    
  // let isKeyAvail =this.state.DashMoneyLFKeys.includes(this.state.walletId);
    
  //       console.log(`DashMoney LF Test -> ${isKeyAvail}`);

  //       if (isKeyAvail) {
  //         console.log("Parallel Login");

  //         let DashMoneyLF = LocalForage.createInstance({
  //           name: "dashmoney-platform-login",
  //         });

  //         DashMoneyLF.getItem(this.state.walletId)
  //           .then((val) => {
  //             console.log("Value Retrieved", val);

  //             if (
  //               val !== null ||
  //               typeof val.identity !== "string" ||
  //               val.identity === ""
  //             ) {
  //               this.setState({
  //                 platformLogin: true,
  //                 identity: val.identity,
  //                 walletId: this.state.walletId,
  //               },()=>this.handleLoginQueries(val.identity));
                
  //             } else {
  //               console.log("Local Forage Values Failed");
  //             }
  //           })
  //           .catch((err) => {
  //             console.error(
  //               "Something went wrong getting from localForage:\n",
  //               err
  //             );
  //           });

  //       }
      
  // };

  handleLoginAndLFobjectCreate = (theIdentity) => { //Disconnected
    
    this.getIdentityInfo(theIdentity);
    this.getNamesfromIdentity(theIdentity);

    // if(!this.state.platformLogin){
    //  //CREATE AN OBJECT AND PUT IT IN THERE!!!
    //  let lfObject = {
    //   identity: theIdentity,
    // };

    // let DashMoneyLF = LocalForage.createInstance({
    //   name: "dashmoney-platform-login",
    // });
    // //This is where I save to localForage if walletId is not there.
    // DashMoneyLF.setItem(this.state.walletId, lfObject)
    //   .then((d) => {
    //     //return LocalForage.getItem(walletId);
    //     console.log("Return from LF setitem:", d);
    //   })
    //   .catch((err) => {
    //     console.error("Something went wrong setting to localForage:\n", err);
    //   });
    // //******************** */    
    // }

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
          isLoadingIdInfo: false,
          identityInfo: idInfo,
          identityRaw: d,
          
        });
      }else{
        console.log("No Identity Info retrieved");
        //If I have an identity then there will be something but if there isn't an identity than this is not called? -> 
      }
      })
      .catch((e) => {
        console.error("Something went wrong in retrieving the identityinfo:\n", e);
        this.setState({
          isLoadingIdInfo: false,
          idInfoError: true, //NEED TO HANDLE SO CAN DISPLAY ->
        });
      })
      .finally(() => client.disconnect());
  };


  handleAliases = (aliasToAdd) => {
    if (!this.state.aliasList.includes(aliasToAdd)) {
      this.setState({
        aliasList: [...this.state.aliasList, aliasToAdd],
      });
    }
    this.setState({
      isLoadingAlias: false,
    });
  };

  handleName = (nameToAdd) => {
    this.setState({
      uniqueName: nameToAdd,
      isLoadingName: false,
    });
  };

  getNamesfromIdentity = (theIdentity) => {
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
          this.setState({
            //Should catch the new name and aliases and stop spinner
            isLoadingName: false,
            uniqueName: 'no name'
          });

        } else {
          let nameRetrieved = d[0].toJSON();
          console.log("Name retrieved:\n", nameRetrieved);
          this.setState({
            uniqueName: nameRetrieved.label,
            isLoadingName: false,
          });
        }

      })
      .catch((e) => {
        this.setState({       
          isLoadingName: false,
          nameError: true,
        });
        console.error("Something went wrong getting names:\n", e);
       // this.getAliasfromIdentity(theIdentity);
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
            isLoadingAlias: false,
          });

        } else {

          let aliasesRetrieved = d.map((alias) => {
            console.log("Alias: ", alias.toJSON().label);
            return alias.toJSON().label;
          });
//WHAT AM i DOING THIS FOR AND NOT JUST SETTING IN STATE? -> 
          let filteredAliases = aliasesRetrieved.filter(
            (alias) => !this.state.aliasList.includes(alias)
          );

          this.setState({
            isLoadingAlias: false,
            aliasList: [...this.state.aliasList, ...filteredAliases],
          });
        }
      })  //ADD THE ALIASERROR AND HANDLE AS WELL -> 
      .catch((e) => console.error("Something went wrong with getAlias:\n", e))
      .finally(() => client.disconnect());
  };


// ####  ####  WRITE ACTIONS BELOW  #### ####

  registerIdentity = () => { //REIMPLEMENT LFOBJ CREATE WHEN GET TO THAT POINT <-
    
    this.setState({
      isLoadingIdentity: true,
      isLoadingIdInfo: true,
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
            uniqueName: 'no name', //This sets up the next step
            isLoadingIdentity: false,
            isLoadingIdInfo: false,
            accountBalance: this.state.accountBalance - 1000000,
          }
        );


        // if(!this.state.platformLogin){
        //   //CREATE AN OBJECT AND PUT IT IN THERE!!!
        //   let lfObject = {
        //    identity: idInfo.id,
        //  };
     
        //  let DashMoneyLF = LocalForage.createInstance({
        //    name: "dashmoney-platform-login",
        //  });
        //  //This is where I save to localForage if walletId is not there.
        //  DashMoneyLF.setItem(this.state.walletId, lfObject)
        //    .then((d) => {
        //      //return LocalForage.getItem(walletId);
        //      console.log("Return from LF setitem:", d);
        //    })
        //    .catch((err) => {
        //      console.error("Something went wrong setting to localForage:\n", err);
        //    });
        //  //******************** */    
        //  }


      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          isLoadingIdentity: false,
          isLoadingIdInfo: false,
          identityError:true,
        });
      })
      .finally(() => client.disconnect());
  };

  doTopUpIdentity = (numOfCredits) => {

    this.setState({
      isLoadingIdInfo: true,
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
          isLoadingIdInfo: false,
          accountBalance: this.state.accountBalance - 1000000,
        });
      })
      .catch((e) => {
        console.error("Something went wrong:\n", e);
        this.setState({
          isLoadingIdInfo: false,
          IdInfoError: true, //Add handle for error -> 
        });
      })
      .finally(() => client.disconnect());
  };

  //Name and Alias purchase is done in the modal.

  

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
          isLoggedIn={this.state.isLoggedIn}
          expandedTopNav={this.state.expandedTopNav}
          collapseTopNav={this.collapseTopNav}
          toggleTopNav={this.toggleTopNav}
        />

        <Image fluid="true" id="dash-bkgd" src={DashBkgd} alt="Dash Logo" />

        {!this.state.isLoggedIn ? (
          <LandingPage 
          showModal={this.showModal} 
          mode={this.state.mode} 
          />
        ) : (
          <>
            <ConnectedWalletPage
              
              showModal={this.showModal}
              
              isLoadingIdentity={this.state.isLoadingIdentity}
              isLoadingIdInfo={this.state.isLoadingIdInfo}

              isLoadingName={this.state.isLoadingName}
              isLoadingAlias={this.state.isLoadingAlias}

              isLoadingWallet={this.state.isLoadingWallet}

              identity={this.state.identity}
              identityRaw={this.state.identityRaw}
              identityInfo={this.state.identityInfo}

              uniqueName={this.state.uniqueName}
              aliasList={this.state.aliasList}

              accountBalance={this.state.accountBalance}
              mode={this.state.mode}
            />

            {/* <BottomNav
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
              isMnemonicAvail={this.state.isMnemonicAvail} //REPLACE WITH ISLOGGEDIN
              isLoggedIn={this.state.isLoggedIn}
              handleWalletDisconnect={this.handleWalletDisconnect}
              expandedBottomNav={this.state.expandedBottomNav}
              collapseTopNav={this.collapseTopNav}
            /> */}
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
            triggerNameLoading={this.triggerNameLoading}
            handleName={this.handleName}

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
            collapseTopNav={this.collapseTopNav}
          />
        ) : (
          <></>
        )}

        {this.state.isModalShowing &&
        this.state.presentModal === "RegisterNameAliasModal" ? (
          <RegisterNameAliasModal
            triggerAliasLoading={this.triggerAliasLoading}
            handleAliases={this.handleAliases}

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
