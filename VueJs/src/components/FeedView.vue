<script>
import axios from 'axios'
export default{
    data(){
        return {
            username: '',
            posts: '',
            likes: '',
            comments: '',
            id: '',
            arr: null,
            isLiked: true,
            showDialog: false,
      textInput: ''

    }
    },
    mounted(){
        axios.get(`http://127.0.0.1:3333/view`)
    .then((response) => {
        this.arr = response.data
        // for(let i=0; i<this.arr.length;i++){
        //     this.username = this.arr[i].username
        // 
        // }
        console.log(this.arr)
      }).catch((err) => {
        console.log(err);
      })
    },
    methods:{
        likeCount(item){
            this.id = item.id
            console.log(this.id)
            axios.get(`http://127.0.0.1:3333/like/${this.id}`)
            .then((response) => {
                console.log(response);
                this.isLiked = true
                this.$router.push('/view')
            })
        },
  
     openDialog(item) {
      this.id = item.id;
      this.showDialog = true;
    },
    closeDialog() {
      this.showDialog = false;
      this.textInput = '';
    },
    saveText() {
      // Perform any operations with the text input
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
    },
    newPost(){
        this.$router.push('/feed')
    }
        
    }
}
</script>

<template>
    <h1>FeedGram</h1>
    <br>
    <br>
    <button class="like" @click="newPost">New Post</button><br><br>

    <table>
        <tbody>
     <tr  v-for ="(item,index) in arr" :key="index">

       <button  class="view" :disabled="this.isLiked" >{{ item.username }}</button><br>
       <button class="view" :disabled="this.isLiked">{{ item.posts }}</button><br>
       <button class="like" @click="likeCount(item)"  id="likes">{{ item.likes }}</button><br>
       <button class="view" :disabled="this.isLiked" >{{ item.comment }}</button><br>

        <button class="like" @click="openDialog(item)">Comment</button><br><br>
    </tr>
   
    </tbody> 
        </table>
        <!-- <input type="text" v-model="username"> -->
        
<!-- Dialog Box -->
<div class="dialog" v-show="showDialog">
  <div class="dialog-content">
    <input type="text" v-model="textInput" placeholder="Enter text" />
    <button @click="saveText">Post</button>
    <button @click="closeDialog">Cancel</button>
  </div>
</div>
</template>
<style>
.view{
    color:black;
    background-color: white;
    width: 150%;
    height: 60%; 
}
.like{
    background-color: green;
}
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.dialog-content {
  background-color: white;
  padding: 20px;
}

.dialog input {
  margin-bottom: 10px;
}
</style>