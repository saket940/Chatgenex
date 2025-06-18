import React, { useEffect } from 'react'

function Oldchat(){ useEffect(() => {
    const pathname = window.location.pathname;
    const id = "index"+pathname.length < 25 ? "index67de4c32c1c7ae48eee336f0" : "index"+pathname.slice(1);
            const ido = pathname.length < 25 ? "67de4c32c1c7ae48eee336f0" : pathname.slice(1);
    for (let index = 1; parseInt(localStorage.getItem(id)) >= index; index++) {
    
        document.getElementById('chatBody').innerHTML+=`<div class="message user">${localStorage.getItem('user'+ido+index)}</div><div class="message bot">${localStorage.getItem('bot'+ido+index)}</div>`;
        document.getElementById('chatBody').scrollTo(0,document.getElementById('chatBody').scrollHeight);
    };
},[]);}


export default Oldchat
