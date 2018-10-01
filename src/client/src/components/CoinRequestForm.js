import React from 'react';
import spinnerImg from './spinner.gif';
import './CoinRequestForm.css';
import CoinDispenserClient from '../services/CoinDispenserClient';

class CoinRequestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      requesting: false,
      displayResult: false,
      result: {
        id: null,
        amount: null
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      address: event.target.value,
      displayResult: false,
      requesting: false
    });
  }

  handleSubmit(event) {
    this.setState({
      requesting: true
    });

    CoinDispenserClient.transfer(this.state.address).then(
      result => this.processRequestResult(result)
    );
    event.preventDefault();
  }

  processRequestResult(result) {
    this.setState({
      requesting: false,
      displayResult: true,
      result: result.data
    });
  } 

  renderResult() {
    let result = null;
    if(this.state.displayResult) {
      result = (
        <div className="FormResult">
          <strong>
            It was transferred {this.state.result.amount / 1e8} tbtc to your wallet!
          </strong>
          <div className="FormResultContent">
            <p>ID: {this.state.result.id}</p>
          </div>
        </div>
      );
    }
    return result;
  }

  renderSpinner() {
    let spinner = null;
    if(this.state.requesting) {
      spinner = (
        <img src={spinnerImg} className="Spinner" alt="Loading"/>
      );
    }
    return spinner;
  }

  render() {
    return (
      <div className="RequestForm"> 
        <div>What is your wallet address?</div>
        <form onSubmit={this.handleSubmit}>
          <label className="FormLabel">
            <input type="text" className="FormInput" value={this.state.address} onChange={this.handleChange} />
          </label>
          <input type="submit"
                 value="Request"
                 className="SubmitInput"
                 disabled={this.state.requesting || !this.state.address.length}
          />
        </form>
        { this.renderSpinner() }
        { this.renderResult() }
      </div>
    );
  }
}

export default CoinRequestForm;
