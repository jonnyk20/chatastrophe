
import React from 'react';

const Header = ({ children }) => {
  return (
    <div id="Header">
      <img src="/assets/icon.png" alt="logo" />
      <h1>Chatastrophe</h1>
      {children}
    </div>);
};

export default Header;