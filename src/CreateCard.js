import React, { Component } from "react";
import web3 from './web3';
import { Button, FormGroup, FormControl, InputGroup, ControlLabel, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
 
class CreateCard extends Component {

  constructor(props) {
    super(props)
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onSubmit = async (event) => {
     this.setState({value: event.target.value});
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <div>
          <h1 className="create-card-title">Create Card</h1>
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}
 
export default CreateCard;