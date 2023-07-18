<script>
import axios from 'axios'
export default{
  name: 'View',
  props: {
        initialData: Object,
      },
    data(){
        return {
            username: '',
            posts: '',
            likes: '',
            comments: '',
            id: '',
            arr: null,
            showDialog: false,
            textInput: '',
            comments_arr: [],
            date_arr: '',
    

    }
    },
    watch:{
        initialData(newData){
          this.arr = newData
        }
      },

    methods:{
        likeCount(item){
            this.id = item.id;
            
            console.log(this.id);
            axios.put(`http://127.0.0.1:3333/like/${this.id}`)
            .then((response) => {
                console.log(response);
                this.refresh();
            })
            
        },
        refresh(){
          axios.get(`http://127.0.0.1:3333/view`)
              .then((response) => {
                  this.arr = response.data
                  this.arr.forEach(obj => {
                    this.comments_arr  = obj.comments; // Accessing comments array using dot operator
                    this.date_arr = obj.createdAt;
                 // console.log(this.comments_arr); // Accessing comments array using square brackets operator
                 console.log(this.arr,"arr")
                });

                  console.log(this.arr)
                }).catch((err) => {
                  console.log(err);
                })

        },
  
     openDialog(item) {
      this.id = item.id;
      this.showDialog = true;
    },
    closeDialog() {
      this.showDialog = false;
      this.textInput = '';
      this.refresh();
    },
    saveText() {
      // Perform any operations with the text input
      if(this.textInput){
      console.log(this.textInput);
      console.log(this.id);
           const details = {
                comment: this.textInput,
                  pid: this.id
            }
            
            console.log(details)
            
            axios
        .post(`http://127.0.0.1:3333/comment`, details)
        .then((response) => console.log(response.data))
        // alert('Inserted Successfully!')
               
      this.closeDialog();
          }else{
            alert("Enter a comment!")
          }
    },
    newPost(){
        this.$router.push('/feed')
    },
    logAudit(){
      axios
        .get(`http://127.0.0.1:3333/logging`)
        .then((response) => console.log(response.data))
    }
        
    }
}
</script>

<template>
  <div id="topDiv">
    <h1>FeedGram</h1> 

    <button class="essential" @click="newPost">New Post</button>
    <button class="essential" @click="this.$router.push('/')">Logout</button>
  </div>
  <br>
  <div id="tableData">
    <table>
        <tbody>
     <tr  id="main_tr" v-for ="(item,index) in arr" :key="index">

       <button  class="user" :disabled="true" >User: {{ item.username }}</button><br>
       <button class="post" :disabled="true" id="post">{{ item.posts }}</button><br>
      
       <button class="like" @click="likeCount(item)"  id="likes" >Likes: {{ item.likes }}</button><br>
      
      <tr  class="btn-container" v-for ="(itemComment,indexComment) in item.comments" :key="indexComment">
          <button class="comment" :disabled="true" >{{ itemComment }}</button>
          <button class="comment" :disabled="true" >{{ item.createdAt[indexComment] }}</button>
      </tr>

        <button class="like" @click="openDialog(item)">Comment</button><br><br>
       
    </tr>
    </tbody> 
        </table><br>
        </div> <br>
        <button class="essential" @click="logAudit">Download</button><br>
        <!-- <input type="text" v-model="username"> -->
        
<!-- Dialog Box -->
<div class="dialog" v-show="showDialog">
  <div class="dialog-content">
    <input type="text" v-model="textInput" placeholder="Enter Comment" />
    <button class="dialog-button" @click="saveText">Post</button>
    <button class="dialog-button" @click="closeDialog">Cancel</button>
  </div>
</div>
</template>
<style>

body{
    background-image: url('https://e1.pxfuel.com/desktop-wallpaper/975/55/desktop-wallpaper-login-page-login.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    
}
#topDiv {
    display: flex;
    justify-content:space-around;
    /* background-color: #f8f8f8; */
    align-items: center;
    padding: 10px;
    border-radius: 10px;
    height: 20px;
    width: 1000px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    align-content: center;
    padding-top: 50px;
  }
  
  h1 {
    color: #333;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  padding: 10px;
  width: 50%;
  background-color: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  button.essential {
    display: block;
  width: 160px;
  padding: 10px;
  background-color: #5475a2;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  }
  button.essential:hover {
    box-shadow: 2px 2px 5px white;
    background-color: #4caf50;
}
  
  #tableData {
    margin-top: 40px;

  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    
  }
  
  #main_tr {
    /* background-color: #f8f8f8; */
    
    border-radius: 10px;
    box-shadow: 0 2px 4px rgb(255, 255, 255);
    text-align: center;
    
  }
  .btn-container {
  display: flex;
  justify-content: center;
}

.btn-container button {
  flex: 0.247;
  /* Add other button styles if needed */
}
  button.user {
    padding: 10px 20px;
    background-color: #563666;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 15px;
    margin: 5px;
    width: 50%;
  }
  button.post {
    background-color: #bca1ca;
    color: #fff;
    border: none;
    height: 100px;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 15px;
    margin: 5px;
    width: 50%;
    box-shadow: 0 2px 4px #bca1ca;
  }
  button.like {
    padding: 10px 20px;
    background-color: #a761ca;
    color: #fff;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    margin: 5px;
  }
  button.like:hover {
    box-shadow: 2px 2px 5px #895aa0;
    background-color: #bca1ca;
}
button.comment {
    background-color: #bca1ca;
    color: #fff;
    border: none;
    cursor: pointer;
    width: 20px;
    box-shadow: 0 2px 4px #bca1ca;
    height: 40px;
  }
  .dialog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(168, 139, 162, 0.436);
    z-index: 9999;
  }
  
  .dialog-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  input[type="text"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 40px;
    margin-bottom: 10px;
  }
  
  button.dialog-button {
    padding: 10px 20px;
    background-color: #a761ca;
    color: #fff;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    margin: 5px;
  }
  button.dialog-button:hover {
    box-shadow: 2px 2px 5px #895aa0;
    background-color: #bca1ca;
  }
  button.dialog-button:hover:last-child {
    background-color: #fb604f;
  }
</style>