export const GRAPHQL_ENDPOINT = "http://localhost:4000/graphql";

export const GET_CATEGORY_NAME = `
{
  categories {
    name
  }
}`;

export const GET_CURRENCY = `
{
 	currencies {
    label
    symbol
  }
}`;

export const GET_CATEGORY_PRODUCTS = (category) => `
{
  category(input: { title: "${category}" }) {
    name
    products {
      id
      name
      brand
      inStock
      gallery
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          symbol
        }
        amount
      } 
    }
  }
}`;

export const GET_CURRENT_PRODUCT = (id) => `
{
  product(id: "${id}") {
    id
    name
    brand
    inStock
    gallery
    description
    attributes {
      id
      name
      type
      items {
        displayValue
        value
        id
      }
    }
    prices {
      currency {
        symbol
      }
      amount
    }
  }
}`;
