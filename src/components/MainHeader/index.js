import React from "react";
import "./index.css";

const image = "https://linecore.ru/upload/iblock/e7a/e7aee2890e9e72388020fd105ef5cd55.png"

class Header extends React.Component {
  render() {
    return (
      <div className="header">
          <img src={ image } alt="Logo" className="header-logo" />
      </div>
    );
  }
}
export default Header;

