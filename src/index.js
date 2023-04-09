import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import db from './FireBase/config';
import Context, { Firebasecontext } from './store/FirebaseContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

<Firebasecontext.Provider value={{db}} >
  <Context>
    <App />
  </Context>
</Firebasecontext.Provider>
  </React.StrictMode>
);

//