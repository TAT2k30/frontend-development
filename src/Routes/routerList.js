import CreatePage from "../Pages/Admin/Create/CreatePage";
import ListUser from "../Pages/Admin/List/ListUser";
import Main from "../Pages/Admin/DefaultLayout/Main/Main";
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
    },
    {
        path: '/admin_dasboard',
        element: <Main/>
    }
]

const AdminPath = {
    UserList : "/admin_dasboard/UserList",
    UserCreate : "/admin_dasboard/UserCreate",
    MainLayout : "/admin_dasboard"
}
const UserPath = {
    MainLayout : "/",
    Login : "/login",
    SignUp : "Signup"
}
export {
    publicRouter,
    privateRouter,
    AdminPath,
    UserPath
}