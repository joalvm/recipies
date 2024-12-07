import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { SourdoughProvider } from './context/sourdough.context.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <SourdoughProvider>
            <App />
        </SourdoughProvider>
    </StrictMode>,
);
