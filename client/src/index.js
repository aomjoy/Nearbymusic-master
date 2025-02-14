import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import ErrorPage from './pages/Errorpage';
import Main from './pages/Main';
import MusicianSignup from './pages/MusicianSignup';
import RestaurantSignup from './pages/RestaurantSignup';
import Login from './pages/Login';
import MHome from './pages/Musician/MHome';
import RHome from './pages/Restaurant/RHome';
import MActivities from './pages/Musician/MActivities';
import RActivities from './pages/Restaurant/RActivities';
import MChat from './pages/Musician/MChat';
import RChat from './pages/Restaurant/RChat';
import MProfile from './pages/Musician/MProfile';
import RProfile from './pages/Restaurant/RProfile';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    errorElement: <ErrorPage/>,
    children: [
      {index: true, element: <Main />},
      {path: "MusicianSignup", element:<MusicianSignup />},
      {path: "RestaurantSignup", element:<RestaurantSignup />},
      {path: "Login", element:<Login />},
      {path: "MHome", element:<MHome />},
      {path: "RHome", element:<RHome />},
      {path: "MActivities", element:<MActivities />},
      {path: "RActivities", element:<RActivities />},
      {path: "MChat", element:<MChat />},
      {path: "RChat", element:<RChat />},
      {path: "MProfile", element:<MProfile />},
      {path: "RProfile", element:<RProfile />},
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
