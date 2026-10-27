import AdminDashboard from "@/pages/AdminDashboard";
import ConsumerDashboard from "@/pages/ConsumerDashboard";
import InvestigatorDashboard from "@/pages/InvestigatorDashboard";
import Landing from "@/pages/Landing";
import NotFound from "@/pages/NotFound";
import ManufacturerDashboard from "@/pages/ManufacturerDashboard";
import RetailerDashboard from "@/pages/RetailerDashboard";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import WholesalerDashboard from "@/pages/WholesalerDashboard";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "@/features/authentication";

/** Wraps a page element in ProtectedRoute */
const protect = (element) => <ProtectedRoute>{element}</ProtectedRoute>;

const router = createBrowserRouter([
  // ── Public routes ──────────────────────────────────────────
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

  // ── Protected dashboard routes ──────────────────────────────
  {
    path: "/dashboard/admin",
    element: protect(<AdminDashboard />),
  },
  {
    path: "/dashboard/manufacturer",
    element: protect(<ManufacturerDashboard />),
  },
  {
    path: "/dashboard/consumer",
    element: protect(<ConsumerDashboard />),
  },
  {
    path: "/dashboard/wholesaler",
    element: protect(<WholesalerDashboard />),
  },
  {
    path: "/dashboard/investigator",
    element: protect(<InvestigatorDashboard />),
  },
  {
    path: "/dashboard/retailer",
    element: protect(<RetailerDashboard />),
  },

  // ── Fallback ────────────────────────────────────────────────
  {
    path: "/*",
    element: <NotFound />,
  },
]);

export default router;
