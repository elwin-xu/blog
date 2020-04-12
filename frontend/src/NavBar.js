import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
    <div>
        <div className="uk-navbar-container">
            <div className="uk-container uk-background-primary">
                <nav data-uk-navbar>
                    <div className="uk-navbar-left">
                        <a className="uk-navbar-item uk-logo" href="/">Zixuan's Tech Blog</a>
                        <ul className="uk-navbar-nav uk-visible@s">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/articles-list">Articles</Link></li>
                            <li><Link to="/about">About</Link></li>
                        </ul>
                    </div>
                    <div className="uk-navbar-right">
                        <ul className="uk-navbar-nav uk-visible@s">
                        <li className="social-link"><a href="https://github.com/zixuan-xu"><span uk-icon="icon: github" /></a></li>
                        <li className="social-link"><a href="https://www.linkedin.com/in/zixuan-xu/"><span uk-icon="icon: linkedin" /></a></li>
                        </ul>
                        <ul className="uk-navbar-nav uk-hidden@s">
                            <li>
                                <button className="uk-button uk-button-text"><span className="uk-navbar-toggle" data-uk-navbar-toggle-icon /></button>
                                <div className="uk-navbar-dropdown">
                                    <ul className="uk-nav uk-navbar-dropdown-nav">
                                        <li><Link to="/">Home</Link></li>
                                        <li><Link to="/articles-list">Articles</Link></li>
                                        <li><Link to="/about">About</Link></li>
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
        <div class="uk-navbar-dropbar"></div>
    </div>

);

export default NavBar;