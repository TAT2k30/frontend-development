import CreatePage from "../Pages/Admin/Create/CreatePage";
import ListUser from "../Pages/Admin/List/ListUser";
import Content from "../Pages/User/DefaultLayout/Content/Content";
import Login from "../Pages/User/Login/Login";
import SignUp from "../Pages/User/SignUp/SignUp";


const publicRouter = [
    {
        path: '/login',
        element: <Login />
    },
    {
        path: "/signup",
        element: <SignUp />
    },
    {
        path: "/",
        element: <Content/>
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