
import Main from "../Pages/Admin/DefaultLayout/Main/Main";
import MainUser from "../Pages/User/DefaultLayout/Main/UserMain";
//Route giành cho cả admin và user
const publicRouter = [
    {
        path: "/detail",
        element: <MainUser/>
    },
    {
        path: '/login',
        element: <MainUser />
    },
    {
        path: "/signup",
        element: <MainUser />
    },
    {
        path: "/",
        element: <MainUser/>
    },
    {
        path: "/uploads",
        element: <MainUser/>
    }
]
//Route chỉ giành cho Admin
const privateRouter = [
    {
        path: '/admin_dashboard',
        element: <Main/>
    },
    {
        path: '/admin_dashboard/user',
        element: <Main/>
    },
    {
        path: '/admin_dashboard/image',
        element: <Main/>
    }
]

const AdminPath = {
    UserList : "/admin_dashboard/user",
    MainLayout : "/admin_dashboard",
    Image : "/admin_dashboard/image"
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