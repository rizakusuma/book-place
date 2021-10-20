import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Library from "./pages/Library";

export const routings = [
    {
        path:'/',
        component:Home,
        exact:true,
        name:'home',
        useLayout:true,
        isPrivate:false
    },
    {
        path:'/login',
        component: Login,
        exact:true,
        name:'login',
        useLayout:true,
        isPrivate:false
    },
    {
        path:'/register',
        component: Register,
        exact:true,
        name:'register',
        useLayout:true,
        isPrivate:false
    },

    {
        path:'/cart',
        component:Cart,
        exact:true,
        name:'cart',
        useLayout:true,
        isPrivate:true,
    },
    {
        path:'/library',
        component:Library,
        exact:true,
        name:'library',
        useLayout:true,
        isPrivate:true,
    },
]