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
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashBoard from "../MainLayouts/DashBoardLayout/DashBoard";
import MyParcels from "../Pages/MyParcels/MyParcels";


export const router = createBrowserRouter([
    {
        path: "/",
        Component: Layouts,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/sendparcel',
                Component: SendParcel,
                loader: () => fetch('../../data/warehouses.json')
            }

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
    },
    {
        path: '/dashboard',
        Component: DashBoard,
        children: [
            {
                index: true,
                Component: MyParcels
            }
        ]

    }
]);
