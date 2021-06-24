
import React from 'react';
import loginOk from '../images/login-ok.svg';
import loginErr from '../images/login-err.svg';

function InfoTooltip({isRegistered, isOpen, onClose}) {
  const msgOk = 'Вы успешно зарегистрировались!';
  const msgFail = 'Что-то пошло не так! Попробуйте ещё раз.';
  
  return(
    <div
    className={
      isOpen ?
      `popup popup_tooltip popup_opened` :
      `popup popup_tooltip`}>
    <div  className={`popup__container`}>
      <img
        src={ isRegistered ? loginOk : loginErr }
        alt="ok"
        className="popup__img"/>
        <button className="popup__close" type="button" onClick={onClose}></button>
      <h2
        className="popup__edit-title popup__title_type_tooltip">
        { isRegistered ? msgOk : msgFail }
      </h2>
    </div>
  </div>

  )
}
export default InfoTooltip;