import React from "react";

export default function AuthenticationForm(props){
  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  function handleSubmit(e){
      e.preventDefault();
      props.onSubmit(emailRef.current.value, passwordRef.current.value)
  } 
  
  React.useEffect(() => {
      emailRef.current.value='';
      passwordRef.current.value='';
  }, []); 

  return(
    <div className={'authentication'}>
      <h2 className="authentication__title">{props.title}</h2>
      <form className="authentication__form" id='confirm_form' name={`props.name`} onSubmit={handleSubmit}>
        <div className="authentication__field-container">
            <input 
            ref={emailRef} 
            type="email" 
            className="authentication__input" 
            id="email__field" 
            name="email" 
            placeholder="Email"
            required/>
            <span className="authentication__error" id="email__field-error">errortext</span>
        </div>
        <div className="authentication__field-container">
            <input 
            ref={passwordRef} 
            type="password" 
            className="authentication__input" 
            id="password__field" 
            name="password" 
            placeholder="Пароль"
            required/>
            <span className="authentication__error" id="password__field-error">errortext</span>
        </div>
        <button className="authentication__button" type="submit">{props.buttonText}</button>
      </form>
      {props.children}
    </div>
  )
}