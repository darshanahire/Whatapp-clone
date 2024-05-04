<template>
  <div class="usersList">
    <div class="userData row mx-0">
      <div class="col-4 d-flex justify-content-start align-items-center" :title="user!=null?user.name:''">
        <router-link to="/login"><ProfileImg :dp="user!=null?user.dp:null"/></router-link>
<!-- <p class="px-3 d-md-none">{{user!=null?user.name:''}}</p> -->
      </div>
      <div class="col-8 d-flex justify-content-end align-items-center font-15">
        <input class="themeBtn pointer mt-1" type="button" value="ChangeTheme" @click="SwitchTheme">
        <!-- <img title="change Theme" class="pointer mx-3" style="height:30px" src="@/assets/theme.png" alt="img1"> -->
        <img title="Communities" class="pointer mx-3" style="height:30px" src="@/assets/community2.png" alt="img1">
        <img title="Status" class="pointer mx-3" style="height:25px" src="@/assets/status2.png" alt="img1">
        <img title="New chat" class="pointer mx-3" style="height:25px" src="@/assets/new chat2.png" alt="img1">
        <!-- <img class="mx-2" src="@/assets/search.png" alt="img1"> -->
        <!-- <i class="fas fa-circle-notch fa-lg mx-3 iconcolor"></i>
        <i class="fas fa-comment-alt fa-lg mx-3 iconcolor"></i> -->
        <i class="fas fa-ellipsis-v fa-lg mx-3 iconcolor pointer" @click="logout" title="Logout"></i>
      </div>
    </div>
    <div class="notificationData">
      <div class="row mx-0 my-auto h-100 align-items-center">
        <div class="col-2">
          <div class="desktopNotify font-14 mx-1">
            <i class="fas fa-bell-slash fa-lg" style="color: #9de1fe"></i>
          </div>
        </div>
        <div class="col-10 text-start">
          <p class="m-0 colorPriSec">Get notified of new messages</p>
          <p class="font-14 m-0">Turn on desktop notifications</p>
        </div>
      </div>
    </div>
    <div class="searchparent font-14 searchBarparent">
      <div class=" mx-2 searchChild searchBarHeight">
        <!-- <i class="fas fa-search mx-3 colorDark"></i> -->
           <img class="mx-2" src="@/assets/search2.png" alt="" height="20" />
        <!-- <input type="text" class="searchBar" /> -->
        <input
          type="text"
          class="searchBar mx-3"
          placeholder="Search or start new chat"
        />
      </div>
         <img title="Unread chat filter" class="mr-2 pointer" src="@/assets/sort.png" alt="" height="23" />
    </div>
    <hr class="hr" />
    <div class="lists">
      <span v-for="(user, id) in AllUsers" :key="id">
        <SingleGroup
          v-if="user._id !== me"
          :user="user"
          :id="user._id"
          :key="id"
        />
        <hr class="hr" />
      </span>
    </div>
  </div>
</template>
<script>
import SingleGroup from "./SingleGroup";
import ProfileImg from "./Profileimg";

import http from "../services/https.vue";
export default {
  name: "UsersList",
  components: {
    SingleGroup,
    ProfileImg,
  },
  data() {
    return {
      AllUsers: [],
      me: "",
      user:{},
      theme: JSON.parse(localStorage.getItem("wpTheme")),
    };
  },
  async created() {
    this.AllUsers = await http.getAllUsers();
    this.me = localStorage.getItem("Wuser");
    this.theme = JSON.parse(localStorage.getItem("wpTheme"))
    this.user = await http.getUser(this.me);  
    this.$store.dispatch("Setme", this.me);
    this.$store.dispatch("SetUser", this.user);
    this.$store.dispatch("setTheme", this.theme);
    this.$store.dispatch("GetFriends");
    this.$socket.client.emit("adduser", this.me);
    this.$socket.client.on("getMessage", (data) => {
      this.socketMsg = data.text;
      if (this.$route.path != `/user/${data.senderId}`) {
        this.$store.dispatch("upadateSeenMsgs", {
          id: data.senderId,
          text: data.text,
        });
      }
    });
  },
  mounted: function () {
    this.$socket.client.on("getusers", (users) => {
      this.$store.dispatch("SetonlineUsers", users);
    });
    this.$socket.client.on("sendertyping", (payload) => {
      this.$store.dispatch("setfriendTyping", payload.senderId);
    });
    //  this.$socket.client.on("getMessage", (data) => {
    //     this.socketMsg = data.text;
    //       this.$store.dispatch("upadateSeenMsgs", {id:data.senderId,text:data.text});
    // })
  },
  methods: {
    logout() {
      alert("logout successful...");
      // this.$store.reset();
      localStorage.clear();
      this.$router.push("/login");
    },
    SwitchTheme : function(){
      this.theme = !this.theme;
      localStorage.setItem('wpTheme', this.theme);
      this.$store.dispatch("setTheme", this.theme);
      
    }
  },
};
</script>

<style >
.pointer{
  cursor: pointer;
}
a {
  color: black !important;
  text-decoration: none;
}
.usersList {
  overflow: hidden;
  width: 30%;
  height: 100%;
  border-right:1px solid var(--userlistBorCol);
}
.userData {
  height: 60px;
  /* background: #f0f2f5; */
  background: var(--userTopDataBg);

  display: flex;
  justify-content: center;
  align-items: center;
}
.iconcolor {
  color: #51585c !important;
}
.colorPriSec{
  color : var(--colorPrimary)
}
.notificationData {
  height: 90px;
  /* background: #9de1fe; */
  /* background: #5d727b; */
  background: var(--notFiBg);
  /* display: none; */
}
.desktopNotify {
  height: 45px;
  width: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5fcff;
  border-radius: 50%;
}
.searchparent {
  height: 48px;
  /* background: #f6f6f6; */
  /* background: white; */
    background: var(--primary);
  display: flex;
  justify-content: center;
  align-items: center;
}
.searchChild {
  height: 35px;
  width: 95%;
  /* background: #ffff; */
  /* background: #f0f2f5; */
  background: var(--secondary);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.searchBar {
  outline: none;
  border: none;
  border-radius: 10px;
  height: 35px;
  width: 95%;
  /* background: #f0f2f5; */
   /* background: #202c33; */
   background: var(--secondary);
  font-size: 14px;
}
.lists {
  height: 100%;
  background: var(--primary);
  overflow: scroll;
  padding-bottom: 20px;
}
::-webkit-scrollbar {
  display: none;
}
.hr {
  width: 100%;
  margin: 0;
  color: #b6b6b6;
}
.font-15 {
  font-size: 15px;
}
.colorDark {
  color: #535353;
}
.mr-2{
  margin-right: 10px ;
}
</style>