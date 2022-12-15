import "./products.css";
import React from "react";
import Product from "../product/Product";

class Products extends React.Component {
  render() {
    return (
      <>
        {this.props.productsData.map((category, index) => (
          <Product
            key={category.id}
            category={category}
            currentCurrency={this.props.currentCurrency}
            index={index}
            changePageId={this.props.changePageId}
            addToCart={this.props.addToCart}
          />
        ))}
      </>
    );
  }
}

export default Products;
