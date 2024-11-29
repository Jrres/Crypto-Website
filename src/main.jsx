import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "./ParallaxEffect.css"; // For styling
import App from './App.jsx'

import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

createRoot(document.getElementById('root')).render(
  <Web3ReactProvider getLibrary={getLibrary}>
  <StrictMode>
    <App />
  </StrictMode>
  </Web3ReactProvider>
  ,
)
