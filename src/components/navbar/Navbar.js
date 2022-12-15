import "./navbar.css";
import React from "react";
import Minicart from "../minicart/Minicart";
import { NavLink } from "react-router-dom";
import * as Api from "../../graphql/GraphQl";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: [],
      currency: [],
      activeNav: false,
    };
  }

  componentDidMount() {
    this.props
      .fetchData(Api.GET_CATEGORY_NAME)
      .then((res) => this.setState({ categoryName: res.data.categories }));
    this.props
      .fetchData(Api.GET_CURRENCY)
      .then((res) => this.setState({ currency: res.data.currencies }));
  }

  render() {
    return (
      <nav>
        <div className="page-filter">
          {this.state.categoryName.map((category) => {
            return (
              <NavLink
                to={`/${category.name === "all" ? "" : category.name}`}
                onClick={this.props.changeCategory}
                key={category.name}
                className={
                  category.name === this.props.category
                    ? "nav-link active-nav"
                    : "nav-link"
                }
              >
                {category.name}
              </NavLink>
            );
          })}
        </div>
        <div className="page-brand">
          <img src="./assets/icons/Brand-icon.svg" alt="brand-icon" />
        </div>
        <div className="navbar-attributes">
          <div className="dropdown-menu">
            <div className="dropdown" onClick={this.props.openDropdown}>
              {this.props.currentCurrency}&nbsp;
              <img
                className={
                  this.props.dropdown === true
                    ? "dropdown-icon rotate"
                    : "dropdown-icon"
                }
                src="./assets/icons/Dropdown.svg"
                alt="dropdown-icon"
              />
            </div>
            <div
              className={
                this.props.dropdown === true
                  ? "dropdown-list list-open"
                  : "dropdown-list"
              }
            >
              {this.state.currency.map((currency) => (
                <button
                  key={currency.symbol}
                  name={currency.symbol}
                  onClick={this.props.changeCurrency}
                  className={
                    this.props.dropdown === true
                      ? "dropdown-button open"
                      : "dropdown-button"
                  }
                >
                  {currency.label}&nbsp;{currency.symbol}
                </button>
              ))}
            </div>
          </div>
          <div className="cart">
            <div
              className={
                this.props.cartItemsQuantity > 0
                  ? "cart-item-quantity"
                  : "cart-item-quantity cart-item-quantity-closed"
              }
            >
              {this.props.cartItemsQuantity}
            </div>
            <img
              className="cart-icon"
              onClick={this.props.openCart}
              src="./assets/icons/Cart-icon.svg"
              alt="cart-icon"
            />
          </div>
        </div>
        <Minicart
          cartIsOpen={this.props.cartIsOpen}
          cartItems={this.props.cartItems}
          handleQuantity={this.props.handleQuantity}
          cartItemsQuantity={this.props.cartItemsQuantity}
          currentCurrency={this.props.currentCurrency}
          price={this.props.price}
        />
      </nav>
    );
  }
}

export default Navbar;
