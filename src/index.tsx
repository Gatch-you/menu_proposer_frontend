import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { configStore } from './redux/configureStore';
import { Provider } from 'react-redux';
 
axios.defaults.baseURL=process.env.REACT_APP_API_ENDPOINT;
axios.defaults.withCredentials= true;

const store = configStore();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);

