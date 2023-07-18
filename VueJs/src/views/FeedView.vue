<script>
import View from '@/components/FeedView.vue'

import axios from 'axios'
export default{
    components:{
        View
    },data(){
       return{ arr: null,
        comments_arr: null,
        date_arr: null}
    },
 
        mounted(){
            console.log("hi")
            axios.get(`http://127.0.0.1:3333/view`)
    .then((response) => {
        this.arr = response.data
        console.log(this.arr)
        this.arr.forEach(obj => {
          this.comments_arr  = obj.comments; // Accessing comments array using dot operator
          this.date_arr = obj.createdAt;
      });
      }).catch((err) => {
        console.log(err);
      })
        },
   
    
}
</script>


<template>
    <View :initialData="arr"/>
</template>

 <style>
/*#topDiv{
    height:20px;
    padding-left: 200px;
}
.essential{
    display: block;
  width: 20%;
  height: 40px;
  background-color: #5475a2;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.essential:hover {
    box-shadow: 2px 2px 5px white;
    background-color: #4caf50;
}
#post{
  height: 80px;
}
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
#app{
    width: 100%;
    align-items: center;

}
h1{
    color: #333;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  padding: 10px;
  width: 50%;
  background-color: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  

} */
</style>