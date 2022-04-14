import { LOGIN_ROUTE, REGISTRATION_ROUTE, TABLE_ROUTE } from "./utils/consts";
import Auth from "./pages/Auth";
import Table from "./pages/Table";

export const authRoutes = [
    {
        path:TABLE_ROUTE,
        Component: Table
    },
]

export const publicRoutes = [
    {
        path:LOGIN_ROUTE,
        Component: Auth 
    },
    {
        path:REGISTRATION_ROUTE,
        Component: Auth
    },
]
