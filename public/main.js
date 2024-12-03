const socket=io();
const msgsend=document.getElementById("name-input");
const msgc=document.getElementById("message-container");
const msgf=document.getElementById("message-form");
const msgin=document.getElementById("message-input");
const totalclients=document.getElementById("total-clients");
socket.on("tc",(count)=>{
    totalclients.innerText=`Total Clients : ${count}`
})
msgf.addEventListener("submit",(e)=>{
    e.preventDefault();
    const message=msgin.value;
    console.log(message);
    const data={
        "name":`${msgsend.value}`,
        "message":`${message}`,
        "date":new Date()
    }
    console.log(data);  
    socket.emit("message",data);
    addmsg(true,data);
    msgin.value='';

    
})
socket.on("chatmessage",(data)=>{
    console.log(data);
    addmsg(false,data);
})

function addmsg(isownmsg,data){
    const dateObj = new Date(data.date); // Convert the date string back to a Date object
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    console.log("aaaaaaaaaaaaaaaa");
   const element=` <li class="${!isownmsg?"message-left":"message-right"}">
                    <p class="message">${data.message} <span>Bluebird ${hours}:${minutes}</span></p>
                </li>`
        msgc.innerHTML+=element;
        scrolltobottom();
}

function scrolltobottom(){
msgc.scrollTo(0,msgc.scrollHeight);
}