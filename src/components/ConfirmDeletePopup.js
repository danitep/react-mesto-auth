import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function ConfirmDeletePopup(props){

    function handleSubmit(e) {
        e.preventDefault();
        props.onCardDelete({
            card: props.card
        });
    } 

    return(
    <PopupWithForm
    onClose={props.onClose}
    isOpen={props.isOpen}
    onSubmit={handleSubmit}
    name="confirm-delete"
    title="Вы уверены?"
    buttonText="Да">
    </PopupWithForm>
    )
}