import React from "react";
import "./index.css";
import { Link } from "react-router-dom"

//Создаю черную полоску
class NavBar extends React.Component {
  render() {
    return (
      <div className="navBar">
          <nav className="navbar navbar-expand-lg navbar-primary bg-primary">
              <Link  to={`/`} className="navbar-brand" > Добро пожаловать! </Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar1" aria-controls="navbar1" aria-expanded="false" aria-label="Toggle navigation">
              </button>
              <div className="collapse navbar-collapse" id="navbar1">
                  <ul className="navbar-nav mr-auto">
                      <li className="nav-item active">
                        <Link  to={`/`} className="nav-link" > Главная </Link>
                      </li>
                  </ul>
                  {/*<form className="form-inline my-2 my-lg-0">*/}
                  {/*    <input className="form-control mr-sm-2" type="search" placeholder="Поиск" aria-label="Search"/>*/}
                  {/*    <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Поиск</button>*/}
                  {/*</form>*/}
              </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
