import React, { Component } from 'react';

class AboutPage extends Component {
    constructor(props) {
        super(props)
        this.state = { terms: null }
    }

    async componentWillMount() {
        let res = await fetch('static/posts/000/post.md');
        let text = await res.text();
        this.setState({terms:text});
    }

    render() {
        return (
            <div className="uk-section">
                <div className="uk-container uk-container-small">
                    <p>I'm a web developer currently residing in Sydney.</p>
                </div>
            </div>
        );
    }
}

export default AboutPage;