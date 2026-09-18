import { createBrowserRouter } from 'react-router-dom';
import Register from '../pages/auth/Register';
import Login from '../pages/auth/Login';
import Dashbord from '../pages/Dashboard/Dashbord';
import LeadStats from '../pages/Dashboard/components/LeadStats';
import LeadsTable from '../pages/Dashboard/components/LeadsTable';
import LeadForm from '../leads/LeadForm';
import UpdateLeads from '../pages/Dashboard/components/UpdateLeads';
import ProtectedRoute from "../Router/ProtectedRoute"
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute>
                <Dashbord />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <LeadStats />
            },
            {
                path: "leads",
                element: <LeadsTable />
            },
            {
                path: "addleads",
                element: <LeadForm />
            },
            {
                path: "leads/edit/:id",
                element: <UpdateLeads />
            }
        ]
    }
])