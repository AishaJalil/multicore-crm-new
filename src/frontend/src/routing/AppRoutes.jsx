import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Layout from "../components/layout/Layout";
import Dashboard from "../pages/dashboard/Dashboard";
import Leads from "../pages/crm/Leads";
import Customers from "../pages/crm/Customers";
import Deals from "../pages/crm/Deals";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />

            <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="crm/leads" element={<Leads />} />
                <Route path="crm/customers" element={<Customers />} />
                <Route path="crm/deals" element={<Deals />} />
            </Route>
        </Routes>
    );
}

export default AppRoutes;
