import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {

  RouterProvider,
} from "react-router";
import { router } from './Routes/Routes.jsx';
import AuthProvider from './Contexts/AuthProvider/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='font-urbanist'>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>

    </div>
  </StrictMode>,
)
