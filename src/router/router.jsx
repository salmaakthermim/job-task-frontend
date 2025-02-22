import React from 'react';

import {
    createBrowserRouter,
  
  } from "react-router-dom";

import Main from '../Layout/Main';
import Login from '../login/Login';
import AddTask from '../pages/AddTask';
import App from '../App';

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
          path: "/",
          element: <App></App>
        },
        {
          path: "/tasks",
          element: <AddTask></AddTask>
        },
      ]
    },
  ]);

export default router;