<template>
<div class="d-flex w-100">
  <div class="usersList ProfileDiv">
    <div class="backBtnParent text-white d-flex align-items-end">
      <div class="d-flex align-items-center my-3">
        <router-link to="/">
        <i class="fas fa-arrow-left text-white mx-4"></i> </router-link>
        <p class="m-0 bold" style="font-size: 18px">Login</p>
      </div>
    </div>
    <div class="h-100">
      <div class="profilePhotoSelector my-4 rounded-circle mx-auto d-flex justify-content-center align-items-center"> <img class="" src="@/assets/avatar1.jpg" alt="img1" width="170">
</div>
 
      <div class="abouthange mb-3 bg-white text-start py-2">
        <p class="mx-4 font-14 greenColor">Email</p>
        <div class="mx-4 mt-1">
          <input
           class="font-14 text-dark"
            type="email"
            placeholder="Enter Email"
            v-model="userData.email"
            @click="AddBorderBottom"
          />
        </div>
      </div>
      <div class="abouthange mb-3 bg-white text-start py-2">
        <p class="mx-4 font-14 greenColor">Password</p>
        <div class="mx-4 mt-1">
          <input
           class="font-14 text-dark"
            type="password"
            v-model="userData.password"
            placeholder="Enter Password"
            @click="AddBorderBottom"
          />
        </div>
      </div>
    </div>
    </div>
    <div class="img1Parent d-flex welcomeWidow">
  <h2 class=" welcomeHeading greenColor bolder">Welcome To WhatsApp</h2>
<img class="welcomeImg mx-auto" src="@/assets/welcome.png" alt="img1">
<div class="ppInfo mt-5 mb-3 font-14 ">
  <p>Read our <span class="text-cyan">Privacy Policy</span>.Tap "Agree and continue" to accept the <span class="text-cyan">Terms of Service.</span></p>
</div>
<div class="text-center">
    <button class="agreeNContinueBtn" @click="handdleLogin">AGREE AND CONTINUE</button>
</div>
  <div class="mt-auto font-14">
      <p>from</p>
    <p class="meta"><img class="mx-1" src="@/assets/meta.png" alt="" width="60"></p>
    </div>
<div class="greenLine mt-auto"></div>
</div>
  </div>
  
</template>

<script>
import http from '../services/https.vue'
export default {
  data() {
    return {
      userData :{
      email : "",
      password : ""
      }
    };
  },
  methods: {
    AddBorderBottom(e) {
      e.target.style.borderBottom = "2px solid #00bfa5";
    },
    async handdleLogin(){
      try{
       const data = await http.handdleLogin(this.userData);
       localStorage.setItem("Wuser",data.data._id)
       console.log(data);
       
      //  alert("User Login successful")
       this.$router.push('/')
      }
      catch(e){
        alert("User Login fail")
        
      }
    }
  },
};
</script>

<style>
input {
  border: none;
  outline: none;
  width: 100%;
}
/* .borderBottom {
  border-bottom: 2px solid #009688;
} */
.backBtnParent {
  height: 108px;
  background: #00bfa5;
}
.ProfileDiv {
  background: #ededed;
}
.profilePhotoSelector {
  height: 170px;
  width: 170px;
  overflow: hidden;
  /* <img class="welcomeImg mx-auto" src="@/assets/avatar.jpg" alt="img1"> */

}
.nameChange,
.abouthange {
  height: 70px;
}
.greenColor {
  color: #009688;
}
.font-13 {
  font-size: 13px;
}
.text-gray{
    color: gray;
}
</style>