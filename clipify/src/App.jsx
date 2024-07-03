import { Link, RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/app-layout";
import Auth from "./pages/Auth";
import Landing from "./pages/Landing";
import LinkUrl from "./pages/LinkUrl";
import { RedirectLink } from "./pages/Redirect-Link";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./Error/error-page";
import UrlProvider from "./context";
import RequireAuth from "./require-auth";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/link/:id",
        element: (
          <RequireAuth>
            <LinkUrl />
          </RequireAuth>
        ),
      },
      {
        path: "/:id",
        element: <RedirectLink />,
      },
      {
        path: "/dashboard",
        element: (
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        ),
      },
    ],
    errorElement: <ErrorPage />,
  },
]);
function App() {
  return (
    <UrlProvider>
      <RouterProvider router={router} />
    </UrlProvider>
  );
}

export default App;
