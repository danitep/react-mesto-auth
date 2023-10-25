import React from 'react';
import Header from './Header';
import Main from './Main'
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';



function App() {

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

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

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmDeletePopupOpen, setConfirmDeletePopupOpen] = React.useState(false);
  
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cardToRemove, setCardToRemove] = React.useState({});
  
  function handleCardClick(card){
    setSelectedCard(card);
  }

  function closeAllPopups(){
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setConfirmDeletePopupOpen(false)
    setSelectedCard({});
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
  
  
  return (
  <CurrentUserContext.Provider value={currentUser}>
    <Header/>
    <Main
      cards={cards} 
      onEditProfile={handleEditProfileClick} 
      onAddPlace={handleAddPlaceClick}
      onEditAvatar={handleEditAvatarClick}
      onCardClick={handleCardClick}
      onCardLike={handleCardLike}
      onCardDelete={handleCardDeleteClick}
    ></Main>
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

  </CurrentUserContext.Provider>
  );
}

export default App;
