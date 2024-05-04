<template>
  <div class="d-flex w-100 h-100">
    <div class="usersList ProfileDiv">
      <div class="backBtnParent text-white d-flex align-items-end">
        <div class="d-flex align-items-center my-3">
          <router-link to="/">
            <i class="fas fa-arrow-left text-white mx-4"></i>
          </router-link>
          <p class="m-0 bold" style="font-size: 18px">Login and Profile</p>
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
            v-if="user==null || !user.dp"
              class="dp"
              src="@/assets/avatar3.png"
              alt="img1"
              width="170"
            />
            <img
            v-else
              id="output"
              class="dp"
              :src="user.dp"
              alt="img1"
              width="170"
            />
          </div>
          <input id="dpp" type="file" accept="image/*" @change="openFile" hidden/>
          <label class="cameraParent" for="dpp" title="Select to choose Photo">
            <i class="fas fa-camera fa-lg text-light font-20"></i>
          </label>
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
        <div class="mobile text-center justify-content-center logincontinuebtn flex-column align-items-center">
          <button class="agreeNContinueBtn" @click="handdleLogin">
            CONTINUE
          </button>
        </div>
         <div class="mt-md-5 mt-3">
            <p class="font-15 text-gray">Don't have an account ? <router-link to="/signup"> <span class="text-cyan mx-2"> Join Now. </span></router-link></p>
         </div>
      </div>
    </div>
    <div class="mobileDevise img1Parent d-flex ">
      <h2 class="welcomeHeading greenColor bolder">Welcome To WhatsApp</h2>
      <img class="welcomeImg mx-auto" src="@/assets/welcome.png" alt="img1" />
      <div class="ppInfo mt-5 mb-3 font-14 px-3">
        <p>
          Read our <span class="text-cyan">Privacy Policy</span>.Tap "Agree and
          continue" to accept the
          <span class="text-cyan">Terms of Service.</span>
        </p>
      </div>
      <div class="text-center">
        <button class="agreeNContinueBtn" @click="handdleLogin">
          AGREE AND CONTINUE
        </button>
      </div>
      <div class="mt-auto font-14">
        <p>from</p>
        <p class="meta">
          <img class="mx-1" src="@/assets/meta.png" alt="" width="60" />
        </p>
      </div>
      <div class="greenLine mt-auto"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import http from "../services/https.vue";
export default {
  data() {
    return {
      userData: {
        email: "",
        password: "",
        image: null,
      },
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
    async handdleLogin() {
           try {             
      if(this.image!=null){
      const formdata = new FormData();
        formdata.append("file",this.image );
        formdata.append("upload_preset", "b1mhgyub")

        axios.post("https://api.cloudinary.com/v1_1/darshanscloud/image/upload", formdata).then(async (res) => {
          let payload={...this.userData,dp:res.data.secure_url}
        const data = await http.handdleLogin(payload);
        this.$socket.client.emit("adduser", data.data._id);
        localStorage.setItem("Wuser", data.data._id);
        this.$store.dispatch("Setme", data.data._id);
        //  alert("User Login successful")
        this.$router.push("/");
        })}
        else{
        const data = await http.handdleLogin(this.userData);
        localStorage.setItem("Wuser", data.data._id);
        this.$store.dispatch("Setme", data.data._id);
        //  alert("User Login successful")
        this.$router.push("/");
        }
      } catch (e) {
        alert("User Login fail");
      }
    },
      AddBorderBottom(e) {
      e.target.style.borderBottom = "2px solid #00bfa5";
    },
  },
    computed: {
    user() {
      return this.$store.getters.user;
    }}
};
</script>

<style>
.imgSelectorParent {
  position: relative;
}
.cameraParent {
  cursor: pointer;
  position: absolute;
  bottom: 10px;
  right: 130px !important;
  background: #009688;
  padding: 10px;
  border-radius: 50%;
  height: 43px;
  width: 43px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.font-20 {
  font-size: 20px;
}
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
  /* background: #f0f2f5; */
  background:var(--userTopDataBg);
}
.LoginProfileDiv{
   /* background: #f0f2f5; */
   background:var(--userTopDataBg);
   width: 40%;
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
.text-gray {
  color: gray;
}
.logincontinuebtn {
  margin-top: 60px;
}
</style>