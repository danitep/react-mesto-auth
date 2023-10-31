import React from "react";
import AuthenticationForm from "./AuthenticationForm"

export default function Login(props){
    
    React.useEffect(() => {
        props.onOpen()
    }, ); 

    function handleSubmit(email, password){
        props.onSubmit(email, password);
    }

    return(
        <AuthenticationForm
            onClose={props.onClose}
            isOpen={props.isOpen}
            onSubmit={handleSubmit}
            name="sign-in"
            title="Вход"
            buttonText="Войти">
        </AuthenticationForm>
    )
}