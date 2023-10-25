import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props){
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
          avatar: avatarRef.current.value
        });
    } 
    
    React.useEffect(() => {
        avatarRef.current.value='';
    }, [props.isOpen]); 

    return(
    <PopupWithForm
        onClose={props.onClose}
        isOpen={props.isOpen}
        onSubmit={handleSubmit}
        name="avatar-change"
        title="Обновить аватар"
        buttonText="Сохранить">
        <div className="popup__field-container">
            <input 
            ref={avatarRef} 
            type="url" 
            className="popup__input" 
            id="avatar__image__field" 
            name="avatar__image" 
            placeholder="Ссылка на картинку"
            required/>
            <span className="popup__error" id="avatar__image__field-error">errortext</span>
        </div>
    </PopupWithForm>
    )
}