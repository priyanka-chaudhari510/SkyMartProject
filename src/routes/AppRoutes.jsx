import React from 'react'
import { createBrowserRouter , RouterProvider } from "react-router";
import AuthLayout from '../layouts/AuthLayout'
import Login from '../pages/Login';
import Register from '../pages/Register';
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import HomePage from '../pages/HomePage';
import Shop from '../pages/Shop';
import About from '../pages/About';
import ProductDetail from '../pages/ProductDetail';
const AppRoutes = () => {
    let router = createBrowserRouter([
        {
            path:"/",
           element:<PublicRoute/>,
           children:[{
            path:"",
             element:<AuthLayout/>,
            children:[
                {
                    path:"",
                    element:<Login/>
                },
                {
                    path:"register",
                    element:<Register/>
                }
            ]
           }]
        },
        {
            path:"/main",
            element:<ProtectedRoute/>,
            children:[{
                path:"",
                element:<MainLayout/>,
                children:[{
                    path:"",
                    element:<HomePage/>

                },
                {
                    path:"shop",
                    element:<Shop/>

                },
                {
                    path:"shop/:id",
                    element:<ProductDetail/>
                },
                {
                    path:"about",
                    element:<About/>

                },
            ]
                
            }]
        }
    ])
  return <RouterProvider router={router}/>
}

export default AppRoutes
