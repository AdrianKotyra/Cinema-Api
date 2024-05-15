import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>
    {/* <StartRating maxRating={10} size={30} className={'test'} defaultRating={0}/>
    <StartRating maxRating={5} size={60} messages={['Terrible', 'Bad', 'Medium', 'Good', 'Perfect']}/> */}
  </React.StrictMode>
);

