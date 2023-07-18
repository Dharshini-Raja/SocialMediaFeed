<script>
import axios from 'axios'

export default{
    data(){
        return{
                details:{
                username: '',
                posts:'',
            },
            flag: false,
        }
    },
    
    methods:{
        insert() {
            if(this.flag){
                //console.log(localStorage.getItem('username'))
                this.details.username = localStorage.getItem('username');
                 //this.details.username =  'no';
                 console.log(this.details.username,"verdict")
            if(this.details.posts == ''){
                alert("Write a post");
                this.resetform();
            }
            else{
               axios
            .post(`http://127.0.0.1:3333/insertPost`, this.details)
            .then((response) => console.log(response))
            alert('Posted Successfully!')
                    this.resetform();     
                    this.$router.push('/view');  
            }
        }else{
            this.redirect();
        }
     
         },
         resetform(){
            this.details.posts = '';
         },
         redirect(){
            this.$router.push('/view');
         }
        
    }
}
</script>


<template>
    
    <div id="post">
        <h2>Create New Post</h2>
    <form @submit.prevent="insert"><br>
        
        <input id="text" type="textarea" v-model="this.details.posts"><br><br>
        <div id="btn">
        <button type="submit" @click="this.flag=true">Post</button><br>
        <button>Cancel</button>
    </div>
        <br><br>
    </form>
</div>
</template>

<style>
body{
    background-image: url('https://e0.pxfuel.com/wallpapers/629/923/desktop-wallpaper-blue-blue-designs-cool-blue-light-blue-for-your-mobile-tablet-explore-background-blue-blue-background-blue-black-and-blue.jpg');
    background-size: cover;
}
h2 {
  color: rgb(75, 73, 73);
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 4px white;
  background-color: whitesmoke;
}

#post {
    align-items: center;
  padding: 20px;
    padding-left: 120px;
    padding-right: 120px;
    padding-bottom: 50px;
  border-radius: 10px;
  box-shadow: 0 2px 4px white;
  width: 100%;
}

#text {
    width: 100%;
  height: 150px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  background-color: #b4c6df;
  color: #333;
  font-size: 16px;
  font-family: Arial, sans-serif;
  resize: vertical;
  padding-right: 300px;
}

#text:focus {
  outline: none;
  border-color: #5475a2;
  box-shadow: 2px 2px 5px white;
}
#app{
    align-items: center;
    align-content: center;
}
#app{
    display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
button {
  padding: 10px 20px;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
}

button:first-child {
  background-color: #5475a2;
}

button:hover {
    box-shadow: 2px 2px 5px white;
    background-color: #4caf50;
}

button:last-child {
  background-color: #5475a2;
}
button:last-child:hover {
    box-shadow: 2px 2px 5px white;
    background-color: #ca5043;
}
</style>