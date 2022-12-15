import "./price.css";
import React from "react";

class Price extends React.Component {
  render() {
    return (
      <>
        {this.props.prices
          .filter(
            (price) =>
              price.currency.symbol === this.props.currentCurrency && price
          )
          .map(
            (eachPrice) =>
              `${eachPrice.currency.symbol} ${Math.floor(eachPrice.amount)}`
          )}
      </>
    );
  }
}

export default Price;
