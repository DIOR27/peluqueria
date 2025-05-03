import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/dashboard/Sidebar";
import useAuthStore from "../../stores/authStore";
import { useNavigate } from "react-router-dom";


export default function Page() {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  // Aunque ya tenemos una ProtectedRoute usamos este hook como un double-check :)
  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = "/ingresar";
    }
  }, [isAuthenticated, navigate]);


  return (
    <div className="flex h-screen bg-gray-50 ">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}
