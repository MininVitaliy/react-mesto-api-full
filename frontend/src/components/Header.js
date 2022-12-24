import React from "react";
import logo from '../images/logo-mesto.svg';

function Header({children}) {
  return (
    <header className="header root__header">
      <img src={logo} className="header__logo" alt="Логотип Место"/>
      <div className="header__row">
        {children}
      </div>
    </header>
  )
}

export default Header;