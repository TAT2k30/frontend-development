import CreatePage from "../Pages/Create/CreatePage";
import ListUser from "../Pages/List/ListUser";
import Login from "../Pages/Login/Login";

const publicRouter = [
    {
        path :'/login',
        element : <Login/>
    },
]

const privateRouter = [
    {
        path : '/list',
        element : <ListUser/>
    },
    {
        path: '/create',
        element: <CreatePage/>
    }
]
export{
    publicRouter,
    privateRouter
}