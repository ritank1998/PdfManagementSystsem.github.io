/**this page contains the validatons for the logut and also the all validations and authentications required for the upload of the pdf files and also the comment section validations */


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
import { getDatabase , get , ref ,  child } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js"
import {getStorage , ref as sRef , uploadBytesResumable , getDownloadURL, uploadBytes, listAll } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-storage.js"
import {getAuth , signOut, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js"
import {getFirestore , collection, addDoc, getDocs , deleteDoc , doc , count} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js"
const firebaseConfig = {
    apiKey: "AIzaSyCpNe3oJxG6U9GmyDHbqPXzztBX0tcwP_o",
    authDomain: "assignment-4e13f.firebaseapp.com",
    databaseURL: "https://assignment-4e13f-default-rtdb.firebaseio.com",
    projectId: "assignment-4e13f",
    storageBucket: "assignment-4e13f.appspot.com",
    messagingSenderId: "1060037765521",
    appId: "1:1060037765521:web:b1d8f8264e8a76a512d230",
    measurementId: "G-XTVEZ8T3TH"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const storage = getStorage()
  const realdb = getDatabase()
  const db = getFirestore(app);
  const addComment = document.querySelector('#comments')

  var uid = ""

logout.addEventListener('click' , (e)=>{
    const auth = getAuth();
  signOut(auth).then(() => {
    window.location.href="./loginindex.html";
    alert("You are logged out Successfully");
  }).catch((error) => {
    alert("Error Logging out");
  });
  })

  function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }



console.log(storage)

var files =[]
var reader = new FileReader()


/**const realFileBtn = document.getElementById("real-file")
const myBtn = document.getElementById("newBtn")
const costumText = document.getElementById("custom-text")*/



var files = []
var comments = []
var reader = new FileReader()

var nameBox = document.getElementById("nameBox")
var extlab = document.getElementById("extlab")
var myImg = document.getElementById("myImg")
var progLab = document.getElementById("upProgress")
var selBtn = document.getElementById("selBtn")
var upBtn = document.getElementById("uploadBtn")
var DownBtn = document.getElementById("downBtn")
var myFilesBtn = document.getElementById("options")
var myDownFiles = document.getElementById("myfilesOnServer")
var postBtn = document.getElementById("postBtn")
var comment = document.getElementById("comment")
var share = document.getElementById("share")


var selectedFileName = []

const auth = getAuth();




var input = document.createElement('input');
input.type = 'file'

input.onchange = e =>{
  files = e.target.files

  var extension = GetFileExt(files[0])
  var name = GetFileName(files[0])


  nameBox.value = name
  extlab.innerHTML = extension

  reader.readAsDataURL(files[0])
}

reader.onload = function(){
    myImg.src = reader.result
}


selBtn.onclick = function(){
  input.click();
}
up_pdf.addEventListener('click' , (e)=>{
  selBtn.click()
})
function GetFileExt(file){
  var temp = file.name.split('.')
  var ext = temp.slice((temp.length-1),(temp.length))
  return '.'+ext[0]
}

function GetFileName(file){
  var temp = file.name.split('.')
  var fname = temp.slice(0,-1).join('.')
  return fname
}

                  /**upload method*/
          
async function uploadProcess(){
    var fileToupload = files[0]

    var ImgName = nameBox.value + extlab.innerHTML

    if(!ValidateName()){
        alert("Invalid File name , Cannot contain special characters except @")
    }

    const metadata = {
        contentType : fileToupload.type
    }
   
    const user = auth.currentUser;
    uid = user.uid;

    console.log("uid ::" + uid);

    const path = "files/" + uid + "/" + ImgName

    console.log("path :: " + path);

    const StorageRef = sRef(storage , path)

    // const uploadTask = uploadBytes(StorageRef, ImgName).then((snapshot) => {
    //   console.log("uploaded");
    // })

    const uploadTask = uploadBytesResumable(StorageRef , fileToupload , metadata)

    uploadTask.on('state-changed' , (snapshot)=>{
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100

        progLab.innerHTML = "upload" + progress + "%"
    }),
    (error)=>{
        alert("Image Not Uploaded")
    },
    ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          console.log(downloadURL)  
          //saveURLtoRealtimeDB(downloadURL)
        })
    }

}

