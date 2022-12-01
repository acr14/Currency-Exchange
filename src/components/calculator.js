import React from "react";
import parse from 'html-react-parser';
import { eventWrapper } from "@testing-library/user-event/dist/utils";


class Calculator extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            "bpi": {},
			"exchangeActivated": false,
			"fromCurrency": "BTC",
			"toCurrency": "USD",
			"amount": null,
            "transferTotal": null
        };

        this.handleFromCurrency = this.handleFromCurrency.bind(this);
        this.handleToCurrency = this.handleToCurrency.bind(this);
        this.handleAmount = this.handleAmount.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    /*
     * @desc Handle changes coming from the starting currency form input. On change toCurrency state.
     */
	handleToCurrency(event) {
		let value = event.target.value;
		this.setState({
			toCurrency: value
		})
	};

    /*
     * @desc Handle changes coming from the ending currency form input. On change fromCurrency state.
     */
	handleFromCurrency(event) {
		let value = event.target.value;
		this.setState({
			fromCurrency: value
		})
	};

    /*
     * @desc Handle changes made to the transfer amount form input. On change set state property "amount"
    */
    handleAmount(event) {
        event.preventDefault();
        let value = event.target.value;
        this.setState({
            amount: value
        });
    };

    /*
     * @desc Handle form submission calling calculate form and setting state property "transferTotal".
    */
    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            transferTotal: this.calculate()
        })
    };

    /*
    * @desc Handles the calculation of the currency exchange. I.e. BTC to USD
    * @returns Returns: Number - The new converted value in the target currency.
    */
    calculate = () => {
        const from = this.state.fromCurrency;
        const to = this.state.toCurrency;
        const amt = this.state.amount;

        if (from === "BTC" || to === "BTC") {
            if (from === "BTC") {
                return Math.round((amt * this.props.bpi[to].rate_float)*100)/100;
            } else {
                return Math.round((amt / this.props.bpi[from].rate_float)*100)/100;
            }
        } else {
            const transferRate = this.props.bpi[to].rate_float/this.props.bpi[from].rate_float;
            return Math.round(transferRate*amt*100)/100
        }
    };

    
    render() {
        return (
            <>
            <div className="row">
                <form onSubmit={this.handleSubmit}>
                    <div className="row text-center">
                        <div className="col-lg-4 order-1 order-lg-1">
                            <span className="row justify-content-center">
                                <label>Starting Currency</label>
                            </span>
                            <select className="form-select" defaultValue={"BTC"} onChange={(e) => this.handleFromCurrency(e)}>
                                <option value="BTC">BTC</option>
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="GBP">GBP</option>
                            </select>
                        </div>
                        <div className="col-lg-4 order-3 order-lg-2 d-flex align-items-end">
                            <div className="input-group">
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="How much do you want to exchange"
                                    aria-label="Transfer Amount"
                                    area-describedby="button-addon2"
                                    onChange={(e) => this.handleAmount(e)}>
                                </input>
                                <button 
                                    className="btn btn-outline-secondary"
                                    type="submit"
                                    id="button-addon2">
                                        Submit
                                </button>
                            </div>
                        </div>
                        <div className="col-lg-4 order-2 order-lg-3">
                            <span className="row justify-content-center">
                                <label>Transferred Currency</label>
                            </span>
                            <select className="form-select" defaultValue={"USD"} onChange={(e) => this.handleToCurrency(e)}>
                                <option value="BTC">BTC</option>
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="GBP">GBP</option>
                            </select>
                        </div>
                    </div>
                    {this.state.transferTotal &&
                        <div className="col-xs-1 text-center">    
                            <h1>
                                {parse(this.props.bpi[this.state.toCurrency].symbol) + " "} {this.state.transferTotal}
                            </h1>
                        </div>
                    }
                </form>
            </div>
            </>
        )
    }
}

export default Calculator;