import React from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

export default function Main(props){

  
  const currentUser = React.useContext(CurrentUserContext);

  return(
  <main className="content">
      <section className="profile">
        <div className="profile__user">
          <div className="profile__avatar-container">
            <img className="profile__avatar" src={currentUser.avatar} alt="Фото профиля"/>
            <button className="profile__avatar-change" onClick={props.onEditAvatar}></button>
          </div>
          <div className="profile__info">
            <div className="profile__container">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button className="profile__edit" type="button" onClick={props.onEditProfile}></button>
            </div>
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add" type="button" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements" aria-label="Набор фотографий в профиле">
        <ul className="elements__grid">
          {props.cards.map((cardInfo)=>{
            return (
            <li className="element" key={cardInfo._id} >
              <Card 
              card={cardInfo}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
              ></Card>
            </li>
            )
          })}
        </ul>
      </section>
  </main>
  
  )
}

