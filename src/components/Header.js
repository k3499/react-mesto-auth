import logo from '../images/logo.svg';
import React from 'react'
import { Link, Route, Switch } from 'react-router-dom';

function Header(props) {
  return (
    <Switch>
      <Route path="*">
        <header className="header">
          <a href="#" target="_self"><img className="logo" src={logo} alt="Логотип"/></a>
          <Switch>
            <Route path="/" exact>
              <div className="header__info">
              <div className="header__email">
                { props.email }
              </div>
                <Link
                  to="/sign-in"
                  className="header__navlink"
                  onClick={props.handleClick}>
                  Выйти
                </Link>
              </div>
            </Route>
            <Route path="/sign-up">
              <Link
                to="/sign-in"
                className="header__navlink">
                Войти
              </Link>
            </Route>
            <Route path="/sign-in">
              <Link
                to="/sign-up"
                className="header__navlink">
                Зарегистрироваться
              </Link>
            </Route>
          </Switch>
        </header>
      </Route>
    </Switch>
  );
  }

export default Header;
