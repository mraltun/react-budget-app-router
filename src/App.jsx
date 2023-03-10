import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Dashboard, { dashboardLoader } from "./pages/Dashboard";
import Main, { mainLoader } from "./layouts/Main";
import Error from "./pages/Error";
import { logoutAction } from "./actions/logout";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        errorElement: <Error />,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
  // {
  //   path: "*",
  //   element: <Error />,
  // },
]);

const App = () => {
  return (
    <div className='App'>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
};

export default App;
