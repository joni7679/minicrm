
import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom'
import { router } from './Router/router.jsx'
import AuthConextProvider from './context/AuthContext.jsx'
import LeadContextProvider from './context/LeadsContext.jsx'
createRoot(document.getElementById('root')).render(
  <AuthConextProvider>
    <LeadContextProvider>
      <Toaster />
      <RouterProvider router={router} />
    </LeadContextProvider>
  </AuthConextProvider>

)
