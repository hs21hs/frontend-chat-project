import React, {Component} from 'react';
import SignUp from './containers/signUp';
import Login from './containers/login';
import Home from './containers/home'
import Chat from './containers/chat'
import io from 'socket.io-client'

let socket = io(`http://localhost:3000`)



//socket.on('countUpdated', () => {console.log("recieved")} )


class App extends Component {
  state = {
    currentUser:null,
    allUsers:null,
    page: 'signUp',
    openChatUser: null,
    currentChatMessages: null
  }

socketF = () =>{

  socket.on('bc', (m)=>{
    console.log(m)
  
    if(m.sender === this.state.currentUser._id){
      if (m.reciever === this.state.openChatUser._id){this.getCurrentChatMessages()}
    }
    if(m.reciever === this.state.currentUser._id){
      if (m.sender === this.state.openChatUser._id){this.getCurrentChatMessages()}
      else{
        const newAllUsers = this.state.allUsers.map((user) => {
          if(m.sender === user._id){user.newMessage = true
          return user}else{
            return user
          }
        })
        this.setState({allUsers: newAllUsers})
      }
    }

  })
}

  navBar = () => {
    if(this.state.page === "login" || this.state.page === "signUp"){
      return(
        <div>
          <button onClick = {() => {this.switchPage("login")}} >login</button>
          <button onClick = {() => {this.switchPage("signUp")}} >sign up</button>
        </div>
      )
    }else{
      return(
        <div>
          <button onClick = {() => {this.logout()}} >logout</button>
          <button onClick = {() => {this.switchPage("home")}} >home</button>
        </div>
      )
    }
  }

  logout = () => {
    this.setState(
      {
        currentUser:null,
        allUsers:null,
        page: 'signUp',
        openChatUser: null
      }
    )
  }
  
  switchPage = (page) => {
    this.setState({page: page})
  }


  whichPage = () => {
    if (this.state.page === "signUp"){return <SignUp signUp = {this.signUp} state = {this.state}/>}
    
    if (this.state.page === "login"){return <Login login = {this.login} state = {this.state}/>}

    if (this.state.page === "home"){return <Home  state = {this.state} getAllUsers = {this.getAllUsers} openChat = {this.openChat}/>}
  }

  login = (e) => {
    e.preventDefault()
    const username = {username:e.target.elements.username.value}
    console.log(username)
    
    fetch("http://localhost:3000/users/login", {method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",         
    },
    body: JSON.stringify(username)})
    .then((resp) => resp.json())
    .then((body) => {if(body.username){
      this.setState({currentUser: body})
      setTimeout(() => {this.switchPage("home")},200) 
    }else{alert("failed, try again pls!")}
  })
  }

  signUp = (e) => {
    e.preventDefault()
    const username = {username:e.target.elements.username.value}
    
    fetch("http://localhost:3000/users", {method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",         
      },
      body: JSON.stringify(username)})
      .then((resp) => resp.json())
      .then((body) => {if(body.username){
        this.setState({currentUser: body})
        setTimeout(() => {this.switchPage("home")},200) 
      }else{alert("failed, try again pls!")}
    })
  }


  getAllUsers = () => {
    const currentUser = {currentUser: this.state.currentUser}
    fetch("http://localhost:3000/getAllUsers", {method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",         
      },
      body: JSON.stringify(currentUser)})
      .then((resp) => resp.json())
      .then((body) => this.setState({allUsers: body}))
  }

  openChat = (user, toggleNewMsg) => {
    
    this.setState({openChatUser: user})
    setTimeout(() => {this.getCurrentChatMessages()}, 200) 
    if (toggleNewMsg){
      const newAllUsers = this.state.allUsers.map((user) => {
        if(user === user){user.newMessage = false
        return user}else{
          return user
        }
      })
      this.setState({allUsers: newAllUsers})
    }
  }

  showChat = () => {
    if (this.state.openChatUser){
      return <Chat state = {this.state} sendMessage = {this.sendMessage} getCurrentChatMessages = {this.getCurrentChatMessages}/>
    }
  }

  getCurrentChatMessages = () => {
    console.log("trying to get curnt msgs")
    const currentUser = this.state.currentUser
    const chatPartner = this.state.openChatUser
    
    const chatInfo = {currentUser, chatPartner}
    console.log(chatInfo)
  
    fetch("http://localhost:3000/currentMessages", {method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",         
    },
    body: JSON.stringify(chatInfo)}).then((resp) => resp.json()).then((body) => this.setState({currentChatMessages: body}))
  }

  sendMessage = (e) => {
    e.preventDefault()
    
    const message = e.target.elements.message.value
    const sender = this.state.currentUser
    const reciever = this.state.openChatUser

    const messageInfo = {message, sender, reciever}

    socket.emit("newMessage", messageInfo)
  }

  render () {
    return (
      <div>
        <h1>check</h1>
        {this.socketF()}
        {this.navBar()}
        {this.whichPage()}
        {this.showChat()}
      </div>
    )
  }
}

export default App;
