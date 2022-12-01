import React from "react";
import parse from 'html-react-parser';
import Calculator from "./Calculator";
import 'bootstrap/dist/css/bootstrap.min.css';



class CurrencyExchange extends React.Component {
    constructor() {
        super()
        this.state = {
            "bpi" : {}
        }
    }

    /*
     * @desc Fetches current javascript prices and adds data to state
    */
    componentDidMount() {
        fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
            .then((response) => response.json())
            .then((data) => {
                this.setState({bpi: data.bpi})
            });
    };
    
    render() {
        return (
            <>
            <div className="container">
                <header className="col-xs-1 text-center">
                    <div className="row">
                        <h1>
                            Currency Exchange
                        </h1>
                    </div>
                </header>
                <div className="row">
                    <Calculator className="col" {...this.state} />
                </div>
                <div className="container row">
                    <h3 className="text-center">Current Exchange Rates (BTC to FIAT)</h3>
                    {Object.keys(this.state.bpi).map((coin, i) => {
                        return (
                            <div className="card col-12 col-lg-4 text-center" key={i}>
                                <img src={"/assets/" + this.state.bpi[coin].code + ".jpg"}>
                                </img>
                                <h2>
                                    {parse(this.state.bpi[coin].symbol)+ "  "}{Math.round(this.state.bpi[coin].rate_float*100)/100}
                                </h2>
                            </div>
                        )
                    })}
                </div>
            </div>
            </>
        )
    }
}

export default CurrencyExchange;