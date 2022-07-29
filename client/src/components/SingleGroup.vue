<template>
  <router-link :to="`/user/${id}`">
    <div class="singleGrp row mx-0">
      <hr class="hr" />
      <ProfileImg  class="col-2 m-auto" :dp="user.dp" />
      <div class="col-8 d-flex flex-column justify-content-center align-items-start">
      <h6>{{user.name}}</h6>
      <p class="m-0 font-14 lightgreenText" v-if="myfriends.istyping">typing...</p>
      <p class="m-0 font-14 text-truncate w-100 text-start" v-else>{{myfriends.unseenMsg}} </p>
      <!-- <p class="m-0 font-14 text-truncate w-100 text-start" v-else>Hii, how are you this is personal chat click here to see that </p> -->
    </div>
      <div class="col-2 notificationsParent pt-2">
        <!-- <p class="m-0 font-12">{{ myfriends.createdAt | moment("h:mm a") }}</p> -->
        <p class="m-0 font-12 mediamgreenText fw-6"  v-if="myfriends.unseenCount!=0">{{ myfriends.createdAt | moment("h:mm a") }}</p>
        <p class="m-0 font-10"  v-else>{{ user.lastSeen | moment("h:mm a") }}</p>
        <div v-if="myfriends.unseenCount!=0" class="notifications">{{ myfriends.unseenCount }}</div>
      </div>
    </div>
  </router-link>
</template>

<script>
import ProfileImg from "./Profileimg";
export default {
  name: "SingleGroup",
  props: {
    user: Object,
    id: String,
  },
  data(){
    return{
      currFriend:{},
    }
  },
  created(){
    // console.log(this.user);
      this.decryptedText = this.$CryptoJS.AES.decrypt(this.msg, process.env.VUE_APP_SECRETE_KEY).toString(this.$CryptoJS.enc.Utf8)

  },
  components: {
    ProfileImg,
  },
    computed:{
    myfriends(){
      let friends=this.$store.getters.friendsAllData;
      let found = friends.find((friend) => friend.id == this.id);
      // if(found!=undefined) console.log(found.unseenMsg)
      if(found!=undefined) found.unseenMsg = this.$CryptoJS.AES.decrypt(found.unseenMsg, process.env.VUE_APP_SECRETE_KEY).toString(this.$CryptoJS.enc.Utf8)

      return found!=undefined?found:{istyping:false,unseenCount:0,unseenMsg:"Tap here to start chat",createdAt:new Date()};
    },
    // GetLastMsgAndTime(){
    //   return 
    //   // let conversations=this.$store.getters.usersMessages;
    //   // let lastMsg=conversations[conversations.length-1];
    //   // console.log(lastMsg);
    //   // return lastMsg
    //   // let found = friends.find((friend) => friend.id == this.id);
    //   // return found!=undefined?found:{istyping:false,unseenCount:0};
    // }
  }
};
</script>

<style>
.fw-6{
  font-weight: 600;
}
.font-10{
  font-size: 11px;
}
.singleGrp {
  height: 70px;
  /* background: #ededed; */
}
.font-12 {
  font-size: 12px;
}
.mediamgreenText{
  color: #25D366;
}
.notificationsParent {
  padding: 0;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
}
.notifications {
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


<style scoped>
/* import Vue from 'vue'
import Vuex from 'vuex'
import http from "../services/https.vue"

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        me: localStorage.getItem("Wuser") || "",
        friendsData: [],
        friendsAllData: [],
        typingUser:"",
        onlineUsers:[],
        usersMessages:[]
    },
    actions: {
        async GetFriends({state,commit }) {
                const payload = { _id: this.state.me };
                http.getFriends(payload).then(async(data) => {
                    // console.log(data);
                    data.map((friend) => {    
                        if(!state.friendsAllData.some(user => user.id === friend)) {
                                    state.friendsAllData.push({ id: friend, unseenCount: 0 , istyping:false,text:"hi",createdAt:new Date() })}
                            })
                        }      
                        // if(!state.friendsAllData.some(user => user.id === friend)) {
                        // http.getConversationsForLastSeen({sender:state.me,receiver:friend}).then(async(data)=>{
                        //     http.getMessages(data.data._id).then(async(d)=>{
                        //         if(d.data.length>0){
                        //         let lastMsg=d.data[d.data.length-1];
                        //         state.friendsAllData.push({ id: friend, unseenCount: 0 , istyping:false,text:lastMsg.text,createdAt:lastMsg.createdAt })}
                        //         else{
                        //             state.friendsAllData.push({ id: friend, unseenCount: 0 , istyping:false,text:"hi",createdAt:new Date() })}
                        //         }
                            
                        //         )
                        //     })
                        // }      
                    // })
                    console.log(state.friendsAllData);
                                        
                    commit('SET_FRIENDS', data)
                }).catch((err) => {
                    console.log(err);
                })
            
            // return new Promise((resolve, reject) => {
            //     const payload = { _id: this.state.me };
            //     http.getFriends(payload).then((data) => {
            //         console.log(data);
            //         data.map((friend) => {          
            //             !state.friendsAllData.some(user => user.id === friend.members[1]) &&
            //             state.friendsAllData.push({ id: friend.members[1], unseenCount: 0  });
            //         })
            //         commit('SET_FRIENDS', data)
            //         resolve(data);
            //     }).catch((err) => {
            //         console.log(err);
            //         reject(err);

            //     })
            // })
        },
        SetonlineUsers({ commit }, data) {  
            commit('SET_ONLINE_USERS', data)
        },
        SetMessagesToStore({ commit }, data) {  
            commit('SET_MESSAGES', data)
        },
        upadateSeenMsgs({ state, commit }, id) {  
            let tempFriends = state.friendsAllData;
            tempFriends.map(element=>{
                if(element.id==id)element.unseenCount++;
            })
            // console.log(tempFriends);
            
            commit('UPDATE_SEEN_MSG', tempFriends)
        },
        ResetSeenMsgs({ state, commit }, id) {
            let tempFriends = state.friendsAllData;
            tempFriends.map(element=>{
                if(element.id==id)element.unseenCount=0;
            })
            commit('UPDATE_SEEN_MSG', tempFriends)
        },
        setfriendTyping({state,commit},id){
            let tempFriends = state.friendsAllData;
            tempFriends.map(element=>{
                if(element.id==id)
                {element.istyping=true;
                setTimeout(() => {
                    element.istyping=false;
                    }, 3000);
                
                }
            })
            commit('SET_TYPING', tempFriends)
        }
    },
    mutations: {
        SET_FRIENDS(state, data) {

            state.friendsData = data;
        },
        SET_MESSAGES(state, data) {
            state.usersMessages = data;
        },
        UPDATE_SEEN_MSG(state,tempFriends){
            // console.log(tempFriends);
            
        state.friendsAllData = tempFriends;
        },
        RESET_SEEN_MSG(state,tempFriends){
        state.friendsAllData = tempFriends;
        },
        SET_TYPING(state,tempFriends){
        state.friendsAllData = tempFriends;
        },
        SET_ONLINE_USERS(state,data){
        state.onlineUsers = data;
        }
    },
    modules: {},
    getters: {
        friendsAllData: state => state.friendsAllData,
        onlineUsers: state => state.onlineUsers,
        // usersMessages: state => state.usersMessages,
    }
}) */
</style>