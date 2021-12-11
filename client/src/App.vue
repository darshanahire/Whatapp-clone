<template>
  <div id="app">
    <div class="bgGreen"></div>
    <div class="mainContainer">
      <div class="mainWindow">
        <UsersList />
        <Chats  class="d-none"/>
        <ChatWindow />
      </div>
    </div>
  </div>
</template>

<script>
import UsersList from "./components/UsersList.vue";
import Chats from "./components/Chats";
import ChatWindow from "./components/ChatWindow";

export default {
  name: "App",
  components: {
    UsersList,
    Chats,
    ChatWindow
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
