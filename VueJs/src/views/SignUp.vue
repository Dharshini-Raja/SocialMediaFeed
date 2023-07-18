<script>
import SignUp from '@/components/SignUp.vue'
export default{
    data(){},
    components:{
        SignUp
    }
}
</script>


<template>
    <SignUp />
</template>

<style>
body{
    /* background-color: black; */
    background-image: url('https://e1.pxfuel.com/desktop-wallpaper/975/55/desktop-wallpaper-login-page-login.jpg');
    background-size: cover;
    background-position: center;
}
#app{
    display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
h1{
    color: #333;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  padding: 10px;
  background-color: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
h2{
    text-align: center;
  margin-bottom: 20px;
  color: #5475a2;
  font-size: 24px;
  font-weight: bold;
}
input{
    width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
#form{
  align-items: center;
  padding: 20px;
    padding-left: 120px;
    padding-right: 120px;
    padding-bottom: 50px;
  border-radius: 10px;
  box-shadow: 0 2px 4px white;
  width: 100%;
}
#app{
    align-items: center;
    align-content: center;
}
button{
    display: block;
  width: 100%;
  padding: 10px;
  background-color: #5475a2;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
a{
    display: inline-block;
  padding: 5px 30px;
  color: #fff;
  width: 100%;
  text-decoration: none;
  background-color: #5475a2;
  border-radius: 4px;
  transition: background-color 0.5s ease;

}

</style>>