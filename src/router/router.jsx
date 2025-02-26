import React from 'react';

import {
    createBrowserRouter,
  
  } from "react-router-dom";

import Main from '../Layout/Main';
import Login from '../login/Login';
import AddTask from '../pages/AddTask';
import App from '../App';
import Register from '../login/Register';
import PrivateRoute from './PrivateRoute';

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: "/login",
          element: <Login></Login>,
        },
        {
          path: '/register',
          element: <Register></Register>
      },
        {
          path: "/",
          element: <App></App>
        },
        {
          path: "/tasks",
          element: <PrivateRoute><AddTask></AddTask></PrivateRoute>
        },
      ]
    },
  ]);

export default router;