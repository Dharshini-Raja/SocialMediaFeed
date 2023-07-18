<script>
import axios from 'axios'
export default{
    data(){
        return{
            details:{
                username: '',
                password: '',
                bio: '',
            },
        }
    },
    methods:{
        insert() {
            
                console.log(this.details)
                
                axios
            .post(`http://127.0.0.1:3333/insertUser`, this.details)
            .then((response) =>{
             alert('Signed up Successfully!')
                     this.resetform();     
                     this.$router.push('/');  
            })
            
     
         },
         resetform(){
            this.details.username = '';
            this.details.password = '';
            this.details.bio = '';
         },
        
    }
}
</script>

<template>
    <h1>FeedGram</h1><br>
  
    <form @submit.prevent="insert" id="form"><br>  <h2>Sign Up</h2><br>
    <input type="text" v-model="this.details.username" placeholder="Enter the username" required><br>
    <input type="password" v-model="this.details.password" placeholder="Enter the password" required><br>
    <input type="text" v-model="this.details.bio" placeholder="Enter your bio"><br><br>
    <button type="submit"> Sign Up </button><br>
    <button  @click="this.$router.push('/')">Back</button><br>
    </form>
</template>

<style>
</style>