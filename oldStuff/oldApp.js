import React, {Component} from 'react';
import SelectUser from './components/selectUser';
import MessageForm from './components/messageForm';
import DisplayUser from './components/displayUser';
import ChatSelector from './components/chatSelector';
import Chat from './components/chat';

import io from 'socket.io-client'
let socket = io(`http://localhost:3000`)

class App extends Component {
state = {
  data: null,
  user: null,
  user1_id: "5e2c98a6f31b6d575aba5152",
  user2_id: "5e2ca1cfd5119a609f497fba",
  user3_id: "5e2df6a79ddda8cf0be7074e",
  selectedChat: null,
  selectedChatMessages: null
}

componentDidMount(){
  socket.on('countUpdated', () => {console.log("recieved")} )
}

setUser = (user) => {
  this.setState({user: user})
}

whichSender = (u) => {
  if(! u){
    if(this.state.user === "user1"){return this.state.user1_id}
    if(this.state.user === "user2"){return this.state.user2_id}
    if(this.state.user === "user3"){return this.state.user3_id}
  }else{
    if(u=== "user1"){return this.state.user1_id}
    if(u=== "user2"){return this.state.user2_id}
    if(u=== "user3"){return this.state.user3_id}
  }
}
sendMessage = (e) => {
  e.preventDefault()
  
  const message = e.target.elements.message.value
  const sender = this.whichSender()
  const reciever = e.target.elements.select.value
  
  console.log("message" + message)
  console.log("reciever" + reciever)
  console.log("sender" + sender)

  const messageInfo = {message, sender, reciever}

  socket.emit("newMessage", messageInfo)
}

whichUser = () => {
  return <DisplayUser state = {this.state} />
}

showChat = () => {
  if (this.state.selectedChat === null){return} 
  else{
    return <Chat state = {this.state} getCurrentChatMessages = {this.getCurrentChatMessages}/>
  }
}

selectChat = (e) => {
  e.preventDefault()
  this.setState ({selectedChat: e.target.elements.select.value})
  setTimeout(() => {this.getCurrentChatMessages()}, 200)
}

getCurrentChatMessages = () => {
  console.log("trying to get curnt msgs")
  const currentUser = this.whichSender()
  const chatPartner = this.whichSender(this.state.selectedChat)
  
  const chatInfo = {currentUser, chatPartner}
  console.log(chatInfo)

  fetch("http://localhost:3000/currentMessages", {method: "POST",
  headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",         
  },
  body: JSON.stringify(chatInfo)}).then((resp) => resp.json()).then((body) => this.setState({selectedChatMessages: body}))
}

  render () {
    return (
      <div>
        <h1>check</h1>
        <SelectUser setUser = {this.setUser}/>
        <MessageForm sendMessage = {this.sendMessage} state = {this.state}/>
        {this.whichUser()}
        <ChatSelector selectChat = {this.selectChat} state = {this.state}/>
        {this.showChat()}
      </div>
    )
  }
}

// getAllUsers = () => {
  //   const currentUser = {currentUser: this.state.currentUser}

  //   fetch("http://localhost:3000/getAllUsers", {
  //     method: "POST",
  //     headers: {
  //         "Content-Type": "application/json",
  //         "Accept": "application/json", 
  //         "Authorization": "Bearer "+this.state.token        
  //     },
  //     body: JSON.stringify(currentUser)
  //   })
  //   .then((resp) => resp.json())
  //   .then((body) => this.setState({allUsers: body}))
  //   .catch((e) => {console.log("failed to get all users")})
  // }

  // openChat = (user, toggleNewMsg) => {
  //   this.setState({openChatUser: user, currentChatMessages: null},
  //     () => {this.getCurrentChatMessages()}
  //   ) 
  //   if (toggleNewMsg){
  //     const newAllUsers = this.state.allUsers.map((iUser) => {
  //       if(iUser === user){
  //         iUser.newMessage = false
  //         return iUser}else{
  //         return iUser
  //       }
  //     })
  //     this.setState({allUsers: newAllUsers})
  //   }
  // }

  // showChat = () => {
  //   if (this.state.openChatUser){
  //     return <Chat state = {this.state} sendMessage = {this.sendMessage} getCurrentChatMessages = {this.getCurrentChatMessages}/>
  //   }
  // }

  // getCurrentChatMessages = () => {
  //   const currentUser = this.state.currentUser
  //   const chatPartner = this.state.openChatUser
  //   const chatInfo = {currentUser, chatPartner}
    
  //   fetch("http://localhost:3000/currentMessages", {
  //     method: "POST",
  //     headers: {
  //         "Content-Type": "application/json",
  //         "Accept": "application/json",   
  //         "Authorization": "Bearer "+this.state.token      
  //     },
  //     body: JSON.stringify(chatInfo)
  //   })
  //   .then((resp) => resp.json())
  //   .then((body) => this.setState({currentChatMessages: body}))
  //   .catch((e) => {console.log("failed to get current chat msgs. try again pls!")})
  // }

  // sendMessage = (e) => {
  //   e.preventDefault()

  //   const message = e.target.elements.message.value
  //   const sender = this.state.currentUser
  //   const reciever = this.state.openChatUser

  //   const messageInfo = {message, sender, reciever}
    
  //   socket.emit("newMessage", messageInfo)
  // }  

export default App;
