/**this page constains the all validations required for the signup and signup authentication */


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js";
 import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword , signOut } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
 import { getDatabase , set , ref , update } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
import {checkboxvalidation} from "./validations.js"
import {ValidateEmail} from "./validations.js"
import {passwordValidation} from "./validations.js"
import {confirmation} from "./validations.js"
import { NameEmpty } from "./validations.js"
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
  
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyCpNe3oJxG6U9GmyDHbqPXzztBX0tcwP_o",
      authDomain: "assignment-4e13f.firebaseapp.com",
      projectId: "assignment-4e13f",
      storageBucket: "assignment-4e13f.appspot.com",
      messagingSenderId: "1060037765521",
      appId: "1:1060037765521:web:b1d8f8264e8a76a512d230",
      measurementId: "G-XTVEZ8T3TH"
    };
  
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const database = getDatabase();


   

    signup.addEventListener('click' , (e)=>{
        const name = document.getElementById("fullname").value
        const password =document.getElementById("pass").value
        const confirm_pass = document.getElementById("conf_pass").value
        const Email = document.getElementById("emailadd").value
        const auth = getAuth()
    createUserWithEmailAndPassword(auth , Email , password).then((userCredential)=>{
        const user = userCredential.user
        set(ref(database , 'users/' + user.uid),{
            Name : name , 
            Email:Email,
            Password : password
        })
        alert("User Created")
        window.location.href="./dashboard.html";
    })
    .catch((error)=>{
        const errorCode = error.code
        const errorMessage = error.messages
        alert(errorMessage)
    })
    
  if(!NameEmpty(name)){
        location.reload()
    }
    if(!passwordValidation(password)){
        location.reload()
    }
    if(!confirmation(password , confirm_pass)){
        location.reload()
    }
    if(!ValidateEmail(Email)){
        location.reload()
    }
    const Box = document.getElementById("box").value
    if(!checkboxvalidation(Box)){
           location.reload()
    }
    
})
  