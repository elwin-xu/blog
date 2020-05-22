import React, { Component } from 'react';
const profile = require("../images/aboutme.JPG")

class AboutPage extends Component {
    constructor(props) {
        super(props)
        this.state = { terms: null }
    }

    async componentWillMount() {
        let res = await fetch('static/posts/000/post.md');
        let text = await res.text();
        this.setState({ terms: text });
    }

    render() {
        return (
            <div className="uk-section aboutpage">
                <div className="uk-container uk-container-small">
                    <div class="uk-child-width-expand@s uk-flex-middle" data-uk-grid>
                        <div>
                            <img data-src={profile} alt="profile" height="1368" width="900" uk-img="" />
                        </div>
                        <div className="">
                            <h1>Hi! I'm Zixuan Xu.</h1>
                            <p className="uk-text-lead">Graduated from one of the top universities in China, I started my career as a software engineer in a leading consulting firm in China developing structural design software for professional civil engineers. I'm currently residing in Sydney, Australia, and open to job opportunities.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AboutPage;