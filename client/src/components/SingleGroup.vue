<template>
<router-link :to='`/user/${id}`'>
  <div class="singleGrp row mx-0">
    <hr class="hr" />
    <ProfileImg class="col-2 m-auto" />
    <div class="col-8 d-flex flex-column justify-content-center align-items-start">
      <h6>{{user.name}}</h6>
      <p class="m-0 font-14 text-truncate w-100">Hii, how are you this is personal chat click here to see that </p>
    </div>
    <div class="col-2 notificationsParent">
        <p class="m-0 font-12">4:08 pm</p>
        <div class="notifications">2</div>
    </div>
  </div>
  </router-link>
</template>

<script>
import ProfileImg from "./Profileimg";
export default {
  name: "SingleGroup",
  props:{
    user :Object,
    id:String
  },
  components: {
    ProfileImg,
  },
  created(){
    // console.log(this.user);
    
  }
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