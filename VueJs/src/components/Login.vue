<script>
import axios from 'axios'

export default{
    data(){
        return{
            details:
            {
                username: '',
                password: '',
            }
        }
    },
    methods:{
        checkLogin(){
            console.log(this.details.username)
            //sessionStorage.setItem('no', this.details.username);
                axios
            .get(`http://127.0.0.1:3333/checkLogin/${this.details.username}/${this.details.password}`)
            .then((response) => {
                console.log(response);
                if(response.data == ""){
                    alert("Invalid Password!!");
                    this.resetform(); 
                }
                else if(response.data=="No rows are selected"){
                    alert("No such username found!!")
                    this.resetform();
                }
                else{
                    this.emitter.emit('username', {'eventContent': this.details.username})
                    this.$router.push('/view')
                   // console.log(sessionStorage.getItem('no'))
                }
            })
            //alert('Successfully!')
                   
            .catch((err) => console.log(err))  
            this.resetform();   
     
         },
         resetform(){
            this.details.username = '';
            this.details.password = '';
        }
    }

}
</script>

<template>
    <h1>FeedGram</h1>
    <h2>Login</h2>
    <form @submit.prevent="checkLogin">
    <input type="text" v-model="this.details.username" placeholder="Enter the username">
    <input type="password" v-model="this.details.password" placeholder="Enter the password">
    <button type="submit"> Login </button>
    <a href="/signUp">New to FeedGram?</a>
    </form>
</template>

<style>
</style>