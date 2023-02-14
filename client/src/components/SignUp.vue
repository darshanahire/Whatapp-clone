<template>
<div class="d-flex w-100 h-100">
  <div class="usersList ProfileDiv">
    <div class="backBtnParent text-white d-flex align-items-end">
      <div class="d-flex align-items-center my-3">
        <router-link to="/login">
        <i class="fas fa-arrow-left text-white mx-4"></i> </router-link>
        <p class="m-0 bold" style="font-size: 18px">Join WhatsApp</p>
      </div>
    </div>
    <div class="h-100">
     <div class="imgSelectorParent">
          <div
            class="
              profilePhotoSelector
              my-4
              rounded-circle
              mx-auto
              d-flex
              justify-content-center
              align-items-center
            "
          >
            <img
              id="output"
              class="dp"
              src="@/assets/avatar3.png"
              alt="img1"
              width="170"
            />
          </div>
          <input id="dpp" type="file" accept="image/*" @change="openFile" hidden/>
          <label class="cameraParent" for="dpp" title="Select to choose Photo">
            <i class="fas fa-camera fa-lg text-light font-20"></i>
          </label>
        </div>
      <div class="nameChange mt-3 bg-white text-start py-2">
        <p class="mx-4 font-14 greenColor">Your Name</p>
        <div class="mx-4 mt-1">
          <input
          class="font-14 text-dark"
            type="text"
            v-model="userData.name"
            placeholder="Enter your Name"
            @click="AddBorderBottom"
          />
        </div>
        <!-- <p class="mx-4 mt-3">John Doe</p> -->
      </div>
      <div class="">
        <p class="m-0 mx-4 my-2 text-start font-12 text-gray">
          *This is not your username or pin. This name will be visible to your
          WhatsApp contacts.
        </p>
      </div>
      <div class="abouthange mb-3 bg-white text-start py-2 d-none">
        <p class="mx-4 font-14 greenColor">About</p>
        <div class="mx-4 mt-1">
          <input
           class="font-14 text-dark"
            type="text"
            v-model="userData.about"
            placeholder="Enter About"
            @click="AddBorderBottom"
          />
        </div>
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
      <div class="mobile text-center justify-content-center signupAndJoinBtn">
          <button class="agreeNContinueBtn" @click="CreateAccount">
            JOIN NOW
          </button>
        </div>
    </div>
    </div>
    <div class="mobileDevise img1Parent d-flex ">
  <h2 class=" welcomeHeading greenColor bolder">Welcome To WhatsApp</h2>
<img class="welcomeImg mx-auto" src="@/assets/welcome.png" alt="img1">
<div class="ppInfo mt-5 mb-3 font-14 ">
  <p>Read our <span class="text-cyan">Privacy Policy</span>.Tap "Agree and continue" to accept the <span class="text-cyan">Terms of Service.</span></p>
</div>
<div class="text-center">
    <button class="agreeNContinueBtn" @click="CreateAccount">AGREE AND CONTINUE</button>
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
import axios from 'axios'
import http from '../services/https.vue'
export default {
  data() {
    return {
      userData :{
      name : "",
      about : "",
      email : "",
      password : "",
      dp:null,
      lastSeen:new Date(),
      },
      image:null
    };
  },
  methods: {
      openFile(file) {
      var input = file.target;

      var reader = new FileReader();
      reader.onload = function () {
        var dataURL = reader.result;
        var output = document.getElementById("output");
        output.src = dataURL;
      };
      reader.readAsDataURL(input.files[0]);
        this.image=input.files[0];        
    },


    AddBorderBottom(e) {
      e.target.style.borderBottom = "2px solid #00bfa5";
    },
    async CreateAccount(){
      try{
          if(this.image!=null){
      const formdata = new FormData();
        formdata.append("file",this.image );
        formdata.append("upload_preset", "b1mhgyub")

        axios.post("https://api.cloudinary.com/v1_1/darshanscloud/image/upload", formdata).then(async (res) => {
          let payload={...this.userData,dp:res.data.secure_url}
           await http.CreateAccount(payload).then(data=>{
            //  console.log(data);
             
           }
           );
           alert("Account Created with dp")
        })}
        else{
       const data = await http.CreateAccount(this.userData);
       localStorage.setItem("Wuser", data.data._id);
        this.$store.dispatch("Setme", data.data._id);
        this.$router.push("/");
      //  alert("Account Created")
       }
      }
      catch(e){
        alert("Email is already register")
        
      }
    }
  },
};
</script>

<style>
.signupAndJoinBtn{
  margin: 40px 0;
}
input {
  border: none;
  outline: none;
  width: 100%;
}
.cameraParent {
  bottom: 10px;
  right: 80px;
   height: 43px;
  width: 43px;
}
.backBtnParent {
  height: 108px;
  background: #00bfa5;
}
.ProfileDiv {
  background: #f0f2f5;
  height: 100%;
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