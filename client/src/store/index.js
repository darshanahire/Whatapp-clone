import Vue from 'vue'
import Vuex from 'vuex'
import http from "../services/https.vue"

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        me: localStorage.getItem("Wuser") || "",
        friendsData: [],
        friendsAllData: [],

    },
    actions: {
        GetFriends({state,commit }) {
            return new Promise((resolve, reject) => {
                const payload = { _id: this.state.me };
                http.getFriends(payload).then((data) => {
                    console.log(data);
                    
                    data.map((friend) => {          
                        !state.friendsAllData.some(user => user.id === friend.members[1]) &&
                        state.friendsAllData.push({ id: friend.members[1], unseenCount: 0  });
                    })
                    commit('SET_FRIENDS', data)
                    resolve(data);
                }).catch((err) => {
                    console.log(err);
                    reject(err);

                })
            })
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
        }
    },
    mutations: {
        SET_FRIENDS(state, data) {
            state.friendsData = data;
        },
        UPDATE_SEEN_MSG(state,tempFriends){
            // console.log(tempFriends);
            
        state.friendsAllData = tempFriends;
        },
        RESET_SEEN_MSG(state,tempFriends){
        state.friendsAllData = tempFriends;
        }
    },
    modules: {},
    getters: {
        friendsAllData: state => state.friendsAllData,
    }
})