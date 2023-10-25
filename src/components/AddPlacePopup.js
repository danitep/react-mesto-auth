import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props){
    const nameRef = React.useRef();
    const linkRef = React.useRef();
    function handleSubmit(e){
        e.preventDefault();
        props.onAddPlace({
            name: nameRef.current.value,
            link: linkRef.current.value
        });
    } 
    
    React.useEffect(() => {
        nameRef.current.value='';
        linkRef.current.value='';
    }, [props.isOpen]); 

    return(
        <PopupWithForm
        onClose={props.onClose}
        isOpen={props.isOpen}
        onSubmit={handleSubmit}
        name="image-load"
        title="Новое место"
        buttonText="Создать">
        <div className="popup__field-container">
            <input 
            ref={nameRef} 
            type="text" 
            className="popup__input" 
            id="place__name__field" 
            name="place__name"  
            placeholder="Название" 
            required 
            minLength="2" 
            maxLength="30"/>
            <span className="popup__error" id="place__name__field-error">errortext</span>
        </div>
        <div className="popup__field-container">
            <input 
            ref={linkRef} 
            type="url" 
            className="popup__input" 
            id="place__image__field" 
            name="place__image" 
            placeholder="Ссылка на картинку" 
            required/>
            <span className="popup__error" id="place__image__field-error">errortext</span>
        </div>
        </PopupWithForm>
    )
}