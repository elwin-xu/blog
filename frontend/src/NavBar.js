import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
    <nav className="uk-navbar-container" uk-navbar="true">
        <div className="uk-navbar-center ">
            <ul className="uk-navbar-nav">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/articles-list">Articles</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
        </div>
    </nav>
);

export default NavBar;