<template >
  <div class="chatwindowparent chatWindowWidth">
    <div class="userTopData" style="border-left: 1px solid #b6b6b6">
      <div class="row w-100 align-items-center">
        <div class="col-3 col-md-1 d-flex align-items-center px-0 px-md-2">
          <i
            class="fas fa-arrow-left fa-lg mx-2 mobile iconcolor font-20 gobackArrow"
            @click="goback"
          ></i>
          <ProfileImg :dp="user.dp" />
        </div>
        <div class="col-6 col-md-8 text-start">
          <h6 class="m-0">{{ user.name }}</h6>
          <!-- <p class="m-0 font-14">Click here to group info</p> -->
          <!-- found!=undefined?found:{istyping:false,unseenCount:0} -->
          <p
            class="m-0 font-14"
            v-if="
              user.lastSeen &&
              IsOnlineNow == undefined &&
              new Date() - new Date(user.lastSeen.toString()) > 86400000
            "
          >
            <span class="desktop">
              Last seen {{ user.lastSeen | moment("Do MMM YYYY") }} at
              {{ user.lastSeen | moment("h:mm a") }}</span
            >

            <span class="mobile"
              >last seen at {{ user.lastSeen | moment("Do MMM YY") }}</span
            >
            <!-- {{ user.lastSeen | moment("h:mm a") }} -->
          </p>
          <p
            class="m-0 font-14"
            v-else-if="IsOnlineNow && myfriends != undefined"
          >
            {{ myfriends.istyping ? "typing..." : "online" }}
          </p>
          <p class="m-0 font-14" v-else>
            last seen at {{ user.lastSeen | moment("from", "now") }}
          </p>
        </div>
        <div class="col-3 col-md-3 text-end">
          <i class="fas fa-search mx-3 iconcolor"></i>
          <i class="fas fa-ellipsis-v mx-3 iconcolor"></i>
        </div>
      </div>
    </div>
    <div class="mainchatWindow scroll-y">
      <div class="mainchatWindowChild"></div>
      <!-- <img class="" src="@/assets/chatBgNew.png" alt=""> -->
      <div class="dayDiv mt-2">TODAY</div>
      <div class="topEncrpMsg">
        <i class="fas fa-lock fa-xs mx-2 wt-900"></i>
        Messages are end-to-end encrypted. No one outside of this chat, not even
        WhatsApp, can read or listen to them. Click to learn more.
      </div>
      <div class="container h-80 w-80 py-3">
        <span v-for="(msg, id) in Messages" :key="id">
          <span v-if="conversationId === msg.conversationId">
            <div v-if="msg.sender === you">
              <LeftChat
                :msg="msg.text"
                :time="msg.createdAt"
                :prevSender="returnPrev(id)"
                :currSender="you"
              />
            </div>
            <div v-else-if="msg.sender === me">
              <RightChat
                :msg="msg.text"
                :time="msg.createdAt"
                :prevSender="returnPrev(id)"
                :currSender="me"
              />
            </div>
            <div v-else></div>
            <!-- <div v-else-if="msg !== undefined ? addUnSeenMsg(msg) : ''"> -->
            <!-- </div> -->
          </span>
        </span>
      </div>
      <div id="bottomDiv" class="mt-auto" ref="Ref"></div>
    </div>

    <!-- emoji -->
    <div></div>
    <div class="chatingdatadiv">
      <div class="w-100 d-flex align-items-center justify-content-center">
        <div class="text-start row mx-0">
          <emoji-picker class="col-6" @emoji="append" :search="search">
            <div slot="emoji-picker" slot-scope="{ emojis, insert }">
              <div class="emoji-picker px-3">
                <!-- <div class="emoji-picker__search pb-3">
                  <input
                    type="text"
                    class="InputBar px-3"
                    placeholder="Search Emoji"
                    v-model="search"
                  />
                </div> -->
                <div class="emojiParent">
                  <div v-for="(emojiGroup, category) in emojis" :key="category">
                    <h5>{{ category }}</h5>
                    <div class="emojis">
                      <span
                        v-for="(emoji, emojiName) in emojiGroup"
                        :key="emojiName"
                        @click="insert(emoji)"
                        :title="emojiName"
                        >{{ emoji }}</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <i
              class="far fa-grin fa-lg iconcolor emoji-invoker col-6"
              slot="emoji-invoker"
              slot-scope="{ events: { click: clickEvent } }"
              @click.stop="clickEvent"
            >
            </i>
          </emoji-picker>
          <i class="fas fa-paperclip fa-lg iconcolor mx-5"></i>
        </div>
        <div class="text-start w-85">
          <input
            type="text"
            class="InputBar px-3"
            placeholder="Type a message"
            v-on:keyup.enter="sendMsg"
            v-model="msgInput"
            @input="setTyping"
          />
        </div>
        <div class="text-end d-flex">
          <button class="sendMsgBtn" v-on:click="sendMsg">
            <!-- <i
              v-if="Selftypingd"
              class="fas fa-paper-plane fa-lg text-dark mx-2 d-flex"
            ></i> -->
            <img class="tick" src="@/assets/send.png" alt="" height="25" />
            <!-- <i class="fas fa-paper-plane fa-lg iconcolor mx-2 d-flex"></i> -->
            <!-- <i v-else class="fas fa-microphone fa-lg text-dark mx-3"></i> -->
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { EmojiPicker } from "vue-emoji-picker";
// const { io } = require("socket.io-client");
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
    EmojiPicker,
  },
  mounted: function () {
    this.$store.dispatch("ResetSeenMsgs", this.you);
    this.$store.dispatch("GetFriends");
    if (this.me != null && this.me != "") {
      const payload = { senderId: this.me, receiverId: this.you };
      http
        .newConversation(payload)
        .then(async (data) => {
          this.conversationId = data.data._id;
          http.getMessages(this.conversationId).then(async (data) => {
            this.Messages = data.data;
            // this.$store.dispatch("SetMessagesToStore",this.Messages);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    this.$socket.client.on("getMessage", (data) => {
      var audio = new Audio(require("@/assets/music/bip.mp3"));
      audio.play();
      this.socketMsg = data.text;
      if (this.$route.path != `/user/${this.you}`) {
        // this.$store.dispatch("upadateSeenMsgs", {id:data.senderId,text:data.text});
      } else {
        const payload = {
          conversationId: this.conversationId,
          sender: data.senderId,
          text: this.socketMsg,
        };
        this.Messages = [...this.Messages, payload];
      }
    });
    this.$socket.client.on("sendertyping", (payload) => {
      this.$store.dispatch("setfriendTyping", payload.senderId);
    });
    this.$socket.client.on("getusers", (users) => {
      this.$store.dispatch("SetonlineUsers", users);
    });
  },
  updated() {
    // console.log(this.$store.state.friendsAllData);
    this.$refs.Ref.scrollIntoView({ behavior: "smooth", block: "end" });
  },
  created() {
    // this.$socket.client = io("ws://localhost:8900");
    this.you = this.$route.params.id;
    this.changeUser(this.you);
    this.me = localStorage.getItem("Wuser");

    // this.$socket.client.emit("adduser", this.me);

    // console.log(this.$socket.client);
    this.$socket.client.on("getusers", (users) => {
      this.$store.dispatch("SetonlineUsers", users);
    });
  },
  data() {
    return {
      input: "",
      search: "",
      msgInput: "",
      user: {},
      payload: "",
      Messages: [],
      me: "",
      you: "",
      conversationId: "",
      socket: "",
      socketMsg: "",
      prevSender: "",
      currSender: "",
      tempFriends: [],
    };
  },
  watch: {
    $route() {
      this.$store.dispatch("GetFriends");
      this.you = this.$route.params.id;
      this.$store.dispatch("ResetSeenMsgs", this.you);
      this.changeUser(this.you);
    },
  },
  methods: {
    append(emoji) {
      this.msgInput += emoji;
    },
    emojiInput(emoji) {
      this.msgInput += emoji;
    },
    goback() {
      this.$router.push("/");
    },
    setTyping() {
      if (this.msgInput != "") {
        this.$store.dispatch("setSelfTyping", true);
      } else {
        this.$store.dispatch("setSelfTyping", false);
      }
      this.$socket.client.emit("typing", {
        senderId: this.me,
        receiverId: this.you,
      });
    },
    sendMsg() {
      // console.log(this.msgInput);
      if (this.msgInput !== "" && this.msgInput !== null && this.me != null) {
        // let encryptedMsg = this.msgInput;
        const encryptedMsg = this.$CryptoJS.AES.encrypt(
          this.msgInput,
          process.env.VUE_APP_SECRETE_KEY
        ).toString();
        this.msgInput = "";
        this.$socket.client.emit("sendMessage", {
          conversationId: this.conversationId,
          senderId: this.me,
          receiverId: this.you,
          text: encryptedMsg,
        });
        const payload = {
          conversationId: this.conversationId,
          sender: this.me,
          text: encryptedMsg,
        };
        http
          .sendMsg(payload)
          .then(async () => {
            this.Messages = [...this.Messages, payload];
            // this.$store.dispatch("SetMessagesToStore",this.Messages);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    async changeUser(id) {
      this.Messages = [];
      //  this.$store.dispatch("GetFriends");
      try {
        this.user = await http.getUser(id);
        //console.log("user ",this.user);
        if (!this.user) {
          this.goback();
        }
        const payload = {
          senderId: this.me,
          receiverId: this.$route.params.id,
        };
        http
          .newConversation(payload)
          .then(async (data) => {
            this.conversationId = data.data._id;
            http.getMessages(this.conversationId).then(async (data) => {
              this.Messages = data.data;
              // this.$store.dispatch("SetMessagesToStore",this.Messages);
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
    returnPrev(id) {
      if (id == 0) {
        return "darshan";
      } else {
        return this.Messages[id - 1].sender;
      }
    },
    // addUnSeenMsg(msg) {
    //   this.$store.dispatch("upadateSeenMsgs", {id:msg.sender,text:msg.text});
    //   this.Messages = this.Messages.filter((m) => {
    //     m.sender != msg.sender;
    //   });
    //   // this.$store.dispatch("SetMessagesToStore",this.Messages);
    // },
  },
  computed: {
    myfriends() {
      let friends = this.$store.getters.friendsAllData;
      let found = friends.find((friend) => friend.id == this.you);
      return found;
    },
    IsOnlineNow() {
      let friends = this.$store.getters.onlineUsers;
      let IsOnlineNow = friends.find((friend) => friend.userId == this.you);
      return IsOnlineNow;
    },
    Selftypingd() {
      return this.$store.getters.selfTyping;
    },
  },
};
</script>
<style>
.gobackArrow {
  margin-right: 10px !important ;
}
.fa-paperclip {
  margin-right: 0 !important;
}
.emojiParent {
  overflow: scroll;
  background: white;
}
.chatwindowparent {
  background-color: var(--ternary);
  width: 70%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.userTopData {
  height: 60px;
  padding: 20px 0;
  /* background-color: #f0f2f5; */
  /* background-color: #111b21; */
  background-color: var(--userTopDataBg);
  color: var(--colorPrimary);
  display: flex;
  justify-content: center;
  align-items: center;
}
.mainchatWindow {
  /* clip-path: inset(0 0 0 0); */
  position: relative;
  background-color: var(--chatBg);
  /* height: 100%; */
  min-height: 82.5%;
}
.mainchatWindowChild {
  position: absolute;
  top: 0%;
  /* background: url(https://res.cloudinary.com/darshanscloud/image/upload/v1714927612/pgy0ur3gr1lo3p2lkpbd.png); */
  background: url(https://res.cloudinary.com/darshanscloud/image/upload/v1714925552/pzdb7q0mkwrrgttydnjw.png);
  background-size: contain;
  height: 100%;
  width: 100%;
  opacity: 0.3;
}
.chatingdatadiv {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  /* background-color: #f0f2f5; */
  /* background-color:#2a3942 ; */
  color: white;
}
.InputBar {
  outline: none;
  border: none;
  border-radius: 10px;
  height: 40px;
  width: 100%;
  /* background: #ffff; */
  background: var(--primary) !important;
  color: var(--colorPrimary);
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
  padding: 3px;
  margin: auto;
  background: #e1f3fb;
  border-radius: 6px;
  font-size: 12px;
}
.fa-check-double {
  color: rgb(96, 200, 235);
}
.scroll-y {
  overflow: scroll;
}
.sendMsgBtn {
  border: none;
  background: transparent;
}
.font-13 {
  font-size: 13px;
  color: #707070;
}

.emoji-invoker {
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
}

.emoji-picker {
  position: absolute;
  z-index: 1;
  font-family: Montserrat;
  border: 1px solid #ccc;
  width: 30rem;
  height: 20rem;
  overflow: scroll;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
  background: #fff;
  box-shadow: 1px 1px 8px #c7dbe6;
  bottom: 90px;
  z-index: 1000;
  width: 62%;
}
.emoji-picker__search {
  display: flex;
}
.emoji-picker__search > input {
  flex: 1;
  border-radius: 10rem;
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  outline: none;
}
.emoji-picker h5 {
  margin: 5px 0;
  color: #b1b1b1;
  text-transform: uppercase;
  font-size: 0.8rem;
  cursor: default;
}
.emoji-picker .emojis {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.emoji-picker .emojis:after {
  content: "";
  flex: auto;
}
.emoji-picker .emojis span {
  padding: 0.2rem;
  cursor: pointer;
  border-radius: 5px;
}
.emoji-picker .emojis span:hover {
  background: #ececec;
  cursor: pointer;
}
.wt-900 {
  font-weight: 900;
}
</style>