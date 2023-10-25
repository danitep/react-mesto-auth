import logoPath from '../images/mesto_logo.svg';

export default function Header(){
    return(
    <header className="header">
      <img className="header__logo" src={logoPath} alt="логотип"/>
    </header>
    )
}