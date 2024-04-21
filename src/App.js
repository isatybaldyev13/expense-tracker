import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Index from "./pages";
import Dashboard from "./pages/dashboard";
import AuthProvider from "./providers/AuthProvider";
import { useAuth } from "./hooks/useAuth";

const AuthenticatedRoute = ({ children }) => {
  const { authUser } = useAuth();

  if (!authUser) return <Navigate to="/" />;

  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/dashboard"
            element={
              <AuthenticatedRoute>
                <Dashboard />
              </AuthenticatedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
