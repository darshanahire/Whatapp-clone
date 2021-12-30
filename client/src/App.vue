<template>
  <div id="app">
    <router-view />
    <div class="bgGreen"></div>
    <div class="desktop mainContainer" v-if="isMinMd">
      <div class="mainWindow">
        <UsersList
          v-if="
            $route.meta.ShowUserlistChats ||
            $route.meta.ShowUserlistandChatWindow
          "
        />
        <Chats v-if="$route.meta.ShowUserlistChats" />
        <SignUp v-if="$route.meta.ShowSignUpAndWelcome" />
        <Welcome v-if="false" />
        <ChatWindow v-if="$route.meta.ShowUserlistandChatWindow" />
        <Login v-if="$route.meta.ShowLoginAndWelcome" />
      </div>
    </div>
    <div class="mobile mainContainer" v-else>
      <div class="mainWindow">
        <UsersList
          v-if="$route.meta.showonlyuserlist && this.$store.getters.me != ''"
        />
        <Login v-else-if="$route.meta.showOnlyLogin" />
        <Welcome v-else-if="this.$store.getters.me == '' && !$route.meta.onlySignup" />
         <SignUp v-if="$route.meta.onlySignup" />
        <!-- <Chats  v-if="$route.meta.ShowUserlistChats"  /> -->
        <ChatWindow
          v-if="$route.meta.ShowonlychatWindow && this.$store.getters.me != ''"
        />
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
    SignUp,
  },
  computed: {
    getWidth() {
      return window.innerWidth;
    },
  },
  mounted() {
    this.$store.dispatch("GetFriends");
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
@media screen and (min-width: 768px) {
  .desktop {
    display: flex;
  }
  .mobile {
    display: none;
  }
}
@media screen and (max-width: 768px) {
  .container {
    width: 90% !important;
  }
  .desktop {
    display: none;
  }
  .mobile {
    display: flex;
  }
  .mobileDevise {
    display: none !important;
  }
  .welcomeWidow {
    display: none !important;
  }
  .usersList {
    width: 100%;
  }
  .chatWindowWidth {
    width: 100%;
  }
  .mainWindow {
    display: block;
    height: 90% !important;
  }
  .searchBarHeight {
    height: 45px !important;
  }
  .searchBarparent {
    margin: 10px auto;
  }
  .ppInfo {
    font-size: 15px;
    margin-top: 90px !important;
  }
  .welcomeHeading {
    font-size: 33px;
  }
  .welcomeImg {
    width: 300px;
    margin: auto 0;
  }
  .agreeNContinueBtn {
    font-size: 15px;
    height: 45px;
    width: 300px;
    margin-top: 10px;
  }
  .greenLine {
    margin-top: 30px !important;
  }
  /* chatWindow */
  .mainchatWindow {
    height: 100%;
  }
  .userTopData {
    height: 70px;
  }
  .topEncrpMsg {
    width: 90%;
    padding: 10px 5px !important;
    color: gray !important;
  }
  .chatingdatadiv {
    height: 70px;
  }
  .InputBar {
    height: 45px;
    font-size: 16px;
  }
  .emoji-picker {
    bottom: 100px;
    width: 85%;
  }
  .cameraParent {
    right: 140px;
    height: 50px;
    width: 50px;
  }
  .nameChange,
.abouthange {
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

}
</style>
