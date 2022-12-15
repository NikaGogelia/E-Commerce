import "./product-attributes.css";
import React from "react";

class ProductAttributes extends React.Component {
  styleChosenAttribute = (attr, attrItem, chosenAttribute) => {
    switch (attr.name) {
      case "Size":
      case "Capacity":
        if (
          attrItem.value === this.props.size ||
          attrItem.value === this.props.capacity
        ) {
          return "chosen-rest-attributes rest-attributes";
        } else if (
          chosenAttribute?.find((item) => attrItem.value === item[0].value)
        ) {
          return "chosen-rest-attributes rest-attributes";
        } else {
          return "rest-attributes";
        }

      case "With USB 3 ports":
        if (attrItem.value === this.props.withUsb) {
          return "chosen-rest-attributes rest-attributes";
        } else if (
          chosenAttribute?.find((item) => attrItem.value === item[0].value)
        ) {
          return "chosen-rest-attributes rest-attributes";
        } else {
          return "rest-attributes";
        }

      case "Touch ID in keyboard":
        if (attrItem.value === this.props.touchId) {
          return "chosen-rest-attributes rest-attributes";
        } else if (
          chosenAttribute?.find((item) => attrItem.value === item[0].value)
        ) {
          return "chosen-rest-attributes rest-attributes";
        } else {
          return "rest-attributes";
        }

      case "Color":
        if (attrItem.value === this.props.color) {
          return "chosen-color-attribute color-attribute";
        } else if (
          chosenAttribute?.find((item) => attrItem.value === item[0].value)
        ) {
          return "chosen-color-attribute color-attribute";
        } else {
          return "color-attribute";
        }

      default:
        break;
    }
  };

  render() {
    return (
      <>
        {this.props.attributes.map((attr) => {
          return (
            <div key={attr.id} className={`${attr.name}-div`}>
              <h2>{attr.name}:</h2>
              <div className={attr.name}>
                {attr.items.map((attrItem) => (
                  <div
                    onClick={() =>
                      this.props.canClick === false
                        ? undefined
                        : this.props.chooseAttribute(attr.name, attrItem.value)
                    }
                    style={
                      attr.name === "Color"
                        ? {
                            backgroundColor: `${attrItem.value}`,
                          }
                        : null
                    }
                    className={`${this.styleChosenAttribute(
                      attr,
                      attrItem,
                      this.props.chosenAttribute
                    )} ${
                      this.props.canClick === false ? "cant-click" : "can-click"
                    }`}
                    key={attrItem.id}
                  >
                    {attr.name === "Color" ? "" : attrItem.value}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </>
    );
  }
}

export default ProductAttributes;
