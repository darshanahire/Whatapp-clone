<template >
  <div class="chatwindowparent">
    <div class="userTopData">
      <div class="row w-100 align-items-center">
        <div class="col-1">
          <ProfileImg />
        </div>
        <div class="col-8 text-start">
          <h6 class="m-0">{{ user.name }}</h6>
          <!-- <p class="m-0 font-14">Click here to group info</p> -->
          <p class="m-0 font-14">online</p>
        </div>
        <div class="col-3 text-end">
          <i class="fas fa-search mx-3"></i>
          <i class="fas fa-ellipsis-v mx-3 iconcolor"></i>
        </div>
      </div>
    </div>
    <div class="mainchatWindow scroll-y">
      <!-- <img class="" src="@/assets/chatbg.jpg" alt=""> -->
      <div class="dayDiv mt-2">TODAY</div>
      <div class="topEncrpMsg">
        <i class="fas fa-lock fa-xs mx-2"></i>
        Messages are end-to-end encrypted. No one outside of this chat, not even
        WhatsApp, can read or listen to them. Click to learn more.
      </div>
      <div class="container h-100 w-80 py-3">
        <span v-for="(msg, id) in Messages" :key="id">
          <span v-if="msg.sender !== me">
            <LeftChat :msg="msg.text" :time="msg.createdAt" />
          </span>
          <span v-else>
            <RightChat :msg="msg.text" :time="msg.createdAt" />
          </span>
        </span>
        <div id="bottomDiv"></div>
      </div>
    </div>
    <div class="chatingdatadiv">
      <div class="w-100 d-flex align-items-center justify-content-center">
        <div class="text-start d-flex">
          <i class="far fa-grin fa-lg text-dark mx-2"></i>
          <i class="fas fa-paperclip fa-lg text-dark mx-3"></i>
        </div>
        <div class="text-start w-85">
          <input
            type="text"
            class="InputBar px-3"
            placeholder="Type a message"
            v-model="msgInput"
          />
        </div>
        <div class="text-end">
          <!-- <i class="fas fa-microphone fa-lg text-dark mx-3"></i> -->
          <button class="sendMsgBtn" v-on:click="sendMsg">
            <i class="fas fa-paper-plane fa-lg text-dark mx-2 d-flex"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const { io } = require("socket.io-client");
import ProfileImg from "./Profileimg";
import http from "../services/https.vue";
import LeftChat from "../helperComp/LeftChat.vue";
import RightChat from "../helperComp/RightChat.vue";
export default {
  name: "ChatWindow",
  components: {
    ProfileImg,
    LeftChat,
    RightChat,
  },

  created() {
    this.socket = io("ws://localhost:8900");
    this.you = this.$route.params.id;
    this.changeUser(this.you);
    this.me = localStorage.getItem("Wuser");
    const payload = { senderId: this.me, receiverId: this.you };
    http
      .newConversation(payload)
      .then(async (data) => {
        this.conversationId = data.data._id;
        http.getMessages(this.conversationId).then(async (data) => {
          this.Messages = data.data;
          // console.log(this.Messages);
        });
      })
      .catch((err) => {
        console.log(err);
      });

    this.socket.emit("adduser", this.me);

    
    // console.log(this.socket);
    // this.socket.on("getusers", (users) => {
    //   console.log("users", users);
    // });
    this.socket.on("getMessage", (data) => {
      console.log(data.text);

      const payload = {
        conversationId: "temp",
        sender: data.senderId,
        text: data.text,
      };
      this.Messages = [...this.Messages, payload];
    });
  },
  data() {
    return {
      msgInput: null,
      user: {},
      payload: "",
      Messages: [],
      me: "",
      you: "",
      conversationId: "",
      socket: "",
    };
  },
  watch: {
    $route() {
      this.you = this.$route.params.id;
      this.changeUser(this.you);
    },
  },
  methods: {
    sendMsg() {
      // console.log(this.msgInput);
      if (this.msgInput != null) {
        this.socket.emit("sendMessage", {
          conversationId: this.conversationId,
          senderId: this.me,
          receiverId: this.you,
          text: this.msgInput,
        });

        const payload = {
          conversationId: this.conversationId,
          sender: this.me,
          text: this.msgInput,
        };
        http
          .sendMsg(payload)
          .then(async () => {
            this.Messages = [...this.Messages, payload];
            this.msgInput = "";
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    async changeUser(id) {
      try {
        this.user = await http.getUser(id);
        const payload = {
          senderId: this.me,
          receiverId: this.you,
        };
        http
          .newConversation(payload)
          .then(async (data) => {
            this.conversationId = data.data._id;
            http.getMessages(this.conversationId).then(async (data) => {
              this.Messages = data.data;
              // console.log(this.Messages);
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style>
.chatwindowparent {
  width: 70%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.userTopData {
  height: 60px;
  background: #ededed;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mainchatWindow {
  background: url(https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png);
  /* background: url(http://localhost:8080/img/chatbg.8c989945.jpg); */
  background-size: contain;
  height: 84%;
}
.chatingdatadiv {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  background: #ededed;
}
.InputBar {
  outline: none;
  border: none;
  border-radius: 20px;
  height: 40px;
  width: 100%;
  background: #ffff;
  font-size: 15px;
}
.w-85 {
  width: 83%;
}
.w-80 {
  width: 80%;
}

.topEncrpMsg {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fdf4c5;
  color: black !important;
  width: 78%;
  font-size: 12px;
  margin: 20px auto 0;
  padding: 6px 0;
  border-radius: 8px;
}
.dayDiv {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 30px;
  margin: auto;
  background: #e1f3fb;
  border-radius: 6px;
  font-size: 13px;
}
.fa-check-double {
  color: rgb(96, 200, 235);
}
.scroll-y {
  overflow: scroll;
}
.sendMsgBtn {
  border: none;
}
</style>