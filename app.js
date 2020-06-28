const socket = io("http://localhost:3000");
const form = document.getElementById("sends");
const msg = document.getElementById("msg");
const chat = document.getElementById("chat");
const name = prompt("what is your name?");
appendMessage("You Joined!!");
socket.emit("new-user", name);

socket.on("msg",(data) =>{
appendMessage(`${data.name}:> ${data.message}`)
});

socket.on("user-connected",(name) =>{
    appendMessage(`${name} has Joined the conversation`);
})

socket.on("user-disconnected",(name)=>{
    appendMessage(`${name} has left the conversation.`)
});

form.addEventListener("submit",(e)=>{
    const message = msg.value;
    e.preventDefault();
    appendMessage(`You:>${message}`);
    socket.emit("scm", message);
    msg.value = '';
})
 function appendMessage(msg){
     const msgElement = document.createElement('div');
     msgElement.innerText = msg;
     chat.appendChild(msgElement);
 }
