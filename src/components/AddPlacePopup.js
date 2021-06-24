import React from "react";
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace, loadButtonText}) {
  const [name, setName] = React.useState('')
  const [link, setLink] = React.useState('')

  function handleName(e) {
    setName(e.target.value);
}

  function handleLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({name, link});
  }
  return ( 
    <PopupWithForm isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} name="card" title="Новое место" buttonText={loadButtonText}>
            <input className="popup__input popup__input_type_name" value={name || ''} onChange={handleName} type="text" id="cardName"  name="cardname" placeholder="Название" required minLength="2" maxLength="30"/>
            <span id="cardName-error" className="popup__error"></span>
            <input className="popup__input popup__input_type_job" value={link || ''} onChange={handleLink} type="url" id="cardLink"  name="cardlink" placeholder="Ссылка на картинку" required/>
            <span id="cardLink-error" className="popup__error"></span>
    </PopupWithForm>
  );
  }

export default AddPlacePopup;
