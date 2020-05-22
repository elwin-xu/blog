import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import '../node_modules/uikit/dist/css/uikit.min.css';

import { v4 as uuidv4 } from 'uuid';
if (window.localStorage.getItem('uuid') == null){
    window.localStorage.setItem("uuid", uuidv4());
}

// loads the Icon plugin
UIkit.use(Icons);

UIkit.icon.add({
    "email": `

    <svg width="20" height="20" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
<g>
   <g>
       <path d="M464,64h-16H64H48C21.504,64,0,85.504,0,112v16v256v16c0,26.496,21.504,48,48,48h16h384h16c26.496,0,48-21.504,48-48v-16
           V128v-16C512,85.504,490.496,64,464,64z M407.488,96L256,215.616L104.512,96H407.488z M448,416H64V148.672l192,147.68L448,148.64
           V416z"/>
   </g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>

    `
})

// components can be called from the imported UIkit reference
//UIkit.notification('Hello world.');


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
