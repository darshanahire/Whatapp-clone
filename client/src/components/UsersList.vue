<template>
  <div class="usersList">
    <div class="userData row mx-0">
      <div class="col-4 d-flex justify-content-start align-items-center">
        <router-link to="/login"><ProfileImg /></router-link>
      </div>
      <div class="col-8 d-flex justify-content-end align-items-center font-15">
        <i class="fas fa-circle-notch fa-lg mx-3 iconcolor"></i>
        <i class="fas fa-comment-alt fa-lg mx-3 iconcolor"></i>
        <i class="fas fa-ellipsis-v fa-lg mx-3 iconcolor" @click="logout"></i>
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
          <p class="m-0">Get notified of new messages</p>
          <p class="font-14 m-0">Turn on desktop notifications</p>
        </div>
      </div>
    </div>
    <div class="searchparent font-14 searchBarparent">
      <div class="searchChild searchBarHeight">
        <i class="fas fa-search mx-3 colorDark"></i>
        <!-- <input type="text" class="searchBar" /> -->
        <input
          type="text"
          class="searchBar mx-3"
          placeholder="Search or start new chat"
        />
      </div>
    </div>
    <div class="lists mt-1">
      <hr class="hr" />
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
    };
  },
  async created() {
    this.AllUsers = await http.getAllUsers();
    this.me = localStorage.getItem("Wuser");
    this.$store.dispatch("Setme", this.me);
    this.$store.dispatch("GetFriends");
    // this.$socket.client.emit("adduser", this.me);
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
  mounted() {
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
      localStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>

<style >
a {
  color: black !important;
  text-decoration: none;
}
.usersList {
  overflow: hidden;
  width: 30%;
  height: 100%;
  /* border-right: 1px solid rgb(214, 213, 213); */
}
.userData {
  height: 60px;
  background: #ededed;
  display: flex;
  justify-content: center;
  align-items: center;
}
.iconcolor {
  color: #51585c !important;
}
.notificationData {
  height: 90px;
  background: #9de1fe;
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
  height: 45px;
  background: #f6f6f6;
  display: flex;
  justify-content: center;
  align-items: center;
}
.searchChild {
  height: 34px;
  width: 95%;
  background: #ffff;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.searchBar {
  outline: none;
  border: none;
  border-radius: 20px;
  height: 34px;
  width: 95%;
  background: #ffff;
  font-size: 14px;
}
.lists {
  height: 75%;
  background: white;
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
</style>