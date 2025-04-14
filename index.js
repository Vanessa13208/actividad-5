import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Obtener el elemento contenedor
const container = document.getElementById('root');

// Crear un root
const root = createRoot(container);

// Renderizar la app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Opcional: Medición de performance
reportWebVitals();