
import React from 'react';

function Login({ handleLogin}) {
  const emailRef = React.useRef('');
  const passwordRef = React.useRef('');
  const [error, setError] = React.useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    return handleLogin(data);
  };

  function handleChange(evt) {
      if(emailRef.current.value && passwordRef.current.value){
        setError(false);
      }
  }

  return(
    <>
    <section className="form">
      <h2 className="form__title">Логин</h2>
      <form className="form__form" onSubmit={handleSubmit}>
        <div className="form__input-box">
          <input ref={emailRef} type="email" placeholder="Email" onChange={handleChange} name="eml" className="form__input form__input_email" />
          <input ref={passwordRef} type="password" placeholder="Пароль" onChange={handleChange} name="pass" className="form__input form__input_pass" />
        </div>
         { error ? <button type="submit" className="form__submit form__disabled" disabled >Войти</button> : <button type="submit" className="form__submit" >Войти</button>} 
      </form>
    </section>
    </ >
  )
}

export default Login;
