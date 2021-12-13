<template>
  <div class="chatwindowparent">
    <div class="userTopData">
      <div class="row w-100 align-items-center">
        <div class="col-1">
          <ProfileImg />
        </div>
        <div class="col-8 text-start">
          <h6 class="m-0">John Doe</h6>
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
        <div class="leftChatParent px-3">
          <div class="tailInIcon"></div>
          <div class="leftChat">
            <p>
              This is Left chat can you like itThis is Left chat can you like
              itThis is Left chat can you like itThis is Left chat can you like
              itThis is Left chat can you like it
            </p>
            <div class="chatTime">
              <p><span class="mx-1">10:01 am </span></p>
            </div>
          </div>
        </div>
        <div class="rightChatParent px-3">
          <div class="tailOutIcon"></div>
          <div class="rightChat">
            <p>Hello, I am Right chat how Am i ?</p>
            <div class="chatTime">
              <p>
                <span class="mx-1">10:01 am </span>
                <img src="@/assets/bluetick3.png" alt="" height="10" />
              </p>
            </div>
          </div>
        </div>
        <div class="leftChatParent px-3">
          <div class="tailInIcon"></div>
          <div class="leftChat">
            <p>This is Left chat can you like it</p>
            <div class="chatTime">
              <p><span class="mx-1">10:01 am </span></p>
            </div>
          </div>
        </div>
        <div class="rightChatParent px-3">
          <div class="tailOutIcon"></div>
          <div class="rightChat">
            <p>Yes I like it you are more attractive that me</p>
            <div class="chatTime">
              <p>
                <span class="mx-1">10:01 am </span>
                <img src="@/assets/bluetick3.png" alt="" height="10" />
              </p>
            </div>
          </div>
        </div>
        <div class="leftChatParent px-3">
          <div class="tailInIcon"></div>
          <div class="leftChat">
            <p>
              This is Left chat can you like itThis is Left chat can you like
              itThis is Left chat can you like itThis is Left chat can you like
              itThis is Left chat can you like it
            </p>
            <div class="chatTime">
              <p><span class="mx-1">10:01 am </span></p>
            </div>
          </div>
        </div>
        <div class="rightChatParent px-3">
          <div class="rightChat">
            <div class="tailOutIcon"></div>
            <p>Hello, I am Right chat how Am i ?</p>
            <div class="chatTime">
              <p>
                <span class="mx-1">10:01 am </span>
                <img src="@/assets/bluetick3.png" alt="" height="10" />
              </p>
            </div>
          </div>
        </div>
        <div class="leftChatParent px-3">
          <div class="tailInIcon"></div>
          <div class="leftChat">
            <p>This is Left chat can you like it</p>
            <div class="chatTime">
              <p><span class="mx-1">10:01 am </span></p>
            </div>
          </div>
        </div>
        <div class="rightChatParent px-3">
          <div class="tailOutIcon"></div>
          <div class="rightChat">
            <p>Yes I like it you are more attractive that me</p>
            <div class="chatTime">
              <p>
                <span class="mx-1">10:01 am </span>
                <img src="@/assets/bluetick3.png" alt="" height="10" />
              </p>
            </div>
          </div>
        </div>

        <div class="leftChatParent px-3">
          <div class="tailInIcon"></div>
          <div class="leftChat">
            <p>This is Left chat can you like it</p>
            <div class="chatTime">
              <p><span class="mx-1">10:01 am </span></p>
            </div>
          </div>
        </div>
        <div class="rightChatParent px-3">
          <div class="tailOutIcon"></div>
          <div class="rightChat">
            <p>
              Hii This is Left chat can you like This is Left chat can you
              likeThis is Left chat can you like This is Left chat can you like
            </p>
            <div class="chatTime">
              <p>
                <span class="mx-1">10:01 am </span>
                <img src="@/assets/bluetick4.png" alt="" height="10" />
              </p>
            </div>
          </div>
        </div>
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
import ProfileImg from "./Profileimg";
export default {
  name: "ChatWindow",
  components: {
    ProfileImg,
  },
  data() {
    return {
      msgInput:null
    };
  },
  methods:{
    sendMsg(){
    console.log(this.msgInput);
    }
  }
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

.leftChat {
  height: auto;
  width: auto;
  max-width: 50%;
  padding: 8px 10px 3px;
  border-radius: 8px;
  background: white;
  text-align: start;
  margin: 6px 0;
  font-size: 14px;
  z-index: 5;
}
.rightChat {
  height: auto;
  width: auto;
  max-width: 50%;
  padding: 8px 10px 3px;
  border-radius: 8px;
  background: #dcf8c6;
  text-align: start;
  margin: 6px 0;
  font-size: 14px;
  z-index: 5;
}
.leftChatParent {
  display: flex;
  justify-content: start;
  position: relative;
}
.rightChatParent {
  display: flex;
  justify-content: end;
  position: relative;
}
.tailInIcon {
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  position: absolute;
  border-top: 16px solid #ffff;
  z-index: 3;
  left: 4px;
  top: 6px;
  border-radius: 5px;
}
.tailOutIcon {
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  position: absolute;
  border-top: 16px solid #dcf8c6;
  z-index: 3;
  right: 4px;
  top: 6px;
  border-radius: 5px;
}
.chatTime {
  font-size: 10px;
  color: rgb(101 101 101);
  text-align: end;
  margin: 0 2px;
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
.sendMsgBtn{
  border: none;
}
</style>