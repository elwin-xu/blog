import React from 'react';

const AboutPage = () => (
    <div className="uk-container uk-container-small">
        <h1>About me</h1>
        <p>
            I'm a web developer currently residing in Sydney.
        </p>
        <p>
            <div className="uk-child-width-1-2@s" data-uk-grid>
                <div>
                    <pre className="uk-resize-vertical">
                        <code>
                            &lt;!-- Resize vertically --&gt;
                            &lt;div uk-grid&gt;
                            &lt;div class="uk-width-1-2"&gt;...&lt;/div&gt;
                            &lt;div class="uk-width-1-2"&gt;...&lt;/div&gt;
                            &lt;/div&gt;

                            &lt;div class="uk-child-width-1-2" uk-grid&gt;
                            &lt;div&gt;&lt;/div&gt;
                            &lt;div&gt;&lt;/div&gt;
                            &lt;/div&gt;
            </code>
                    </pre>
                </div>
                <div>
                    <pre className="uk-resize">
                        <code>
                            &lt;!-- Resize horizontally and vertically --&gt;
                            &lt;div uk-grid&gt;
                            &lt;div class="uk-width-1-2"&gt;...&lt;/div&gt;
                            &lt;div class="uk-width-1-2"&gt;...&lt;/div&gt;
                            &lt;/div&gt;

                            &lt;div class="uk-child-width-1-2" uk-grid&gt;
                            &lt;div&gt;&lt;/div&gt;
                            &lt;div&gt;&lt;/div&gt;
                            &lt;/div&gt;
                        </code>
                    </pre>
                </div>
            </div>
            </p>
    </div>
);

export default AboutPage;