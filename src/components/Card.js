import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
   const isOwn = card.owner._id === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like ${isLiked ? 'element__like_active' : ''}`;
  function handleClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }
  return (
    
        <article className="element">
        {isOwn && <button className="element__delete" type="button" onClick={handleDeleteClick}></button>}
        <div className="element__image" onClick={handleClick} style={{ backgroundImage: `url(${card.link})` }} ></div>
        <div className="element__info">
            <h2 className="element__title">{card.name}</h2>
            <div>
              <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
              <p className="element__like-count">{card.likes.length}</p>
            </div>
        </div>
      </article>
  );
  }

export default Card;
