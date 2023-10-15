import React from 'react';

import ReactDOM from 'react-dom/client';

import { App } from '@/pages/app';
import { Wrappers } from '@/wrappers/wrappers';

import '../reset.d.ts';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Wrappers>
      <App />
    </Wrappers>
  </React.StrictMode>,
);
