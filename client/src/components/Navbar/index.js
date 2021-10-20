import React,{useState} from "react";
import { Link } from 'react-router-dom';
import {useStoreAuth} from '../../utils/useAuth';
import { NavbarStyle, WrapperHamburger, HamburgerIcon } from "./style";
import Logo from '../../assets/icon/logo.svg';

const Navbar = ({handleLogout}) => {
  const { state } = useStoreAuth();
  const [open, setOpen] = useState(false);
  const authIsLoaded = state.token && state.username;
  
  const toggleHamburger = () => {
    setOpen(!open);
  };

  return <NavbarStyle open={open}>
    <div className="header-base">
      <div className="header-logo">
        <img src={Logo} alt="Logo" height="50px" />
        {
        authIsLoaded &&  
          <div to="partner" className="header-item">
            Welcome, {state.username}
          </div>  
        }
       
        <WrapperHamburger open={open} onClick={toggleHamburger}>
            <HamburgerIcon />
         </WrapperHamburger>
      </div>
      {
        authIsLoaded ? 
        <div className="header-items-container">   
          <Link to="/" className="header-item">
              Home
            </Link>     
            <Link to="/library" className="header-item">
              My Books
            </Link>
            <Link to="/cart" className="header-item">
              Cart
            </Link>       
            <span onClick={handleLogout} className="header-item">
              Logout
            </span>  
            <span className="header-item">
              Coin: {state.coin}
            </span>  
  
        </div>
        :
        <div className="header-items-container">
          <Link to="/" className="header-item">
           Home
          </Link>     
          <Link to="/login" className="header-item">
            Login
          </Link>  
        </div>


      }
           
    
    </div>
  </NavbarStyle>
}

export default Navbar;