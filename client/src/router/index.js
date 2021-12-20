import Vue from 'vue'
import VueRouter from 'vue-router'

// import Chats from "../components/Chats";
// import Login from "../components/Login";
// import Welcome from "../components/Welcome";
// import UsersList from "../components/UsersList";
// import ChatWindow from "../components/ChatWindow";

Vue.use(VueRouter)

const routes = [
      {
        path: '/',
        name: 'ChatWindow',
        meta: {
            ShowUserlistChats: true
        }      },
    // {
    //     path: '/users',
    //     name: 'UsersList',
    //     meta: {
    //         ShowUserlistChats: true
    //     }
    // },
    {
        path: '/user/id',
        name: 'UsersList',
        meta: {
            ShowUserlistandChatWindow: true
        }
    },
    {
        path: '/login',
        name: "Login",
        meta: {
            ShowLoginAndWelcome: true
        }
    },
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
})

export default router
