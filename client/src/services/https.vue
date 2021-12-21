<script>
import axios from 'axios';
export default {
name:"https",
baseUrl: "http://localhost:5000",

async CreateAccount (UserData){
    const data = await axios.post(this.baseUrl+'/signup',UserData);        
    return data;
},

async getAllUsers (){
    const data = await axios.get(this.baseUrl+'/getAllUsers');  
    return data.data;
},

async getUser (id){
    const data = await axios.post(this.baseUrl+'/getUser',id);  
       console.log(id);
        
    return data;
}

}
</script>
