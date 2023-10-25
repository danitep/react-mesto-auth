export default function ImagePopup(props){
  
  return(
    <div className={`popup popup_type_${props.name} ${props.card.link?'popup_opened':''}`} id="image-show">
      <div className="popup__container popup__container_type_imageboard">
        <button className="popup__close" type="button" onClick={props.onClose}></button>
        <img 
        className="popup__image" 
        src={props.card.link} 
        alt={props.card.name}
        />
        <p className="popup__text">{props.card.name}</p>
      </div>
    </div>
    )
}