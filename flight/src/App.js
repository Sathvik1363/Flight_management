import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Admin from './Admin';
import User from './User';
import Web from './Web';
function App() {
  const router = createBrowserRouter([
    {
      path: "admin",
      element:<Admin/>
    },
    {
      path: "web",
      element:<Web/>
    },
    {
      path: "",
      element:<Admin/>
    },
    {
      path: "user",
      element:<User/>
    },
  ]);
  return (
    <div>
          <RouterProvider router={router} />
    </div>
  );
}

export default App;
