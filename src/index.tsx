import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { AppProvider } from './context/AppContext';
import './styles/index.scss';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <AppProvider>
    <App />
  </AppProvider>,
);
