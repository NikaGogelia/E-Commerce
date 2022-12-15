import React from "react";
import ProductInCart from "../components/product-in-cart/ProductInCart";

class CartPage extends React.Component {
  componentDidMount() {
    this.props.handleOutside();
  }

  render() {
    document.title = "Cart";
    return (
      <div className="cart-page">
        <h1>Cart</h1>
        <div className="cart-page-div">
          {this.props.cartItems.length === 0 ? (
            <h1 style={{ textAlign: "center" }}>Cart is empty</h1>
          ) : (
            <>
              {this.props.cartItems.map((cartItem, index) => (
                <ProductInCart
                  key={index}
                  cartItem={cartItem}
                  cartItems={this.props.cartItems}
                  handleQuantity={this.props.handleQuantity}
                  currentCurrency={this.props.currentCurrency}
                />
              ))}
              <div className="cart-info">
                <h2 className="cart-items-quantity">
                  Quantity:&nbsp;&nbsp;{this.props.cartItemsQuantity}
                </h2>
                <h2 className="cart-items-price">
                  Total:&nbsp;&nbsp;
                  {this.props.currentCurrency}&nbsp;
                  {Math.floor(this.props.price)}
                </h2>
                <button className="order">order</button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default CartPage;
