import React from 'react';
import { Link } from 'react-router-dom';

function Register({ handleRegister } ) {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    return handleRegister(data);
  };

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }
  function handleChangePass(evt) {
    setPassword(evt.target.value);
}

  return(
    <>
    <section className="form">
      <h2 className="form__title">Регистрация</h2>
      <form className="form__form" onSubmit={handleSubmit}>
        <div className="form__input-box">
          <input type="email" placeholder="Email" value={email} onChange={handleChangeEmail} className="form__input form__input_email" />
          <input type="password" placeholder="Пароль" value={password} onChange={handleChangePass} className="form__input form__input_pass" />
        </div>
        <button type="submit" className={(!email || !password)
          ? "form__submit form__disabled"
          : "form__submit" } disabled={!email || !password}>Зарегистрироваться</button>
      </form>
      <div className="form__signup-block">
        <p className="form__alt">
          Уже зарегистрированы?
          <Link to="sign-in" className="form__signup form__signup_form"> Войти</Link>
        </p>
      </div>
    </section>
    
    </ >
  )
}

export default Register;