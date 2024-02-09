import CreatePage from "../Pages/Admin/Create/CreatePage";
import ListUser from "../Pages/Admin/List/ListUser";
import Main from "../Pages/Admin/DefaultLayout/Main/Main";
import Content from "../Pages/User/DefaultLayout/Content/Content";
import Login from "../Pages/User/Login/Login";
import SignUp from "../Pages/User/SignUp/SignUp";
import UserDetail from "../Pages/User/UserDetail/UserDetail";
import Create from "../Pages/User/Create/Create";



const publicRouter = [
    {
        path: "/detail",
        element: <UserDetail/>
    },
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
    },
    {
        path: "/uploads",
        element: <Create/>
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
    SignUp : "/signup",
    Upload : "/uploads",
    Detail : "/detail"
}
export {
    publicRouter,
    privateRouter,
    AdminPath,
    UserPath
}