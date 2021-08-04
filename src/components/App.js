import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory, withRouter } from 'react-router-dom';
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import {api} from '../utils/api';
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import * as auth from '../utils/userAuth';
import { setTkn, getTkn, removeTkn } from '../utils/token'

function App() {
  const history = useHistory()
  
  const [headerEmail, setHeaderEmail] = React.useState('')
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfileOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = React.useState([])
  const loadButtonText = 'Сохранить';
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState()
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [isRegistered, setIsRegistered] =React.useState(false)


  const handleCheckToken = () => {
    const token = getTkn();  //берем токен из локального
    if (token) { //если он есть
      auth.getInfo(token) //делаем запрос на аутентификацию
      .then((getInfo) => {
        setLoggedIn(true); // ставим тру в залогинен
        setHeaderEmail(getInfo.data.email); // Берем инфорацию об Email
        history.push('/'); //Кидаем на главную
      })
      .catch((err) => {
        return console.log(err)
      });
    }
    return token;
  };
  React.useEffect(() => {
    handleCheckToken();  //выполняем ту, что выше
    console.log(loggedIn);
  }, []);

  React.useEffect(() => {
    if (loggedIn){ // Если залогинены 
      Promise.all([api.getUserInfo(), api.getInitialCards()]) //делаем запрос на информацию о юзере и карточках
        .then(([ userData, cards  ]) => { 
          setCurrentUser(userData); //ставим юзера
          setCards(cards) //ставим карты
        })
        .catch((err) => console.log(err))
    }
  }, [loggedIn]);


  

    const handleLogin = (data) => {
      auth.auth(data)
      .then((res) => {

        if (res.token) {
          setLoggedIn(true)
          setHeaderEmail(data.email)
          setTkn(res.token)
          history.push('/')
        }else{
        setIsRegistered(false)
        setInfoTooltipOpen(true)
      }
      })
      .catch((err) => console.log(err))
    };

    const handleRegister = (data) => {
      auth.reg(data)
      .then((res) => {
        if (!res.error) {
            setIsRegistered(true);
            setInfoTooltipOpen(true);
            history.push('/sign-in');
          }else{
          setIsRegistered(false)
          setInfoTooltipOpen(true)
        }
        })
        .catch((err) => {
          console.log(err)
          setIsRegistered(false)
          setInfoTooltipOpen(true)
        })
    };

  function handleUpdateUser(userData){
    api.setUserInfo(userData)
        .then(res => {
          setCurrentUser(res);
          setIsEditProfileOpen(false);
        })
        .catch((err) => console.log(err))
  }
  function handleUpdateAvatar(userData){
    api.avatarUpl(userData)
        .then(res => {
          setCurrentUser(res);
          setIsEditAvatarPopupOpen(false);
        })
        .catch((err) => console.log(err))
  }

  function handleCardLike(card) {
  
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        
      })
      .catch((err) => console.log(err))
  }
  function handleCardDelete(card){
    api.removeCard(card._id)
    .then(() => {
        setCards(cards.filter((c) => card._id !== c._id));
    })
    .catch((err) => console.log(err))
  }

  function handleAddPlaceSubmit(inputData) {
    api.addCard(inputData)
        .then(res => {
            setCards([res, ...cards]);
            setIsAddPlacePopupOpen(false);
        })
        .catch((err) => console.log(err))
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }
  function handleEditAvatarClick(){
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick(){
    setIsEditProfileOpen(true);
  }
  function handleAddPlaceClick(){
    setIsAddPlacePopupOpen(true);
  }
  function closeAllPopups() {
    setIsEditProfileOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setInfoTooltipOpen(false);
  }
  
  function handleLogOut() {
    removeTkn()
  }

  return (
      <CurrentUserContext.Provider value={currentUser}>
        <div className="wrapper">
          <div className="page">
          <Header
            email={headerEmail}
            handleClick={handleLogOut}
          />
            <Switch>
                <ProtectedRoute exact path="/" component={Main} loggedIn={loggedIn}
                  cards={cards}
                  setCards={setCards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                />
              <Route path='/sign-in'>
                <Login handleLogin={handleLogin} />
              </Route>
              <Route path='/sign-up'>
                <Register handleRegister={handleRegister} />
              </Route>
              <Route>
                {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
              </Route>
            </Switch>
            <Footer />
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} loadButtonText={loadButtonText}/> 
            <EditProfilePopup  isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} loadButtonText={loadButtonText}/> 
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} loadButtonText={loadButtonText} /> 
            <ImagePopup onClose={closeAllPopups} card={selectedCard}/>
            <InfoTooltip
              isRegistered={isRegistered}
              isOpen={isInfoTooltipOpen}
              onClose={closeAllPopups}
            />
          </div>
        </div>
      </CurrentUserContext.Provider>
  );
  }

export default withRouter(App);