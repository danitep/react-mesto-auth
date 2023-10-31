import React from "react";

export default function InfoTooltip(props){
  const errorMessage = "Что-то пошло не так! Попробуйте ещё раз.";
  const correctMessage = "Вы успешно зарегистрировались!";
  return(
  <div className={`popup popup_type_${props.name} ${props.isOpen?'popup_opened':''}`}>
    <div className="popup__container">
      <button className="popup__close" type="button" onClick={props.onClose}></button>
      <div className={`popup__union popup__union_${props.isCorrect? 'correct':'incorrect'}`}></div>
      <h2 className="popup__message">{props.isCorrect? correctMessage : errorMessage}</h2>
    </div>
  </div>
  )
}