import React from 'react';
import cardImg from '../images/flat.jpg';
import { Link } from 'react-router-dom';


const HomePage = () => (
    <div className="uk-section uk-background-primary" style={{"minHeight": "calc(100vh - 60px)"}}>
        <div className="uk-container uk-text-center">
            <h1 className="uk-heading-large uk-text-bold " style={{"color": "white"}}>Learn by doing</h1>
            <p className="uk-text-lead uk-margin" style={{"color": "white"}}>The best way to learn something is through examples</p>
            <Link className="uk-button uk-margin uk-button-default uk-button-large uk-border-pill uk-background-primary" to="/articles-list" style={{"color": "white", "border": "1px solid white"}}>GET STARTED</Link>
        </div>
    </div>

);

export default HomePage;