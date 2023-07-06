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
            .then((response) => alert(response.data))
            // alert('Inserted Successfully!')
                     this.resetform();     
                     this.$router.push('/');  
     
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
    <h1>FeedGram</h1>
    <h2>Sign Up</h2>
    <form @submit.prevent="insert">
    <input type="text" v-model="this.details.username" placeholder="Enter the username">
    <input type="password" v-model="this.details.password" placeholder="Enter the password">
    <input type="text" v-model="this.details.bio" placeholder="Enter your bio">
    <button type="submit"> Sign Up </button>
    </form>
</template>

<style>
</style>