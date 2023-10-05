import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import './index.css';
import { PersistGate } from 'redux-persist/integration/react';
import MUIWrapper from './Providers/MUIProvider';
import { CssBaseline } from '@mui/material';

const container: HTMLElement = document.getElementById('root')!;
const root: Root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <MUIWrapper>
            <CssBaseline />
            <App />
          </MUIWrapper>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
