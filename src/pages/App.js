import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import * as Api from "../graphql/GraphQl";
import All from "./All";
import Clothes from "./Clothes";
import Tech from "./Tech";
import ProductPage from "./ProductPage";
import CartPage from "./CartPage";
import NotFound from "./NotFound";
import Navbar from "../components/navbar/Navbar";
import Loader from "../components/loader/Loader";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productsData: [],
      cartItems: [],
      category: localStorage.getItem("category"),
      currentCurrency: "$",
      dropdown: false,
      pageId: localStorage.getItem("pageId"),
      loader: true,
      cartItemsQuantity: 0,
      cartIsOpen: false,
      price: 0,
      cartCurrency: "$",
    };
  }

  fetchData = async (query) => {
    try {
      let response = await fetch(Api.GRAPHQL_ENDPOINT, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ query: query }),
      });

      if (!response.ok) {
        const message = `Error in "fetchData()" : ${response.status}`;
        throw new Error(message);
      }
      return await response.json();
    } catch (err) {
      this.setState({ loader: false, productsData: [] });
      console.error(err);
    }
  };

  changeCategory = (e) => {
    this.setState({ category: e.target.innerHTML });

    localStorage.setItem("category", e.target.innerHTML);
  };

  changeCurrency = (e) => {
    this.setState({ currentCurrency: e.target.name, dropdown: false });
  };

  changePageId = (e) => {
    this.setState({
      pageId: e.currentTarget.getAttribute("data-page-id"),
    });

    localStorage.setItem(
      "pageId",
      e.currentTarget.getAttribute("data-page-id")
    );
  };

  openDropdown = () => {
    this.setState({ dropdown: !this.state.dropdown, cartIsOpen: false });
  };

  openCart = () => {
    this.setState({ cartIsOpen: !this.state.cartIsOpen, dropdown: false });
  };

  handleOutside = () => {
    this.setState({ cartIsOpen: false, dropdown: false });
  };

  handleQuantity = (int, cartArray, cartItem) => {
    const index = cartArray.indexOf(cartItem);
    const arr = cartArray;
    arr[index].quantity += int;

    if (arr[index].quantity < 0) arr[index].quantity = 0;
    this.changeQuantity(arr);
  };

  changeQuantity = (array) => {
    this.setState({ cartItems: [...array] });
  };

  totalCartQuantity = () => {
    let prev = 0;
    this.state.cartItems.map((items) => {
      prev += items.quantity;
      return this.setState({ cartItemsQuantity: prev });
    });
  };

  handlePrice = () => {
    let prev = 0;
    this.state.cartItems.map((items) =>
      items.prices
        .filter(
          (price) =>
            price.currency.symbol === this.state.currentCurrency && price
        )
        .map((item) => {
          prev += item.amount * items.quantity;
          return this.setState({
            price: prev,
            cartCurrency: item.currency.symbol,
          });
        })
    );
  };

  addToCart = (
    brand,
    gallery,
    id,
    name,
    prices,
    attributes,
    attribute = [],
    quantity = 1
  ) => {
    if (this.state.cartItems.length === 0) {
      this.setState({
        cartItems: [
          ...this.state.cartItems,
          {
            id,
            name,
            brand,
            gallery,
            prices,
            chosenAttribute: [...attribute],
            attributes,
            quantity,
          },
        ],
      });
    } else {
      if (
        this.state.cartItems.find(
          (item) =>
            JSON.stringify(
              item.chosenAttribute.map((item) => item[0].value)
            ) === JSON.stringify(attribute.map((item) => item[0].value))
        )
      ) {
        this.state.cartItems.filter(
          (item) =>
            JSON.stringify(
              item.chosenAttribute.map((item) => item[0].value)
            ) === JSON.stringify(attribute.map((item) => item[0].value)) &&
            this.handleQuantity(1, this.state.cartItems, item)
        );
      } else {
        this.setState({
          cartItems: [
            ...this.state.cartItems,
            {
              id,
              name,
              brand,
              gallery,
              prices,
              chosenAttribute: [...attribute],
              attributes,
              quantity,
            },
          ],
        });
      }
    }
  };

  removeCart = () => {
    let arr = this.state.cartItems.filter((items) => items.quantity > 0);
    this.setState({ cartItems: arr });
  };

  setProductsData = (products) => {
    this.setState({
      productsData: products,
      loader: false,
    });
    console.log(products);
  };

  componentDidMount() {
    const query = Api.GET_CATEGORY_PRODUCTS("all");
    this.fetchData(query).then((res) => {
      this.setProductsData(res.data.category.products);
    });

    if (localStorage.getItem("category") === null) {
      localStorage.setItem("category", "all");
      this.setState({ category: "all" });
    } else {
      localStorage.setItem("category", localStorage.getItem("category"));
    }
  }

  componentDidUpdate(_, prevState) {
    let prev = 0;
    let prevTotal = 0;
    this.state.cartItems.map((item) => (prev += item.quantity));

    if (
      prevState.cartItemsQuantity !== prev &&
      (this.state.cartIsOpen === false || this.state.cartIsOpen === true)
    ) {
      this.totalCartQuantity();
    }

    if (this.state.cartItems.find((items) => items.quantity === 0)) {
      this.removeCart();
    }

    this.state.cartItems.map((items) =>
      items.prices.filter(
        (price) =>
          price.currency.symbol === this.state.currentCurrency &&
          (prevTotal += price.amount * items.quantity)
      )
    );

    if (prevState.price !== prevTotal) {
      this.handlePrice();
    } else if (prevState.cartCurrency !== this.state.currentCurrency) {
      this.handlePrice();
    }
  }

  render() {
    if (this.state.loader === true)
      return (
        <>
          <header>
            <Navbar
              changeCategory={this.changeCategory}
              category={this.state.category}
              currentCurrency={this.state.currentCurrency}
              dropdown={this.state.dropdown}
              changeCurrency={this.changeCurrency}
              openDropdown={this.openDropdown}
              fetchData={this.fetchData}
              cartItems={this.state.cartItems}
              cartItemsQuantity={this.state.cartItemsQuantity}
              handleQuantity={this.handleQuantity}
              price={this.state.price}
              openCart={this.openCart}
              cartIsOpen={this.state.cartIsOpen}
              handleOutside={this.handleOutside}
            />
          </header>
          <main className="loader-div">
            <Loader />
          </main>
        </>
      );
    return (
      <>
        <header>
          <Navbar
            changeCategory={this.changeCategory}
            category={this.state.category}
            currentCurrency={this.state.currentCurrency}
            dropdown={this.state.dropdown}
            changeCurrency={this.changeCurrency}
            openDropdown={this.openDropdown}
            fetchData={this.fetchData}
            cartItems={this.state.cartItems}
            cartItemsQuantity={this.state.cartItemsQuantity}
            handleQuantity={this.handleQuantity}
            price={this.state.price}
            openCart={this.openCart}
            cartIsOpen={this.state.cartIsOpen}
            handleOutside={this.handleOutside}
          />
        </header>
        <main
          className={this.state.cartIsOpen === true ? "disable-scroll" : null}
          onClick={this.handleOutside}
        >
          <Routes>
            <Route
              path="/"
              element={
                <All
                  fetchData={this.fetchData}
                  setProductsData={this.setProductsData}
                  category={this.state.category}
                  currentCurrency={this.state.currentCurrency}
                  changePageId={this.changePageId}
                  productsData={this.state.productsData}
                  cartIsOpen={this.state.cartIsOpen}
                  addToCart={this.addToCart}
                  handleOutside={this.handleOutside}
                />
              }
            />
            <Route
              path="/clothes"
              element={
                <Clothes
                  fetchData={this.fetchData}
                  setProductsData={this.setProductsData}
                  category={this.state.category}
                  currentCurrency={this.state.currentCurrency}
                  changePageId={this.changePageId}
                  productsData={this.state.productsData}
                  cartIsOpen={this.state.cartIsOpen}
                  addToCart={this.addToCart}
                  handleOutside={this.handleOutside}
                />
              }
            />
            <Route
              path="/tech"
              element={
                <Tech
                  fetchData={this.fetchData}
                  setProductsData={this.setProductsData}
                  category={this.state.category}
                  currentCurrency={this.state.currentCurrency}
                  changePageId={this.changePageId}
                  productsData={this.state.productsData}
                  cartIsOpen={this.state.cartIsOpen}
                  addToCart={this.addToCart}
                  handleOutside={this.handleOutside}
                />
              }
            />
            <Route
              path="/product/:id"
              element={
                <ProductPage
                  fetchData={this.fetchData}
                  pageId={this.state.pageId}
                  productsData={this.state.productsData}
                  category={this.state.category}
                  currentCurrency={this.state.currentCurrency}
                  addToCart={this.addToCart}
                  chooseAttribute={this.chooseAttribute}
                  handleOutside={this.handleOutside}
                />
              }
            />
            <Route
              path="/cart"
              element={
                <CartPage
                  cartItems={this.state.cartItems}
                  handleQuantity={this.handleQuantity}
                  cartItemsQuantity={this.state.cartItemsQuantity}
                  currentCurrency={this.state.currentCurrency}
                  price={this.state.price}
                  handleOutside={this.handleOutside}
                />
              }
            />
            <Route
              path="*"
              element={<NotFound handleOutside={this.handleOutside} />}
            />
          </Routes>
        </main>
      </>
    );
  }
}

export default App;
