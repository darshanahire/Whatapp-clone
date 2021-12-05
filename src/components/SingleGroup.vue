<template>
  <div class="singleGrp row mx-0">
    <ProfileImg class="col-2 m-auto" />
    <div class="col-8 d-flex flex-column justify-content-center align-items-start">
      <h6>Physical Nash 2</h6>
      <p class="m-0 font-14">+9309941438 : Shree Swami Samarth</p>
    </div>
    <div class="col-2 notificationsParent">
        <p class="m-0 font-12">4:08 pm</p>
        <div class="notifications">2</div>
    </div>
  </div>
</template>

<script>
import ProfileImg from "./Profileimg";
export default {
  name: "SingleGroup",
  components: {
    ProfileImg,
  },
};
</script>

<style>
.singleGrp {
  height: 70px;
  /* background: #ededed; */
}
.font-12{
    font-size: 12px;
}
.notificationsParent{
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.notifications{
    font-size: 13px;
    background: #06d755;
    border-radius: 50%;
    height: 22px;
    width: 22px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
}
</style>