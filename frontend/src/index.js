import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { App } from './root-cmp'
import './assets/styles/main.scss'
import { ProSidebarProvider } from 'react-pro-sidebar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
