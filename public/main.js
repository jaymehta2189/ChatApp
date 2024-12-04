const socket=io();
const msgsend=document.getElementById("name-input");
const msgc=document.getElementById("message-container");
const msgf=document.getElementById("message-form");
const msgin=document.getElementById("message-input");
const totalclients=document.getElementById("total-clients");
const tone=new Audio('/achive-sound-132273.mp3');
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
    tone.play();
    console.log(data);
    addmsg(false,data);
})

function addmsg(isownmsg,data){
    clearfeedback();
    const dateObj = new Date(data.date); // Convert the date string back to a Date object
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    // console.log("aaaaaaaaaaaaaaaa");
   const element=` <li class="${!isownmsg?"message-left":"message-right"}">
                    <p class="message">${data.message} <span>${isownmsg?"you":data.name}( ${hours}:${minutes})</span></p>
                </li>`
        msgc.innerHTML+=element;
        scrolltobottom();
}

function scrolltobottom(){
msgc.scrollTo(0,msgc.scrollHeight);
}

msgin.addEventListener("focus",(e)=>{
    const val=msgsend.value;
    socket.emit("feedback",{
        "feedback":`${val} is typing`
    });
})
msgin.addEventListener("blur",(e)=>{
    
    socket.emit("feedback",{
        "feedback":""
    });
})
msgin.addEventListener("keypress",(e)=>{
    const val=msgsend.value;
    
    socket.emit("feedback",{
        "feedback":`${val} is typing`
    });
})


socket.on("feedbackto",(data)=>{
    clearfeedback();
   const element=` <li class="message-feedback">
                    <p class="feedback" id="feedback">
                        ${data.feedback}
                    </p>
                </li>`
    msgc.innerHTML+=element;
})

function clearfeedback(){
    document.querySelectorAll("li.message-feedback").forEach(element=>{
        element.parentNode.removeChild(element);
    })
    
}