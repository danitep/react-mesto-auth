import logoPath from '../images/mesto_logo.svg';
import { Link } from 'react-router-dom';

export default function Header(props){

  function handleClick(){
    localStorage.removeItem('token');
    props.onExitClick();
  }

  return(
  <header className="header">
    <img className="header__logo" src={logoPath} alt="логотип"/>
    <div className="header__link-container">
      <p className="header__email">{props.isloggedIn? props.email:''}</p>
      <Link className="header__link" to={!props.isloggedIn? props.link: '/sign-in'} onClick={handleClick}>{!props.isloggedIn? props.text:'Выйти'}</Link>
    </div>
    
  </header>
  )
}