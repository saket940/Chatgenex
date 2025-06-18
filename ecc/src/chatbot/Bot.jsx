import React from 'react'

const Bot =  (props) => {
  document.getElementById('chatBody').lastElementChild.style.display="none"
  document.getElementById('chatBody').innerHTML+=`<div class="message bot ">${props}</div>`
  document.getElementById('chatBody').scrollTo(0,document.getElementById('chatBody').scrollHeight);
  }
export default Bot
