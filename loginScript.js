/**this page contains the login validations and all the validatrions are attacthed required for the signup */


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword , signOut , sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getDatabase , set , ref , update } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";



 const firebaseConfig = {
    apiKey: "AIzaSyCpNe3oJxG6U9GmyDHbqPXzztBX0tcwP_o",
    authDomain: "assignment-4e13f.firebaseapp.com",
    projectId: "assignment-4e13f",
    storageBucket: "assignment-4e13f.appspot.com",
    messagingSenderId: "1060037765521",
    appId: "1:1060037765521:web:b1d8f8264e8a76a512d230",
    measurementId: "G-XTVEZ8T3TH"
  };

  const app = initializeApp(firebaseConfig)
  const database = getDatabase()
  const analytics = getAnalytics()


  enter_pdf.addEventListener('click' , (e)=>{
    const email = document.getElementById("login_Email").value
    const password = document.getElementById("login_password").value

    const auth = getAuth()
    signInWithEmailAndPassword(auth , email , password).then((UserCredential)=>{
         const user  = UserCredential.user
         const dt = new Date();
         update(ref(database , 'users/' + user.uid),{
            last_login : dt
         })
         alert("logged in Successfully !!");
         window.location.href = "./dashboard.html";
       })
       .catch((error)=>{
           const errorCode = error.code;
           const errorMessage = error.message;
           alert(errorMessage);
       })
})


const forgotPass= document.getElementById("forgotPass")

forgotPass.addEventListener('click' , (e)=>{

  const auth = getAuth()
  const email = document.getElementById("login_Email").value

  if(email === null){
    alert("Please enter an email")
  }else{
 
   sendPasswordResetEmail(auth , email).then(()=>{
         alert("password resent link is sent to the email address")
   })
   .catch((error)=>{
    alert(error.message)
   })
  }
})
