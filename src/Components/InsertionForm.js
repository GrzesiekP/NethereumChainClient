import React, { Component } from 'react';
import InsertionResult from './InsertionResult'
import { NumericTextBox } from '@progress/kendo-react-inputs';
import $ from 'jquery';
import '@progress/kendo-theme-default/dist/all.css';

export default class InsertionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locationName: null,
            isResultSuccess: null,
            lastInsertedTransactionHash: null,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        this.setState({
            locationName: this.refs.locationName.value,
        });
        this.sendPostLocation();
    }

    sendPostLocation = () => {
        var ncUrl = "https://nethereumchain.azurewebsites.net/api/v1/location";
        var payload = JSON.stringify({
            locationName: this.refs.locationName.value,
            userAddress: this.refs.walletAddress.value,
            userPrivateKey: this.refs.privateKey.value,
            gas: this.refs.gasLimit.value
        });

        $.ajax({
            type: 'POST',
            url: ncUrl,
            data: payload,
            Accept : "application/json",
            contentType: "application/json",
            success: this.onInsertionSuccess,
            error: this.onInsertionError
          });
    }

    onInsertionSuccess = (msg, status, jqXHR) => {
        this.setState({
            isResultSuccess: true,
            lastInsertedTransactionHash: msg
        });
    }

    onInsertionError = (response) => {
        this.setState({
            isResultSuccess: false
        });
    }

    render() {
        return(
            <div>
                <div>
                    <div className="row example-wrapper">
                        <div className="col-xs-12 col-sm-6 offset-sm-3 example-col">
                            <div className="card">
                                <div className="card-block">
                                    <InsertionResult 
                                        isResultSuccess={this.state.isResultSuccess} 
                                        locationName={this.state.locationName} 
                                        trxHash={this.state.lastInsertedTransactionHash}
                                    />
                                    <form className="k-form" onSubmit={this.handleSubmit}>
                                        <fieldset>
                                            <legend>Location Details</legend>

                                            <label className="k-form-field">
                                                <span>Location Name <span className="k-required">*</span></span>
                                                <input className="k-textbox" ref="locationName"/>
                                            </label>
                                            <label className="k-form-field">
                                                <span>Wallet Address <span className="k-required">*</span></span>
                                                <input className="k-textbox" ref="walletAddress" value="0x63f287fA7f721BA4CD61Ca376890F3087c539D84" />
                                            </label>
                                        </fieldset>

                                        <fieldset>
                                            <legend>Transaction Details</legend>

                                            <label className="k-form-field">
                                                <span>Gas Limit <span className="k-field-info">optional</span></span>
                                                <NumericTextBox
                                                ref="gasLimit"
                                                format="n"
                                                min={0}
                                                step={1}
                                                defaultValue={400000}
                                                />
                                            </label>
                                            <label className="k-form-field">
                                                <span>Private Key <span className="k-required">*</span></span>
                                                <input className="k-textbox" ref="privateKey" value="8097f22574d1d032a14e8ad75dd313eb1bb2001d0947fb4b697504690f60ec30" />
                                            </label>
                                        </fieldset>

                                        <div className="text-right">
                                            <button type="button" className="k-button">Cancel</button> &nbsp;
                                            <button type="button" className="k-button k-primary" onClick={this.handleSubmit}>Submit</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}