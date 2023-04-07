import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store';
import Bootstrap from './bootstrap';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Bootstrap />
      <App />
    </Provider>
  </React.StrictMode>,
)
