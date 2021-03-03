import * as React from 'react';
import ReactDOM from 'react-dom';

import firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from './db/config';

import App from './App';

import './style/index.scss';


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

