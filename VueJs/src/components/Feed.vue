<script>
import axios from 'axios'

export default{
    data(){
        return{
                details:{
                username: '',
                posts:'',
            }
        }
    },
    
    methods:{
        insert() {
                //this.details.username = sessionStorage.getItem('username');
                 this.details.username =  'no';
                 console.log(this.details.username)
                
               axios
            .post(`http://127.0.0.1:3333/insertPost`, this.details)
            .then((response) => console.log(response))
            alert('Posted Successfully!')
                    this.resetform();     
                    this.$router.push('/view');  
     
         },
         resetform(){
            this.details.posts = '';
         },
        
    }
}
</script>


<template>
    <form @submit.prevent="insert">
        <input type="textarea" v-model="this.details.posts">
        <button type="submit">Post</button>
    </form>
</template>

<style>
button{
    background-color: green;
}
</style>