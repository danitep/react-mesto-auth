import React from "react"
import PopupWithForm from "./PopupWithForm"
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props){

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]); 

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    function handleNameChange(evt){
        setName(evt.target.value);
    }
    function handleDescriptionChange(evt){
        setDescription(evt.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateUser({
          name,
          about: description,
        });
    }

    return (
        <PopupWithForm
            onClose={props.onClose}
            isOpen={props.isOpen}
            onSubmit={handleSubmit}
            name="account-change"
            title="Редактировать профиль"
            buttonText="Сохранить">
            <div className="popup__field-container">
                <input type="text" 
                className="popup__input" 
                id="profile__name__field" 
                name="profile__name" 
                value={name || ''}  
                onChange={handleNameChange}
                placeholder="Имя" 
                required 
                minLength="2" 
                maxLength="40"/>
                <span className="popup__error" id="profile__name__field-error">errortext</span>
            </div>
            <div className="popup__field-container">
                <input type="text" 
                className="popup__input" 
                id="profile__description__field" 
                name="profile__description" 
                value={description || ''}  
                onChange={handleDescriptionChange}
                placeholder="О себе" 
                required 
                minLength="2" 
                maxLength="200"/>
                <span className="popup__error" id="profile__description__field-error">errortext</span>
            </div>
        </PopupWithForm>
    )
}