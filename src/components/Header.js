import logo from '../images/logo.svg';
import React from 'react'
import { Link, Route, Switch } from 'react-router-dom';

function Header(props) {
  return (
        <header className="header">
          <Link to='/'><img className="logo" src={logo} alt="Логотип"/></Link>
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
  );
  }

export default Header;
