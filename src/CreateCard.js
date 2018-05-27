import React, { Component } from "react";
import web3 from './web3';
import sha256 from 'sha256';
import bytes from 'bytes';
import {
  Button,
  FormGroup, ButtonToolbar,
  FormControl, InputGroup, ControlLabel,
  ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import whiteCardFactory from './web3Contracts/WhiteCardFactory';
import blackCardRegistry from './web3Contracts/BlackCardRegistry';    
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class CreateCard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: '',
      color: "black"
    };
  }

  onSubmit = async (event) => {
     this.setState({value: event.target.value});
  }

  handleTextChange(e) {
    this.setState({value: e.target.value});
  }

  handleColorChange(e) {
    this.setState({color: e})
  }

  getIpfsHash(){

  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();
    if (this.state.color == "black") {
      const ipfsSha = web3.utils.sha3(this.state.value, { encoding: 'hex' })
      await blackCardRegistry.methods.apply(ipfsSha, 10, this.state.value).send({from: accounts[0]});
    } else {
      await whiteCardFactory.methods.addWhiteCard(this.state.value).send({from: accounts[0]});
    }
  }

  render() {
    return (
      <div>
        <div>
          <h1 className="create-card-title">Create Card</h1>
          <form onSubmit={this.handleSubmit.bind(this)}>

            <ButtonToolbar>
              <ToggleButtonGroup type="radio" name="options" onChange={this.handleColorChange.bind(this)} defaultValue={this.state.color}>
                <ToggleButton value={"black"}>Black Card</ToggleButton>
                <ToggleButton value={"white"}>White Card</ToggleButton>
              </ToggleButtonGroup>
            </ButtonToolbar>

            <FormGroup controlId="formControlsTextarea">
              <FormControl
                onChange={this.handleTextChange.bind(this)}
                componentClass="textarea"
                placeholder="Start typing here"
              />
            </FormGroup>

            <Button type="submit">Submit</Button>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateCard;
