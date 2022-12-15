import React from "react";

class NotFound extends React.Component {
  componentDidMount() {
    this.props.handleOutside();
  }

  render() {
    document.title = "Page Not Found";
    return (
      <div className="page-not-found">
        <h1>Page Not Found</h1>
      </div>
    );
  }
}

export default NotFound;
