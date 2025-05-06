import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/dashboard/Sidebar";
import useAuthStore from "../../stores/authStore";


export default function Page() {
  const { isAuthenticated } = useAuthStore();

  // Aunque ya tenemos una ProtectedRoute usamos este hook como un double-check :)
  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = "/ingresar";
    }
  }, [isAuthenticated]);


  return (
    <div className="flex h-screen bg-gray-50 ">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}
