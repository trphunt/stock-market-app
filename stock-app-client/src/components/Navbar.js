import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../images/green-dollar-sign.jpg';
import './Navbar.css';

const Navbar = props => {
  const {currentUser, onLogout} = props;
  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link to='/' className="navbar-brand">
            <img src={Logo} alt="Stock App Home"/>
            <span>Stock App</span>
          </Link>
        </div>
        {currentUser ?
          <ul className="nav navbar-nav navbar-right">
          <li><a>{currentUser.username}</a></li>
            <li><Link to={`/users/${currentUser.userId}/stocks/new`}>New Stock</Link></li>
            <li><Link to='/signin' onClick={onLogout}>Log out</Link></li>
          </ul> :
          <ul className="nav navbar-nav navbar-right">
            <li><Link to='/signup'>Sign up</Link></li>
            <li><Link to='/signin'>Log in</Link></li>
          </ul>
        }
      </div>
  </nav>
  );
};

export default Navbar;