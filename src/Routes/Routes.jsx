import {
    createBrowserRouter,
    RouterProvider,
} from "react-router";
import Layouts from "../MainLayouts/Layouts";
import Home from "../Pages/Home/Home/Home";
import { SiAuthelia } from "react-icons/si";
import AuthLayouts from "../MainLayouts/AuthLayouts/AuthLayouts";
import Login from "../Pages/Authentication/Login/Login";
import Register from "../Pages/Authentication/Register/Register";


export const router = createBrowserRouter([
    {
        path: "/",
        Component: Layouts,
        children: [
            {
                index: true,
                Component: Home
            },

        ]
    },
    {
        path: '/',
        Component: AuthLayouts,
        children: [
            {
                path: '/login',
                Component: Login
            },
            {
                path: '/register',
                Component: Register
            }
        ]
    }
]);
