import React from 'react';
import ReactDOM from 'react-dom/client'; // manipular DOM html
import { Provider } from 'react-redux'; // guardar store
import store from './redux/store/store.js'; // store global
import { BrowserRouter } from 'react-router-dom'; // rutas
import App from './App.js'; // componente App
import reportWebVitals from './reportWebVitals';
import "./components/styles/index.css"; // estilos
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
        <App />
    </Provider>
      </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
