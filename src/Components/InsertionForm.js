import React, { Component } from 'react';
import { NumericTextBox, Input, Switch } from '@progress/kendo-react-inputs';
import '@progress/kendo-theme-default/dist/all.css';

export default class InsertionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locationName: "",
            publicKey: "",
            privateKey: "",
            gasLimit: 400000
        }
    }

    HandleSubmit(event) {

    }

    HandleNameChange(event){
        this.setState({locationName: event.target.value});
    }

    render() {
        return(
            <div>
                <div>
                <div className="row example-wrapper">
                <div className="col-xs-12 col-sm-6 offset-sm-3 example-col">
                    <div className="card">
                        <div className="card-block">
                            <form className="k-form" onSubmit={this.HandleSubmit}>
                                <fieldset>
                                    <legend>Location Details</legend>

                                    <label className="k-form-field">
                                        <span>Location Name <span className="k-required">*</span></span>
                                        <input className="k-textbox" placeholder="Location Name"/>
                                    </label>
                                    <label className="k-form-field">
                                        <span>Wallet Address <span className="k-required">*</span></span>
                                        <input className="k-textbox" placeholder="Wallet Address" />
                                    </label>
                                </fieldset>

                                <fieldset>
                                    <legend>Transaction Details</legend>

                                    <label className="k-form-field">
                                        <span>Gas Limit <span className="k-field-info">optional</span></span>
                                        <NumericTextBox
                                        format="n"
                                        min={0}
                                        step={1}
                                        defaultValue={400000}
                                        />
                                    </label>
                                    <label className="k-form-field">
                                        <span>Private Key <span className="k-required">*</span></span>
                                        <input type="password" className="k-textbox" placeholder="Private Key"/>
                                    </label>
                                </fieldset>

                                <div className="text-right">
                                <button type="button" className="k-button">Cancel</button> &nbsp;
                                <button type="button" className="k-button k-primary">Submit</button>
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