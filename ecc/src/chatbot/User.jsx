import React from 'react'


const User = (props) => {
  
document.getElementById('chatBody').innerHTML+=`<div class="message user">${props}</div>`;
document.getElementById('chatBody').innerHTML+=`<div class="message bot ">Loding..</div>`;
document.getElementById('chatBody').scrollTo(0,document.getElementById('chatBody').scrollHeight);
}

export default User
