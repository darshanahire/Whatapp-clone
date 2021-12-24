<template>
  <div id="app">
    <router-view />
    <div class="bgGreen"></div>
    <div class="mainContainer">
      <div class="mainWindow">
        <UsersList v-if="$route.meta.ShowUserlistChats || $route.meta.ShowUserlistandChatWindow"/>
        <Chats v-if="$route.meta.ShowUserlistChats"/>

        <SignUp v-if="$route.meta.ShowSignUpAndWelcome" />
        <Welcome v-if="$route.meta.ShowLoginAndWelcome" />
        <ChatWindow v-if="$route.meta.ShowUserlistandChatWindow" />
        <Login v-if="$route.meta.ShowLoginAndWelcome" />
      </div>
    </div>
  </div>
</template>

<script>
import UsersList from "./components/UsersList.vue";
import Chats from "./components/Chats";
import ChatWindow from "./components/ChatWindow";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Welcome from "./components/Welcome";

export default {
  name: "App",
  components: {
    UsersList,
    Chats,
    ChatWindow,
    Login,
    Welcome,
    SignUp
  },
};
</script>

<style>
#app {
  font-family: "Nunito Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #d6dbd7 !important;
}
.bgGreen {
  height: 127px;
  background-color: #009688;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  /* z-index: -1; */
}
.mainContainer {
  display: flex;
  justify-content: center;
  height: 100vh;
}
.mainWindow {
  display: flex;
  z-index: 100;
  width: 90.8%;
  background: #f8f9fa;
  margin-top: 19px;
  height: 95%;
  box-shadow: 0px 0px 6px -2px;
}
</style>
