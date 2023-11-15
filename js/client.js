// Client Socket Creation
const socket=io('https://ichatdesk-api.onrender.com/');

// Get DOM Elements in a respective js variables
const form=document.getElementById('send-container');
const messageInput=document.getElementById('messageInp');
const messageContainer=document.querySelector('.container');

// Audio that will play on recieving messages
const audio=new Audio('assets/ting.mp3')

// Function which will append Messages to the container(Chat Box)
const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerHTML=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position=='left')
    {
        audio.play();
    }
}


// Ask new users for his/her name and let the server know
const username=prompt("Enter your Name to join")
// console.log(username)
socket.emit('new-user-joined',username);

// If a new user joins, receive his/her name from the server
socket.on('user-joined',name=>{
    append(`${name} has joined the chat`,'left')
})

// If server sends a message, receive it
socket.on('receive',data=>{
    append(`<b>${data.name}</b>: ${data.message}`,'left')
})

// If a user leaves the chat, append the info to the container
socket.on('left',name=>{
    append(`${name} left the chat`,'left')
})

// If the form get submitted, send server the message
// Function which will append event to the container(Chat Box)
form.addEventListener('submit',(e)=>{

    // so that page don't reload
    e.preventDefault();
    
    const message=messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send', message);
    messageInput.value='';
})
