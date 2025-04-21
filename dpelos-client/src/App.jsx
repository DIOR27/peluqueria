// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Appointments from "./pages/dashboard/Appointments";
import Settings from "./pages/dashboard/Settings";
import Page from "./pages/dashboard/Page";
import Clients from "./pages/dashboard/Clients";
import Services from "./pages/dashboard/Services";
import Specialists from "./pages/dashboard/Specialists";
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/dashboard',
    Component: Page,
    children: [
      { index: true, Component: Appointments },
      { path: 'settings', Component: Settings },
      { path: 'clients', Component: Clients },
      { path: 'services', Component: Services },
      { path: 'specialists', Component: Specialists },
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
