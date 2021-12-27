<script>
import axios from 'axios';
export default {
name:"https",
baseUrl: "",

async CreateAccount (UserData){
    const data = await axios.post(this.baseUrl+'/signup',UserData);        
    return data;
},

async handdleLogin (UserData){
    const data = await axios.post(this.baseUrl+'/login',UserData);        
    return data;
},

async getAllUsers (){
    const data = await axios.get(this.baseUrl+'/getAllUsers');  
    return data.data;
},
async getFriends (payload){    
    const data = await axios.post(this.baseUrl+'/getUsersFriends',payload);  
    return data.data;
},

async getUser (id){
    const data = await axios.post(this.baseUrl+'/getUserdata',{id});  
    return data.data;
},

async newConversation(payload){
    const data = await axios.post(this.baseUrl+'/conversations',payload);  
    return data;
},

async sendMsg(payload){
    const data = await axios.post(this.baseUrl+'/messages',payload);  
    return data;
},

async getConversations(){
    const data = await axios.get(this.baseUrl+'/conversations/:userId');  
    return data;
},

async getConversationsForLastSeen(){
    const data = await axios.get(this.baseUrl+'/conversationsId');  
    return data;
},

async getMessages(payload){
    const data = await axios.post(this.baseUrl+'/getMessages',{ payload });  
    return data;
}

}
</script>
