import React from "react";
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, loadButtonText}) {
  const avatarRef = React.useRef()

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  } 

  return ( 
    <PopupWithForm isOpen={isOpen} onClose={onClose} name="ava" title="Обновить аватар" buttonText={loadButtonText} onSubmit={handleSubmit}>
      <input className="popup__input" name="avalink" type="url" id="ava-link" placeholder="Ссылка на аватар" required ref={avatarRef}/>
      <span id="ava-link-error" className="popup__error"></span>
    </PopupWithForm>
  );
  }

export default EditAvatarPopup;
