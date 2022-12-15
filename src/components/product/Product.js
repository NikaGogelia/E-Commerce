import "./product.css";
import React from "react";
import Price from "../price/Price";
import { Link } from "react-router-dom";

class Product extends React.Component {
  render() {
    const { id, name, inStock, prices, gallery, attributes, brand } =
      this.props.category;
    return (
      <div className="product">
        <Link
          to={`/product/${id}`}
          onClick={this.props.changePageId}
          data-page-id={id}
        >
          <div className="image-div">
            <img
              className={
                inStock === false
                  ? `product-image ${name} out-of-stock`
                  : `product-image ${name}`
              }
              src={gallery[0]}
              alt={`${name}-img`}
            />
            <h1
              className={
                inStock === false
                  ? "out-of-stock-header stock-header"
                  : "stock-header"
              }
            >
              out of stock
            </h1>
          </div>
        </Link>
        <button
          onClick={() =>
            inStock === false
              ? undefined
              : this.props.addToCart(
                  brand,
                  gallery,
                  id,
                  name,
                  prices,
                  attributes,
                  attributes.map((items) => [items.items[0]])
                )
          }
          className={
            inStock === false ? "go-shop out-of-stock-button" : "go-shop"
          }
        >
          <img src="./assets/icons/Go-to-product.svg" alt="go-to-shop-icon" />
        </button>
        <p
          className={
            inStock === false ? "product-name out-of-stock" : "product-name"
          }
        >
          {brand}&nbsp; {name}
        </p>
        <p
          className={
            inStock === false ? "product-price out-of-stock" : "product-price"
          }
        >
          <Price prices={prices} currentCurrency={this.props.currentCurrency} />
        </p>
      </div>
    );
  }
}

export default Product;
