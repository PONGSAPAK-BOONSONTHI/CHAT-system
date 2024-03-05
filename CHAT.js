const icon = document.querySelector("i")
const text = document.querySelector("h1")
const body = document.querySelector("body")
const timeElement = document.getElementById("time")

icon.addEventListener("click",function(){
    this.classList.toggle("bi-moon-fill")
    if(this.classList.toggle("bi-brightness-high-fill")){
        text.innerText="โหมดกลางวัน"
        body.style.color="rgb(20, 20, 20)"
        body.style.background="rgb(240, 240, 240)"
        body.style.transition="1s"
    }else{
        text.innerText="โหมดกลางคืน"
        body.style.color="rgb(255, 255, 255)"
        body.style.background="rgb(20, 20, 20)"
        body.style.transition="1s"
    }
})

function getCurrentTime() {
    const TIME = new Date();
    const hours = TIME.getHours();
    const mins = TIME.getMinutes();
    const secs = TIME.getSeconds();
    timeElement.innerHTML = `เวลาปัจจุบัน ${hours} : ${mins} : ${secs}`;
}
getCurrentTime();
setInterval(getCurrentTime,1000)

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
    // ค่าของ Firebase ขอตัวเองที่ใช้ในการเชื่อมต่อ
  };

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const user = window.prompt("ชื่อผู้ใ: ");
console.log(user);
document.querySelector('#showUserName').innerHTML = user;

const btnSend = document.querySelector('#btnSend');
const txtMsg = document.querySelector('#txtMsg');
        

btnSend.addEventListener('click', () => {
    // action
    set(push(ref(db, 'room1')), {
        username: user,
        msg: txtMsg.value
    });
    txtMsg.value = '';
})
onValue(ref(db, 'room1'), (snapshot) => {
    const data = snapshot.val();
    let html = '';
    snapshot.forEach((childSnapshot) => {
        var key = childSnapshot.key;
        var val = childSnapshot.val();
        console.log('key', key ,'val' ,val); 
        if (data[key].username != user) {
            console.log('not my message');
            html += `<div class="chat-incoming">
                        <img style="height: 40px; width: 40px;" class="img_user" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5dTKL2REM-P39gRm4CVCbHV28yzfUpvvd-XMHxomJhhHvFzHfzmW7suaQX4AiJvz0YRo&usqp=CAU.png">
                        <span>${data[key].msg}</span>
                    </div>`;
        } else {
            console.log('my message');
            html += `<div class="chat-outcoming">
                        <span>${data[key].msg}</span>
                        <img style="height: 40px; width: 40px;" class="img_user" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNBsMY47ex_V6H5zJurmjWNBrLhNvUJzcjOhePZyvCzCk9zsO2BS1tYlM1u5MAIKsUMmc&usqp=CAU.png">
                    </div>`;
        }
    });
    document.querySelector('#render').innerHTML = html;
});