import { Link, RouterProvider, createBrowserRouter } from "react-router-dom"
import AppLayout from "./layouts/app-layout"
import Auth from "./pages/Auth"
import Landing from "./pages/Landing"
import LinkUrl from "./pages/LinkUrl"
import { RedirectLink } from "./pages/Redirect-Link"
import Dashboard from "./pages/Dashboard"
import ErrorPage from "./Error/error-page"

const router = createBrowserRouter([
  {
    element:<AppLayout />,
    children : [
      {
        path:'/auth',
        element:<Auth />
      },
      {
        path:'/',
        element:<Landing />
      },
      {
        path:'/link/:id',
        element:<LinkUrl />
      },
      {
        path:'/:id',
        element:<RedirectLink />
      },
      {
        path:'/dashboard',
        element:<Dashboard />
      }
    ],
    errorElement: <ErrorPage />
  }
])
function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
