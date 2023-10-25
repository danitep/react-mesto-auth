import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

export default function Card(props){
    function handleClick() {
        props.onCardClick(props.card);
    }
    function handleLikeClick(){
        props.onCardLike(props.card);
    }
    function handleDeleteClick(){
        props.onCardDelete(props.card);
    }
    
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    return(
    <>
        {isOwn && <button className='element__delete' onClick={handleDeleteClick} />} 
        <img 
        src={props.card.link} 
        alt={props.card.name} 
        className="element__image"
        onClick={handleClick}
        />
        <div className="element__info">
            <h2 className="element__title">{props.card.name}</h2>
            <div className="element__container">
                <button 
                className={`element__like ${isLiked ? 'element__like_active':''}`} 
                onClick={handleLikeClick}  
                type="button"></button>
                <p className="element__count">{props.card.likes.length}</p>
            </div>
        </div>
    </>
    
    )
}
