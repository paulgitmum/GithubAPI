import React from "react";
import ImagePath from "../images/logo.png";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  BrowserRouter,
} from "react-router-dom";
import "./nav.css";
import Users from "./users";
import Contacts from "./contacts";
import Repositories from "./repositories";
import About from "./about";
import "./nav.css";

const NavBar = () => {
  return (
    <BrowserRouter>
      <header className="header">
        <div className="log-container">
          <img src={ImagePath} alt="Logo" />
          <h4 className="logo">Interview Project</h4>
        </div>
        <div className="search-container">
        </div>
        <nav>
          <ul className="nav-links">
            <li>
              <Link className="nav-link" to="/users">
                Home
              </Link>
              <Link className="nav-link" to="/about">
                About
              </Link>
              <Link className="nav-link" to="/contacts">
                Contacts
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <Switch>
        <Route path="/users" exact component={Users} />
        <Route path="/about" exact component={About} />
        <Route path="/contacts" exact component={Contacts} />
        <Route path="/users/:login" exact component={Repositories} />
        <Route redirect="/users"/>
      </Switch>
    </BrowserRouter>
  );
};
export default NavBar;
