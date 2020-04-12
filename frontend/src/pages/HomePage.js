import React from 'react';
import cardImg from '../images/flat.jpg';

const HomePage = () => (
    <div className="uk-section">
        <div className="uk-container">
            <div className="uk-child-width-1-2@s uk-child-width-1-3@l" data-uk-grid uk-height-match="target: .uk-card-body; row: true">
                <div>
                    <div className="uk-card uk-card-default">
                        <div className="uk-card-media-top">
                            <img src={cardImg} alt="" />
                        </div>

                        <div className="uk-card-body">
                            <h3 className="uk-card-title">Title</h3>
                            <p >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                        </div>
                        <div className="uk-card-footer">
                            Read More
                        </div>
                    </div>
                </div>
                <div>
                    <div className="uk-card uk-card-default">
                        <div className="uk-card-media-top">
                            <img src={cardImg} alt="" />
                        </div>

                        <div className="uk-card-body uk-text-left">
                            <h3 className="uk-card-title">Title</h3>
                            <p >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                        </div>
                        <div className="uk-card-footer">
                            Read More
                        </div>
                    </div>
                </div>
                <div>
                    <div className="uk-card uk-card-default">
                        <div className="uk-card-media-top">
                            <img src={cardImg} alt="" />
                        </div>

                        <div className="uk-card-body uk-text-left">
                            <h3 className="uk-card-title">Title</h3>
                            <p >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                        </div>
                        <div className="uk-card-footer">
                            Read More
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

);

export default HomePage;