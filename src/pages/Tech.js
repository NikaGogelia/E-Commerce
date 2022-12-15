import React from "react";
import Products from "../components/products/Products";
import * as Api from "../graphql/GraphQl";

class Tech extends React.Component {
  componentDidMount() {
    const query = Api.GET_CATEGORY_PRODUCTS("tech");
    this.props.fetchData(query).then((res) => {
      this.props.setProductsData(res.data.category.products);
    });

    this.props.handleOutside();
  }

  render() {
    document.title = "Home / Tech";

    return (
      <div className="products-page">
        <h1>{this.productsData !== [] ? "Tech" : "Nothing To Show"}</h1>
        <div className="products">
          <Products
            category={this.props.category}
            currentCurrency={this.props.currentCurrency}
            changePageId={this.props.changePageId}
            productsData={this.props.productsData}
            addToCart={this.props.addToCart}
          />
        </div>
      </div>
    );
  }
}

export default Tech;
