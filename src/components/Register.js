import React from "react"
import { Link } from "react-router-dom";
import AuthenticationForm from "./AuthenticationForm"

export default function Register(props){

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
            name="sign-up"
            title="Регистрация"
            buttonText="Зарегистрироваться">
            <span className="authentication__alternative">
                Уже зарегистрированы? 
                <Link 
                className="authentication__link"
                to="/sign-in"> Войти</Link>
            </span>
        </AuthenticationForm>
    )
}