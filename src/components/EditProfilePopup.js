import React from "react";
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser, loadButtonText}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')

  // После загрузки текущего пользователя из API
// его данные будут использованы в управляемых компонентах.
React.useEffect(() => {
  setName(currentUser.name);
  setDescription(currentUser.about);
}, [currentUser, isOpen]); 

function handleChangeName(e) {
  setName(e.target.value);
}

function handleChangeDescription(e) {
  setDescription(e.target.value);
}

function handleSubmit(e) {
   // Запрещаем браузеру переходить по адресу формы
  e.preventDefault();
  // Передаём значения управляемых компонентов во внешний обработчик
  console.log(name);
  console.log(description)
  onUpdateUser({
      name: name,
      about: description,
  });
}

  return ( 
    <PopupWithForm isOpen={isOpen} onSubmit={handleSubmit} onClose={onClose} name="profile" title="Редактировать профиль" buttonText={loadButtonText}>
            <input className="popup__input popup__input_type_name" onChange={handleChangeName} value={name || ''} type="text" id="profileName"  name="name" placeholder="Имя" required minLength="2" maxLength="40"/>
            <span id="profileName-error" className="popup__error"></span>
            <input className="popup__input popup__input_type_job" onChange={handleChangeDescription} value={description || ''} type="text" id="profileJob"  name="job" placeholder="Профессия" required minLength="2" maxLength="40"/>
            <span id="profileJob-error" className="popup__error"></span>
    </PopupWithForm>
  );
  }

export default EditProfilePopup;
