<template>
  <div class="profile">

      <img v-if="dp!=undefined" class="profilePict" :src=dp alt="">
      <img v-else class="profilePict" src="@/assets/avatar3.jpg" alt="">
  </div>
</template>

<script>
export default {
  name: "ProfileImg",
  props:{
    dp:String
  }
};
</script>

<style>
.profile {
  padding: 0;
  width: 50px;
  height: 50px;
  background: rgb(136, 136, 136);
  border-radius: 50%;
    overflow: hidden;
}
.profilePict{
    width: 50px;
    height: 50px;
}
</style>