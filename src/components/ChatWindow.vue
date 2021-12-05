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
    <div class="mainchatWindow">
       <!-- <img class="" src="@/assets/chatbg.jpg" alt=""> -->
    </div>
    <div class="chatingdatadiv">
      <div class="w-100 d-flex align-items-center justify-content-center">
        <div class="text-start">
          <i class="far fa-grin fa-lg text-dark mx-2" ></i>
          <i class="fas fa-paperclip fa-lg text-dark mx-3"></i>
        </div>
        <div class="text-start w-85">
          <input
            type="text"
            class="InputBar px-3"
            placeholder="Type a message"
          />
        </div>
        <div class="text-end">
          <i class="fas fa-microphone fa-lg text-dark mx-3"></i>
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
.w-85{
    width: 83%;
}
</style>