
function PopupWithForm({title, name, isOpen, onClose, children, buttonText, onSubmit}) {
  return ( 
  <div className={`popup popup_${name} ${isOpen && 'popup_opened'}`}>
    <div className="popup__container">
      <h2 className="popup__edit-title">{title}</h2>
      <form className="popup__form" name={name} onSubmit={onSubmit}>
        {children}
        <button className="popup__button" type="submit">{buttonText}</button>
      </form>
      <button className="popup__close" type="button" onClick={onClose}></button>
    </div>
  </div>
  );
  }

export default PopupWithForm;
