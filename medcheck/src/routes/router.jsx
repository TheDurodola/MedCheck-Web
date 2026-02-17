import AdminDashboard from "@/pages/AdminDashboard";
import ConsumerDashboard from "@/pages/ConsumerDashboard";
import InvestigatorDashboard from "@/pages/InvestigatorDashboard";
import Landing from "@/pages/Landing";
import NotFound from "@/pages/NotFound";
import RetailerDashboard from "@/pages/RetailerDashboard";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import WholesalerDashboard from "@/pages/WholesalerDashboard";
import {createBrowserRouter } from "react-router-dom";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing />,
    },
     {
        path: "/home",
        element: <Landing />,
    },
    {
        path: "/signin",
        element: <SignIn />,
    },
    {
        path: "/signup",
        element: <SignUp />,
    },
    {
        path: "/dashboard/admin",
        element: <AdminDashboard />,
    },
    {
        path: "/dashboard/consumer",
        element: <ConsumerDashboard />,
    },
    {
        path: "/dashboard/wholesaler",
        element: <WholesalerDashboard />,
    },
    {
        path: "/dashboard/investigator",
        element: <InvestigatorDashboard />,
    },
    {
        path: "/dashboard/retailer",
        element: <RetailerDashboard />,
    },
    {
        path: "/*",
        element: <NotFound />,
    },
])

export default router;