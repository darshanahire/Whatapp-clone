<template>
  <div class="img1Parent d-flex w-100 h-100">
  <h2 class=" welcomeHeading greenColor bolder">Welcome To WhatsApp</h2>
<img class="welcomeImg mx-auto" src="@/assets/welcome.png" alt="img1">
<div class="ppInfo mt-5 mb-3 font-14 px-3">
  <p>Read our <span class="text-cyan">Privacy Policy</span>.Tap "Agree and continue" to accept the <span class="text-cyan">Terms of Service.</span></p>
</div>
<div class="text-center">
    <router-link to="/login"> 
    <button class="agreeNContinueBtn">AGREE AND CONTINUE</button>
    </router-link> 
</div>
  <div class="mt-auto font-14">
      <p>from</p>
    <p class="meta"><img class="mx-1" src="@/assets/meta.png" alt="" width="60"></p>
    </div>
<div class="greenLine mt-auto"></div>
</div>
</template>

<script>
export default {

}
</script>

<style>

.welcomeImg{
width: 270px;
}
.welcomeHeading{
    margin-top:100px;
    margin-bottom: 30px;
}
.bolder{
    font-weight: 500;
}
.agreeNContinueBtn{
    /* width: 100px; */
    border: 1px solid #1ccc3e;
    outline: none;
    background: #1ccc3e;
    color: white;
    padding: 7px 20px;
    border-radius: 2px;
    font-size: 14px;
    margin-top: 20px;
}
.text-cyan{
    color: #76b9ed;
    font-weight: 500;
}
.meta{
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 800;
    font-size: 15px;
    color: 	#25D366;
    margin-top:5px !important;
    }
</style>