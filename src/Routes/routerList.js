import CreatePage from "../Pages/Admin/Create/CreatePage";
import ListUser from "../Pages/Admin/List/ListUser";
import Login from "../Pages/User/Login/Login";
import Register from "../Pages/User/SignUp/SignUp";

const publicRouter = [
    {
        path: '/login',
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    }
]

const privateRouter = [
    {
        path: '/list',
        element: <ListUser />
    },
    {
        path: '/create',
        element: <CreatePage />
    }
]
export {
    publicRouter,
    privateRouter
}