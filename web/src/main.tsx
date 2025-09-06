import { StrictMode } from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.tsx';


const GOOGLE_CLIENT_ID = "464765344464-be8j4b5mbgbbddsu3h3hsrqc4lpi1l3m.apps.googleusercontent.com"; // Substitua pelo seu Client ID do Google

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);