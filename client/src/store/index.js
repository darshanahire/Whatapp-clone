import Vue from 'vue'
import Vuex from 'vuex'
import http from "../services/https.vue"
var CryptoJS = require("crypto-js");


Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        me: localStorage.getItem("Wuser") || "",
        friendsData: [],
        friendsAllData: [],
        typingUser:"",
        onlineUsers:[],
        // usersMessages:[],
        selfTyping:false,
        user:{}
    },
    actions: {
        async GetFriends({state,commit }) {
            if(this.state.me!="" && this.state.me!=null){
                const payload = { _id: this.state.me };
                http.getFriends(payload).then(async(data) => {
                    // console.log(data);
                    data.map((friend) => {    
                        !state.friendsAllData.some(user => user.id === friend) &&
                        state.friendsAllData.push({ id: friend, unseenCount: 0 , istyping:false,unseenMsg:"Tap here to start chat",createdAt:new Date() });
                    })                    
                    commit('SET_FRIENDS', data)
                }).catch((err) => {
                    console.log(err);
                })}
            
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
        Setme({ commit }, data) {  
            commit('SET_ME', data)
        },
        SetUser({ commit }, data) {  
            commit('SET_USER', data)
        },
        SetonlineUsers({ commit }, data) {  
            commit('SET_ONLINE_USERS', data)
        },
        setSelfTyping({ commit },data) {   
            commit('SET_SELF_TYPING', data)
        },
        // SetMessagesToStore({ commit }, data) {  
        //     commit('SET_MESSAGES', data)
        // },
        upadateSeenMsgs({ state, commit }, msg) {                          
            let tempFriends = state.friendsAllData;
            tempFriends.map(element=>{
                if(element.id==msg.id){
                    // temp=this.$CryptoJS.AES.decrypt(msg.text, process.env.VUE_APP_SECRETE_KEY).toString(this.$CryptoJS.enc.Utf8)
                    // console.log("Temp",temp);
                    
                    if(element.unseenMsg!=msg.text){
                        element.unseenCount++;
                        // element.unseenMsg = CryptoJS.AES.decrypt(msg.text,"darshan").toString(CryptoJS.enc.Utf8);
                        // console.log(CryptoJS.AES.decrypt(msg.text,"darshan").toString(CryptoJS.enc.Utf8));
                    }
                        element.unseenMsg=msg.text;
                }
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
                {
                element.istyping=true;
                setTimeout(() => {
                    element.istyping=false;
                    }, 3000);
                }
            })            
            commit('SET_TYPING', tempFriends)
        }
    },
    mutations: {
        SET_USER(state, data) {
            state.user = data;
        },
        SET_ME(state, data) {
            state.me = data;
        },
        SET_FRIENDS(state, data) {
            state.friendsData = data;
        },
        SET_SELF_TYPING(state, data) {
            state.selfTyping = data;
        },
        // SET_MESSAGES(state, data) {
        //     state.usersMessages = data;
        // },
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
        me:state=>state.me,
        user:state=>state.user,
        friendsAllData: state => state.friendsAllData,
        onlineUsers: state => state.onlineUsers,
        // usersMessages: state => state.usersMessages,
        selfTyping: state => state.selfTyping,
    }
})