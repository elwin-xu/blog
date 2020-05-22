import React, { Component } from 'react'

class Footer extends Component {
    render() {
        return (
            <div className="footer uk-section">
                <div className="uk-container uk-text-center">
                    <div>Built with React & UIkit, hosted on AWS.</div>
                    <div className="uk-margin-small-top">
                        <a href="https://github.com/zixuan-xu"><span uk-icon="icon: github; ratio: 1.4" /></a>
                        <a className="uk-margin-left" href="https://www.linkedin.com/in/zixuan-xu/"><span uk-icon="icon: linkedin; ratio: 1.4" /></a>
                        <a className="uk-margin-left" href="mailto:zi.xuan.xu@icloud.com"><span uk-icon="icon: email; ratio: 1.4" /></a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer