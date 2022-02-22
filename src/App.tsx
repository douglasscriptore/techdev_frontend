import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ToastContainer from './components/ToastContainer';
import AppProvider from './hooks';
import Routes from './routes';
import { GlobalStyle } from './styles/global';

const App: React.FC = () => (
  <BrowserRouter>
    <AppProvider>
      <Routes />
    </AppProvider>
    <GlobalStyle />
    <ToastContainer autoClose={3000} />
  </BrowserRouter>
);
export default App;
