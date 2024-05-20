<template >
  <div id="app" :class="{'dark' :this.$store.getters.theme,'light': !this.$store.getters.theme}">
    <router-view />
    <div class="bgGreen">
    </div>
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
    }
  },
  data(){
    //light -> true
    return{
      theme : this.$store.getters.theme,
    };
  },
  mounted() {
    this.$store.dispatch("GetFriends");
  },
  
};

</script>


  <style>
.root{
  --bgd: #1a242a;
  --bgl: #ffff;
}
  /* dark  */
    .dark {
      --primary: #111b21;
      --primaryHover : #2a3942;
      --colorPrimary : #ffff;
      --colorSecondary : #8696a0;
      --secondary : #202c33;
      --ternary : #0b141a;
      --notFiBg : #3f5159;
      --userTopDataBg : #111b21;
      --img1ParBg : #111b21;
      --chatBg : #1a242a;
      --bgGreen : #0c1317;
      --bgGreenHeight : 100%;
      --userlistBorCol: ;
      --constrast : #f0f2f5;
    }

    /* light  */

    .light {
      --primary: #ffff;
      --primaryHover : #f0f2f5 ;
      --colorPrimary : black;
      --colorSecondary : #707070;
      --secondary : #f0f2f5;
      --ternary : #f0f2f5;
      --notFiBg : #9de1fe;
      --userTopDataBg : #f0f2f5;
      --img1ParBg :#f8f9fa;
      --chatBg : #e5ddd5;
      --bgGreen : #009688;
      --bgGreenHeight : 127px;
      --userlistBorCol: #b6b6b6;
      --constrast : black;
    }
  </style>



<style>
body{
  background-color: var(--chatBg);
}

#app {
  font-family: "Nunito Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;

}

.bg-white{
  background:var(--primary) !important;
}
.themeBtn{
  color: var(--constrast);
}
input{
  background: transparent !important;
}

.text-dark{
    color: var(--constrast) !important;
}
.bgGreen {
  /* height: 127px; */
  /* background-color: #009688; */
  /* height: 100%; */
  height: var(--bgGreenHeight);
  /* background-color: #0c1317; */
  background: var(--bgGreen);
  position: absolute;
  top: 0;
  right: 0;
  left: 0;

  /* z-index: -1; */
}
.mainContainer {
  display: flex;
  justify-content: center;
  height: 100%;
}
.mainWindow {
  display: flex;
  z-index: 100;
  /* width: 90.8%; */
  width: 1492px;
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
    width: 100% !important;
  }
  .mainWindow {
    width: 92% !important;
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
    height: 42px !important;
  }
  .searchBarparent {
    height: 55px;
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
  color : var(--primary);
}
.leftChat,.rightChat{
  max-width:90% ;
}
}
</style>
