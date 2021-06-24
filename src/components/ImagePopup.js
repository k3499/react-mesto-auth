
function ImagePopup(props) {
  return ( 
    <div className={`popup lightbox ${props.card && 'popup_opened'}`} >
    <figure className="popup__image-figure">
      <img className="popup__image" src={props.card?.link} alt={ props.card?.name} />
      <figcaption className="popup__image-caption">{props.card?.name}</figcaption>
      <button className="popup__close" id="close-lightbox-button" type="button" onClick={props.onClose}></button>
    </figure>
    </div>
  );
  }

export default ImagePopup;
