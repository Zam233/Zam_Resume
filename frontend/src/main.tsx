import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Sober components are Web Components: importing the module registers the tag.
import 'sober/page';
import 'sober/button';
import 'sober/card';
import 'sober/chip';
import 'sober/icon';
import 'sober/icon-button';
import 'sober/navigation';
import 'sober/tab';
import 'sober/tooltip';

import './styles/theme.css';
import './styles/app.css';

import App from './App';

const container = document.getElementById('root');
if (!container) throw new Error('#root is missing from index.html');

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
