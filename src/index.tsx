import * as React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';
import App from './App';

import './style/index.scss';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyBuCfN5JL9WAQx7DsaKdvkI8VWPvOUYl3A',
    authDomain: 'react-moviechatapp.firebaseapp.com',
    projectId: 'react-moviechatapp',
    storageBucket: 'react-moviechatapp.appspot.com',
    messagingSenderId: '652241990319',
    appId: '1:652241990319:web:ebc52cdcd784cbbcf31a5a'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

