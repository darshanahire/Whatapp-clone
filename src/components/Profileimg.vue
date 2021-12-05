<template>
  <div class="profile">
      <img class="profilePict" src="@/assets/avatar1.jpg" alt="">
  </div>
</template>

<script>
export default {
  name: "ProfileImg",
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