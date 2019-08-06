import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';

// declare var window: any;
const ipc = window.ipcRenderer;//用于两进程之间的通信
ReactDOM.render(<App ipc={ipc} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
