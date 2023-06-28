
import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import CloseButton from 'react-bootstrap/CloseButton';
import "./ConnectToANetworkModal.css";


const Dash = require('dash');
const client = new Dash.Client({ network: 'testnet',
//,
// dapiAddresses: [
//   '34.214.48.68:1443',
//   '35.166.18.166:1443',
//   '35.165.50.126:1443',
//   '52.42.202.128:1443',
//   '52.12.176.90:1443',
//   '44.228.242.181:1443',
//   '35.82.197.197:1443',
//   '52.40.219.41:1443',
//   '44.239.39.153:1443',
// ],
//*********Temporary
// ,
// seeds: [
//   {
//     host: 'seed-2.testnet.networks.dash.org',
//     port: 1443,
//     allowSelfSignedCertificate: true,
//   },
// ],
//*********Temporary
});

class ConnectToANetworkModal extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading:true, 
      response:''
    }
  }

 connect = async () => {
  console.log("BlockHash: ",await client.getDAPIClient().core.getBlockHash(1));
  console.log("BestBlockHash: ", await client.getDAPIClient().core.getBestBlockHash());
  console.log("BlockByHeight: ", await client.getDAPIClient().core.getBlockByHeight(1));

    return await client.getDAPIClient().core.getBestBlockHash();
    
  }


  handleCloseClick=()=>{
    this.props.hideModal();
  }

  componentDidMount() {
    this.connect()
    .then((d) =>{
      console.log("Connected. Best block hash: ", d)
    
    this.setState({
      isLoading:false,
      response:<Alert  variant='success'>
        Connected to Testnet Core! Testnet Platform is possibly operating.
      </Alert>
    })
  })
    .catch((e) => {
      console.log("Not Connected. Error: ", e)

      this.setState({
      isLoading:false,
      response:
      <Alert  variant='warning'>
        Something went wrong. Testnet is probably down.
      </Alert>
    })
  })
    .finally(() => client.disconnect());
  }

  

  render(){
    
    let modalBkg = "";
    let closeButtonColor;
    
    if(this.props.mode === "primary"){
      modalBkg = "modal-backcolor-primary";
      closeButtonColor = <CloseButton onClick={this.handleCloseClick}/>
    }else{
      modalBkg = "modal-backcolor-dark";
      closeButtonColor = <CloseButton onClick={this.handleCloseClick} variant="white"/>
    }
      
      
    return(
      <>
      <Modal
      
       show={this.props.isModalShowing}
       contentClassName={modalBkg}
        >
        <Modal.Header >
          <Modal.Title>Connect to a Network</Modal.Title>
          {closeButtonColor}
        </Modal.Header>
        <Modal.Body>
          {this.state.response}

          {
            this.state.isLoading ? 
            <div id='spinner'>
            <Spinner  animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner></div>: <></>
          }

        </Modal.Body>

        <Modal.Footer>
          
          <Button variant="primary" onClick={this.handleCloseClick}>
            Close
          </Button>
        </Modal.Footer>

      </Modal>
       </> 
    );
  }
}

export default ConnectToANetworkModal;
