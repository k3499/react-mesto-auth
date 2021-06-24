import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import {api, Api} from '../utils/api';
import {CurrentUserContext} from "../contexts/CurrentUserContext";


function Main({cards, onCardLike, onCardDelete, onEditAvatar, onEditProfile, onAddPlace, onCardClick}) {
  const currentUser = React.useContext(CurrentUserContext)

  return (
    <main className="content">
    <section className="profile">
      <div className="profile__info">
        <div className="profile__avatar-area" style={{ backgroundImage: `url(${currentUser.avatar})` }}>
          <div className="profile__avatar-cover" onClick={onEditAvatar}></div>
        </div>
        <div className="profile__wrap">
          <div className="profile__title-container">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button className="profile__edit-button" id="edit-profile-button" type="button" onClick={onEditProfile}></button>
          </div>
          <p className="profile__job">{currentUser.about}</p>
        </div>
      </div>
      <button className="profile__add-button" id="add-card-button" type="button" onClick={onAddPlace}></button>
    </section>
    <section className="elements">
      {cards.map((card) =>(
        <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
      ))}
    </section>
    
  </main>
  );
  }

export default Main;
