import "./product-in-cart.css";
import React from "react";
import Price from "../price/Price";
import ProductAttributes from "../product-attributes/ProductAttributes";

class ProductInCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageIndex: 0,
    };
  }

  next = (imageIndexLength) => {
    if (this.state.imageIndex >= imageIndexLength) {
      this.setState({ imageIndex: 0 });
    } else {
      this.setState({ imageIndex: this.state.imageIndex + 1 });
    }
  };

  prev = (imageIndexLength) => {
    if (this.state.imageIndex <= 0) {
      this.setState({ imageIndex: imageIndexLength });
    } else {
      this.setState({ imageIndex: this.state.imageIndex - 1 });
    }
  };

  render() {
    let {
      name,
      brand,
      prices,
      attributes,
      gallery,
      chosenAttribute,
      quantity,
    } = this.props.cartItem;
    return (
      <>
        <div className="cart-products">
          <div>
            <h1 className="cart-product-brand">{brand}</h1>
            <h1 className="cart-product-name">{name}</h1>
            <p className="cart-product-price">
              <Price
                prices={prices}
                currentCurrency={this.props.currentCurrency}
              />
            </p>
            <div className="attributes cart-attributes">
              <ProductAttributes
                attributes={attributes}
                canClick={false}
                chosenAttribute={chosenAttribute}
              />
            </div>
          </div>
          <div>
            <div>
              <button
                className="increase-amount amount-button"
                onClick={() =>
                  this.props.handleQuantity(
                    1,
                    this.props.cartItems,
                    this.props.cartItem
                  )
                }
              >
                +
              </button>
              <div className="product-amount">{quantity}</div>
              <button
                className="decrease-amount amount-button"
                onClick={() =>
                  this.props.handleQuantity(
                    -1,
                    this.props.cartItems,
                    this.props.cartItem
                  )
                }
              >
                -
              </button>
            </div>
            <div className="cart-product-image-div">
              <img
                className="cart-product-image"
                src={
                  gallery.length === 1 || this.props.minicart === true
                    ? gallery[0]
                    : gallery[this.state.imageIndex]
                }
                alt={`${name}-img`}
              />
              <div
                className={`${
                  gallery.length > 1
                    ? "prev-next-buttons-div"
                    : "prev-next-buttons-div-none prev-next-buttons-div"
                } ${
                  this.props.minicart === true
                    ? "prev-next-buttons-div-none prev-next-buttons-div"
                    : "prev-next-buttons-div"
                }`}
              >
                <button
                  className="prev"
                  onClick={() => this.prev(gallery.length - 1)}
                >
                  <img src="./assets/icons/Prev.svg" alt="prev-icon" />
                </button>
                <button
                  className="next"
                  onClick={() => this.next(gallery.length - 1)}
                >
                  <img src="./assets/icons/Next.svg" alt="next-icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ProductInCart;
