import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ProtectedRouteElement from './ProtectedRoute';
import Header from './Header';
import Main from './Main'
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import authApi from '../utils/AuthApi';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';




function App() {

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [email, setEmail] = React.useState('')

  React.useEffect(() => {
    api.getInitialData()
    .then(([resProfile, resCards])=>{
      setCurrentUser(resProfile);
      setCards(resCards);
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);
  
  React.useEffect(()=>{
    if(localStorage.getItem('token')){
      handleUserAuthorization();
    }
  }, [])
  
  const navigate = useNavigate()

  //Для открытия попапов
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmDeletePopupOpen, setConfirmDeletePopupOpen] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);

  //Для корректного отображения авторизационной интерактивности
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [headerLink, setHeaderLink] = React.useState('');
  const [headerText, setHeaderText] = React.useState('');
  const [isLoginCorrect, setIsLoginCorrect] = React.useState(false)
  
  //Для работы с карточками
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cardToRemove, setCardToRemove] = React.useState({});
  
  //Вспомогательные функции
  function handleCardClick(card){
    setSelectedCard(card);
  }
  function handleRegisterOpen(){
    setHeaderText("Войти");
    setHeaderLink("/sign-in");
  }
  function handleLoginOpen(){
    setHeaderText("Регистрация");
    setHeaderLink("/sign-up");
  }

  function closeAllPopups(){
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setConfirmDeletePopupOpen(false)
    setSelectedCard({});
    setInfoTooltipOpen(false);
    setIsLoginCorrect(false);
  }
  function handleEditProfileClick(){
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick(){
    setAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick(){
    setEditAvatarPopupOpen(true);
  }
  function handleInfoTooltip(){
    setInfoTooltipOpen(true);
  }
  function handleCardDeleteClick(card){
    setCardToRemove(card)
    setConfirmDeletePopupOpen(true);
  }
  function handleCardLike(card){
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch((err) => {
      console.log(err);
    });
  }
  function handleCardDelete({card}){
    api.deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id && c));
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }
  function handleUpdateUser(newUserInfo){
    api.redactProfile(newUserInfo.name, newUserInfo.about)
    .then((resProfile)=>{
      setCurrentUser(resProfile);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }
  function handleUpdateAvatar(newUserInfo){
    api.changeAvatar(newUserInfo.avatar)
    .then((resProfile)=>{
      setCurrentUser(resProfile);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  }
  function handleAddPlaceSubmit(newCardInfo){
    api.addNewCard(newCardInfo.name, newCardInfo.link)
    .then((newCard)=>{
      setCards([newCard, ...cards]); 
      closeAllPopups()
    })
    .catch((err) => {
      console.log(err);
    });
  }

  //Вход, регистрация, авторизация
  function handleUserSignUp(email, password){
    authApi.userSignUp(email, password)
    .then((userData)=>{
      setEmail(userData.data.email);
      setIsLoginCorrect(true);
      navigate('/sign-in', {replace: true});
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(()=>{
      handleInfoTooltip();
    });
  }

  function handleUserSignIn(email, password){
    authApi.userSignIn(email, password)
    .then((data)=>{
      setLoggedIn(true)
      setIsLoginCorrect(true);
      localStorage.setItem('token', data.token);
      navigate('/', {replace: true});
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(()=>{
      handleInfoTooltip();
    });
  }

  function handleUserAuthorization(){
    const jwt = localStorage.getItem('token');
    authApi.userAuthorization(jwt)
    .then((res)=>{
      setEmail(res.data.email);
      setLoggedIn(true);
      navigate('/', {replace: true});
    })
    .catch((err) => {
      console.log(err);
    });
  }
  function handleExitClick(){
    setLoggedIn(false);
    setIsLoginCorrect(false);
  }
  
  
  return (
  <CurrentUserContext.Provider value={currentUser}>
    <Header
    link={headerLink}
    text={headerText}
    isloggedIn={loggedIn}
    onExitClick={handleExitClick}
    email={email}/>
    <Routes>
      <Route path="/" element={
        <ProtectedRouteElement 
          element={Main} 
          loggedIn={loggedIn}
          cards={cards} 
          onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDeleteClick}          
        />
      } />
      <Route path="/sign-up" element={<Register 
      onOpen={handleRegisterOpen} 
      onSubmit={handleUserSignUp}
      />}/>
      <Route path="/sign-in" element={<Login 
      onOpen={handleLoginOpen} 
      onSubmit={handleUserSignIn}
      />}/>
    </Routes>
    <Footer></Footer>
    <EditProfilePopup 
    onClose={closeAllPopups} 
    isOpen={isEditProfilePopupOpen}
    onUpdateUser={handleUpdateUser}/>
    <AddPlacePopup
    onClose={closeAllPopups}
    isOpen={isAddPlacePopupOpen}
    onAddPlace={handleAddPlaceSubmit}/>
    <ImagePopup
      name="image-show"
      card={selectedCard}
      onClose={closeAllPopups}
    ></ImagePopup>
    <EditAvatarPopup
    onClose={closeAllPopups}
    isOpen={isEditAvatarPopupOpen}
    onUpdateAvatar={handleUpdateAvatar}/>
    <ConfirmDeletePopup
    onClose={closeAllPopups}
    isOpen={isConfirmDeletePopupOpen}
    card={cardToRemove}
    onCardDelete={handleCardDelete}>
    </ConfirmDeletePopup>
    <InfoTooltip
    name="info-tool-tip"
    onClose={closeAllPopups}
    isOpen={isInfoTooltipOpen}
    isCorrect={isLoginCorrect}>
    </InfoTooltip>
  </CurrentUserContext.Provider>
  );
}

export default App;
