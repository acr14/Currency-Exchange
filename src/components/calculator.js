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

	handleToCurrency(event) {
		let value = event.target.value;
		console.log(value, "currency handler")
		this.setState({
			toCurrency: value
		}, () => {
			console.log(this.state, "setState callback")
		})
		console.log(JSON.stringify(this.state))
		console.log(Object.values(this.state.bpi), "bpi string")
	};

	handleFromCurrency(event) {
		let value = event.target.value;
		console.log(value, "currency handler")
		this.setState({
			fromCurrency: value
		}, () => {
			console.log(this.state, "setState callback")
		})
		console.log(JSON.stringify(this.state))
		console.log(Object.values(this.state.bpi), "bpi string")
		
	};

    handleAmount(event) {
        event.preventDefault();
        let value = event.target.value;
        console.log(value, "This is how much I want to transfer");
        this.setState({
            amount: value
        }, () => {
            console.log(this.state, "setState amount callback")
        });
    };

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            transferTotal: this.calculate()
        })

        console.log(this.state.transferTotal);
        let value = event.target.value;
        console.log(value, "handle submit");
        console.log(event, "handle submit event")
    };

    calculate = () => {
        console.log(this.props);
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
                                {/* <option>From</option> */}
                                <option value="BTC">BTC</option>
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="GBP">GBP</option>
                            </select>
                        </div>
                        {/* <textarea onChange={(e) => this.handleAmount(e)}></textarea> */}
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
                                {/* <option>To</option> */}
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