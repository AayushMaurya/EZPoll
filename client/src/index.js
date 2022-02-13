import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from "./redux/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
  {/* need to define the store used in the application */}
  <Provider store={store}> 
    <h1>Hello</h1>             
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