/**async function ReadComments(){
  var readmyComments = comments[0]
  var myComment = comment.innerHTML

  const metadata = {
    contentType : readmyComments.type
}
const user = auth.currentUser;
    uid = user.uid;

    console.log("uid ::" + uid);

    const path = "comments/" + uid + "/" + myComment

    console.log("path :: " + path);

    const StorageRef = sRef(storage , path)


    const uploadTask = uploadBytesResumable(StorageRef , readmyComments , metadata)

    
}**/


//----function for realtime database---//
function saveURLtoRealtimeDB(URL){
  var name = nameBox.value
  var ext = extlab.innerHTML 

  set(ref(realdb , "ImagesLinks/"+name),{
      ImagesName : (name + ext),
      ImgUrl : URL
  })
}

function GetUrlfromRealtimeDB(URL){
    var name = nameBox.value
    var ext = extlab.innerHTML 
    

    var dbRef = ref(realdb)
    get(child(dbRef , "ImagesLinks/" +name)).then((snapshot)=>{
        if(snapshot.exists()){
            myImg.src = snapshot.val().ImgUrl
        }
    })
}

function list_my_files() {

  const user = auth.currentUser;
  uid = user.uid;

  console.log(uid);

  const path = "files/" + uid; 
  const listRef = sRef(storage, path);

  listAll(listRef).then((res) => {
    res.prefixes.forEach((folderRef) => {
      myDownFiles.innerHTML = folderRef.name 
      console.log(folderRef.name);
    });

    res.items.forEach((itemRef) => {
      selectedFileName.push(itemRef.name)
      myDownFiles.innerHTML = itemRef.name 
      console.log(itemRef.name);
      const newPathToDownload = path+"/"+itemRef.name
      console.log(newPathToDownload)

      const starsRef = sRef(storage , newPathToDownload)
      getDownloadURL(starsRef).then((url)=>{
        console.log(url)
       window.open(url , '_blank')
       share.addEventListener('click' , (e)=>{
        navigator.clipboard.writeText(url).then(function(){
          alert("copied")
        }, function (){
          alert("Copying error occured")
        }
        )
       })

      }).catch((error)=>{
        console.log(error.message)
      })
    })
  }).catch((error) => {
    console.log(error);
  });
  
  const path1 = "comments/" +uid
  const listComments = sRef(storage,path1)

  listAll(listComments).then((res)=>{
    res.prefixes.forEach((folderRef)=>{
      console.log(folderRef.name)
    })
    res.items.forEach((itemRef)=>{
      console.log(itemRef.name)
    })
  }).catch((error)=>{
    console.log(error)
  })

}

//name validation as realdb does not allow few characters
function ValidateName(){
    var regex = /[\.#$\[\]]/
    return !(regex.test(nameBox.value));
}
      
                 
upBtn.onclick = uploadProcess

DownBtn.onclick = GetUrlfromRealtimeDB
myFilesBtn.onclick = list_my_files


console.log("TEST ::" + selectedFileName);

var colRef = collection(db,"comments/")
getDocs(colRef).then((snapshot)=>{
    let comments = []
    snapshot.docs.forEach((doc)=>{
        comments.push({...doc.data(), id: doc.id})
    })
    console.log(comments)
})
.catch((error)=>{
    console.log(error.message)
})

addComment.addEventListener('submit', (e)=>{
    e.preventDefault()

    colRef = collection(db, "comments/" + selectedFileName[0] + "/" + (auth.currentUser).uid)

    console.log(selectedFileName[0] + "TEST")
    addDoc(colRef, {
        Name: addComment.name.value,
        Mycomment: addComment.comment.value , 
    }).then(()=>{
        addComment.reset()
    })

})


const deletecomment = document.querySelector('#delete')
deletecomment.addEventListener('submit' , (e)=>{
    e.preventDefault()

    getComment();

    // docssnap.forEach(doc => {
    //   console.log(doc.data())
    // })

    // const docRef = doc(db , 'comments' , deletecomment.id.value )

    // deleteDoc(docRef).then(()=>{
    //     deletecomment.reset()
    // })
})

                     
async function getComment() {
  console.log("Looking at :: " + "comments/" + selectedFileName[0] + "/" + (auth.currentUser).uid)
  const commentRef = collection(db, "comments/" + selectedFileName[0] + "/" + (auth.currentUser).uid)

    const docssnap = await getDocs(commentRef);
      

    console.log(docssnap)

    docssnap.forEach(doc => {
      console.log(doc.data());
      document.getElementById('mycomment').innerHTML = doc.data().Mycomment
      
    })
}     


