import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { Toaster } from "sonner"
import App from './App.jsx'
import './index.css'
import store from './store/config/store.js'


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster position="top-center" richColors />
      <App />
    </Provider>
  </StrictMode>
);
