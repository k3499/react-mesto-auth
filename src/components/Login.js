
import React from 'react';

function Login({ handleLogin}) {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    return handleLogin(data);
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
      <h2 className="form__title">Логин</h2>
      <form className="form__form" onSubmit={handleSubmit}>
        <div className="form__input-box">
          <input type="email" placeholder="Email" onChange={handleChangeEmail} name="eml" className="form__input form__input_email" />
          <input type="password" placeholder="Пароль" onChange={handleChangePass} name="pass" className="form__input form__input_pass" />
        </div>
          <button type="submit" className={(!email || !password)
          ? "form__submit form__disabled"
          : "form__submit" } disabled={!email || !password} >Войти</button>
      </form>
    </section>
    </ >
  )
}

export default Login;
