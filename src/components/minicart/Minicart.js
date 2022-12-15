import "./minicart.css";
import React from "react";
import ProductInCart from "../product-in-cart/ProductInCart";
import { Link } from "react-router-dom";

class Minicart extends React.Component {
  render() {
    return (
      <div
        className={
          this.props.cartIsOpen === true ? "minicart minicart-open" : "minicart"
        }
      >
        <div
          className={
            this.props.cartItems.length === 0
              ? "minicart-div minicart-clear"
              : "minicart-div"
          }
        >
          {this.props.cartItems.length === 0 ? (
            <h3>Cart is empty</h3>
          ) : (
            <>
              <h3 className="cart-items-quantity">
                My bag,{" "}
                <span>
                  &nbsp;{this.props.cartItemsQuantity}{" "}
                  {this.props.cartItemsQuantity > 1 ? "items" : "item"}
                </span>
              </h3>
              {this.props.cartItems.map((cartItem, index) => (
                <ProductInCart
                  key={index}
                  cartItem={cartItem}
                  cartItems={this.props.cartItems}
                  handleQuantity={this.props.handleQuantity}
                  currentCurrency={this.props.currentCurrency}
                  minicart={true}
                />
              ))}
              <div className="cart-info">
                <h2 className="cart-items-price">
                  Total:&nbsp;&nbsp;
                  {this.props.currentCurrency}&nbsp;
                  {Math.floor(this.props.price)}
                </h2>
                <div className="summary-button">
                  <Link to="/cart" className="view-bag">
                    view bag
                  </Link>
                  <button className="checkout">check out</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default Minicart;
