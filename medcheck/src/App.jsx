import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes/router";
import { AuthProvider } from "@/features/authentication";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
