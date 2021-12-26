<template>
<div class="img1Parent d-flex ">
<img class="img1" src="@/assets/img4.png" alt="img1">
<div class="appInfo my-4 font-14">
  <h2 class="mb-3">WhatsApp Web</h2>
  <p>Send and receive messages without connecting your phone.</p>
  <p>Use WhatsApp on up to 4 devices at the same time.</p>
  <hr>
  <p class="mt-4"><i class="fas fa-laptop fa-sm mx-1"></i> Make calls from desktop with WhatsApp for Windows. <span class="greenText">Get it here </span> </p>
</div>
  <div class="mt-100 font-14">
    <p><i class="fas fa-lock fa-xs mx-2"></i>End-to-end encrypted</p>
    </div>
<div class="greenLine mt-auto"></div>
</div>
</template>

<script>
export default {
name : "Chats",

}
</script>

<style>
.img1Parent{
  width: 70%;
  flex-direction: column;
}
.img1{
  margin: 0 auto;
  margin-top: 103px;
  overflow: hidden;
  height: 260px;
  width: 500px;
}
h2,.appInfo{
  font-weight: 200;
}
.greenLine{
  height: 6px;
  width: 100%;
  background: #4adf83;
}
.font-14{
  font-weight: 300;
  font-size: 14px;
  color: #707070;
}
p{
  margin: 0 !important;
}
hr{
  height: 0.07px !important;
  width: 55%;
  margin: 20px auto;
  color: #6b6b6b;
}
.mt-100{
  margin-top:80px ;
}
.greenText{
  font-weight: bolder;
  color: #0aa545;
}
.lightgreenText{
  font-weight: bolder;
  color: #4adf83;
}
.fas{
  color: #929292;
}
</style>