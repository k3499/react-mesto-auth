import React from 'react';
import { Link } from 'react-router-dom';

function Register({ handleRegister } ) {
  const emailRef = React.useRef('');
  const passwordRef = React.useRef('');
  const [error, setError] = React.useState(true);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    return handleRegister(data);
  };

  function handleChange(evt) {
      if(emailRef.current.value && passwordRef.current.value){
        setError(false);
      }
  }
  return(
    <>
    <section className="form">
      <h2 className="form__title">Регистрация</h2>
      <form className="form__form" onSubmit={handleSubmit}>
        <div className="form__input-box">
          <input ref={emailRef} type="email" placeholder="Email" onChange={handleChange} className="form__input form__input_email" />
          <input ref={passwordRef} type="password" placeholder="Пароль" onChange={handleChange} className="form__input form__input_pass" />
        </div>
        { error ? <button type="submit" className="form__submit form__disabled" disabled>Зарегистрироваться</button> : <button type="submit" className="form__submit">Зарегистрироваться</button>}
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