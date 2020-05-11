import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => (
    <div>
        <div className="uk-navbar-container">
            <div className="uk-container uk-background-primary">
                <nav data-uk-navbar>
                    <div className="uk-navbar-left">
                        <a className="uk-navbar-item uk-logo" href="/">Zixuan's Tech Blog</a>
                        <ul className="uk-navbar-nav uk-visible@s">
                            <li><NavLink exact activeClassName="navbar-nav-active" to="/">Home</NavLink></li>
                            <li><NavLink activeClassName="navbar-nav-active" to="/articles">Articles</NavLink></li>
                            {/* <li><NavLink activeClassName="navbar-nav-active" to="/about">About</NavLink></li> */}
                        </ul>
                    </div>
                    <div className="uk-navbar-right">
                        <ul className="uk-navbar-nav uk-visible@s">
                            <li className="social-link"><a href="https://github.com/zixuan-xu"><span uk-icon="icon: github; ratio: 1.4" /></a></li>
                            <li className="social-link"><a href="https://www.linkedin.com/in/zixuan-xu/"><span uk-icon="icon: linkedin; ratio: 1.4" /></a></li>
                        </ul>
                        <ul className="uk-navbar-nav uk-hidden@s">
                            <li>
                                <button className="uk-button uk-button-link"><span className="uk-navbar-toggle" data-uk-navbar-toggle-icon /></button>
                                <div className="uk-navbar-dropdown uk-background-primary uk-border-rounded">
                                    <ul className="uk-nav uk-navbar-dropdown-nav">
                                        <li><NavLink exact activeClassName="navbar-nav-active" to="/">Home</NavLink></li>
                                        <li><NavLink activeClassName="navbar-nav-active" to="/articles">Articles</NavLink></li>
                                        {/* <li><NavLink activeClassName="navbar-nav-active" to="/about">About</NavLink></li> */}
                                        <li className="uk-nav-divider"></li>
                                        <div className="uk-grid-small" data-uk-grid>
                                            <div>
                                                <li className="social-link"><a href="https://github.com/zixuan-xu"><span uk-icon="icon: github" /></a></li>
                                            </div>
                                            <div>
                                                <li className="social-link"><a href="https://www.linkedin.com/in/zixuan-xu/"><span uk-icon="icon: linkedin" /></a></li>
                                            </div>
                                        </div>
                                    </ul>
                                </div>
                            </li>
                        </ul>

                    </div>
                </nav>
            </div>
        </div>
        <div className="uk-navbar-dropbar"></div>
    </div>

);

export default NavBar;