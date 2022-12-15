import React from "react";
import ProductAttributes from "../components/product-attributes/ProductAttributes";
import Price from "../components/price/Price";
import * as Api from "../graphql/GraphQl";

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      productImageIndex: 0,
      size: "",
      color: "",
      capacity: "",
      withUsb: "",
      touchId: "",
      productQuantity: 0,
    };
  }

  componentDidMount() {
    const query = Api.GET_CURRENT_PRODUCT(this.props.pageId);
    this.props.fetchData(query).then((res) => {
      this.setState({ product: res.data.product });

      return res.data.product.attributes.map((item) =>
        this.chooseAttribute(item.name, item.items[0].value)
      );
    });

    this.props.handleOutside();
  }

  chooseAttribute = (attrName, attrValue) => {
    switch (attrName) {
      case "Size":
        this.setState({ size: attrValue });
        break;
      case "Color":
        this.setState({ color: attrValue });
        break;
      case "Capacity":
        this.setState({ capacity: attrValue });
        break;
      case "With USB 3 ports":
        this.setState({ withUsb: attrValue });
        break;
      case "Touch ID in keyboard":
        this.setState({ touchId: attrValue });
        break;
      default:
        break;
    }
  };

  productAttributes = (attribute) =>
    attribute.map((attr) =>
      attr.items.filter(
        (item) =>
          (item.value === this.state.size &&
            this.state.size !== "" &&
            attr.name === "Size") ||
          (item.value === this.state.color &&
            this.state.color !== "" &&
            attr.name === "Color") ||
          (item.value === this.state.capacity &&
            this.state.capacity !== "" &&
            attr.name === "Capacity") ||
          (item.value === this.state.withUsb &&
            this.state.withUsb !== "" &&
            attr.name === "With USB 3 ports") ||
          (item.value === this.state.touchId &&
            this.state.touchId !== "" &&
            attr.name === "Touch ID in keyboard")
      )
    );

  render() {
    if (this.state.product?.id === undefined) {
      return (
        <div className="product-page">
          <h1>Nothing To Show</h1>
        </div>
      );
    } else {
      const {
        attributes,
        brand,
        description,
        gallery,
        id,
        name,
        prices,
        inStock,
      } = this.state.product;

      document.title = `${brand} - ${name}`;
      return (
        <div className="product-page">
          <div key={id} className="current-product">
            <div className="current-product-image-div">
              <div className="change-product-image">
                {gallery.map((image, index) => (
                  <img
                    key={image}
                    onClick={() => this.setState({ productImageIndex: index })}
                    src={image}
                    alt={`${name}-img`}
                  />
                ))}
              </div>
              <div className="current-product-image">
                <img
                  src={gallery[this.state.productImageIndex]}
                  alt={`${name}-img`}
                />
              </div>
            </div>
            <div className="current-product-info">
              <h1 className="product-brand">{brand}</h1>
              <h1 className="product-name">{name}</h1>
              {inStock === false ? (
                <div className="out-of-stock-warning">
                  Sorry! The product is currently out of stock. For more info
                  about this product, you can drop your email to&nbsp;
                  <a className="email" href="mailto:sales@wooo-store-test.com">
                    sales@wooo-store-test.com
                  </a>
                </div>
              ) : null}
              <div className="attributes">
                <ProductAttributes
                  attributes={attributes}
                  size={this.state.size}
                  color={this.state.color}
                  capacity={this.state.capacity}
                  withUsb={this.state.withUsb}
                  touchId={this.state.touchId}
                  chooseAttribute={this.chooseAttribute}
                />
              </div>
              <h2 className="price-header">price:</h2>
              <p className="price">
                <Price
                  prices={prices}
                  currentCurrency={this.props.currentCurrency}
                />
              </p>
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
                        this.productAttributes(attributes)
                      )
                }
                className={
                  inStock === false
                    ? "add-to-cart out-of-stock-button"
                    : "add-to-cart"
                }
              >
                add to cart
              </button>
              <div
                className="description"
                dangerouslySetInnerHTML={{ __html: description }}
              ></div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default ProductPage;
