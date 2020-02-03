import React, {Component} from 'react';
import SignUp from './containers/signUp';
import Login from './containers/login';
import Home from './containers/home'
import Chat from './containers/chat'
import ProfilePage from './containers/profilePage'
import SwipePage from './containers/swipePage'
import MatchesPage from './containers/matchesPage'
import io from 'socket.io-client'
import Button from 'react-bootstrap/Button'
import './App.css';

let socket = io(`http://localhost:3000`)
//socket.on('countUpdated', () => {console.log("recieved")} )

class App extends Component {
  state = {
    currentUser:null,
    allUsers:null,
    swipeUsers: null,
    page: 'login',
    openChatUser: null,
    currentChatMessages: null,
    matches: null, 
    token: null
  }
  
  componentDidMount(){
    {this.socketF(this.newMatchDetected)}
  }

  socketF = (newMatchDetected) =>{

    socket.on("newMatch",
      (match) => {  
        if (match.userOne === this.state.currentUser._id || match.userTwo === this.state.currentUser._id){
          console.log('you are part of the match!')
          newMatchDetected()
       }}
         
    )

    socket.on('bc', 
    (m)=>{
      console.log(m)
      if(this.state.currentUser){
        if(m.sender === this.state.currentUser._id){
          console.log("socket1")
          if (m.reciever === this.state.openChatUser._id){this.getCurrentChatMessages()}
        }
        if(m.reciever === this.state.currentUser._id){
          if(this.state.openChatUser){
            if (m.sender === this.state.openChatUser._id){
              console.log("socket2")
              this.getCurrentChatMessages()}
            else{
              console.log("socket3")
              const newAllUsers = this.state.allUsers.map((user) => {
                if(m.sender === user._id){user.newMessage = true
                return user}else{
                  return user
                }
              })
              this.setState({allUsers: newAllUsers})
            }
          }else{
            console.log("socket3")
            const newAllUsers = this.state.allUsers.map((user) => {
              if(m.sender === user._id){
                user.newMessage = true
                return user}else{
                return user
              }
            })
            this.setState({allUsers: newAllUsers})
          }
        }
      }
    })
  }

  whichPage = () => {
    if (this.state.page === "signUp"){return <SignUp signUp = {this.signUp} state = {this.state}/>}
    if (this.state.page === "login"){return <Login login = {this.login} state = {this.state}/>}
    if (this.state.page === "home"){return <Home  state = {this.state} getAllUsers = {this.getAllUsers} openChat = {this.openChat} showChat = {this.showChat}/>}
    if (this.state.page === "profilePage"){return <ProfilePage state = {this.state} />}
    if (this.state.page === "swipePage"){return <SwipePage state = {this.state} getSwipeUsers = {this.getSwipeUsers} dislike = {this.dislike} like = {this.like}/>}
    if (this.state.page === "matchesPage"){return <MatchesPage state = {this.state} getMyMatches = {this.getMyMatches} />}
  }

  navBar = () => {
    if(this.state.page === "login" || this.state.page === "signUp"){
      return(
        <div class = "row mr">
          <Button variant="danger" onClick = {() => {this.switchPage("login")}} >login</Button>
          <button onClick = {() => {this.switchPage("signUp")}} >sign up</button>
        </div>
      )
    }else{
      return(
        <div class = "row">
          <button onClick = {() => {this.logout()}} >logout</button>
          <button onClick = {() => {this.switchPage("home")}} >home</button>
          <button onClick = {() => {this.switchPage("profilePage")}} >profilePage</button>
          <button onClick = {() => {this.switchPage("swipePage")}} >swipePage</button>
          <button onClick = {() => {this.switchPage("matchesPage")}} >matchesPage</button>
        </div>
      )
    }
  }

  switchPage = (page) => {
    this.setState({page: page})
  }

  signUp = (e) => {
    e.preventDefault()
    const password = e.target.elements.password.value
    const username = e.target.elements.username.value
    const email = e.target.elements.email.value
    const breed = e.target.elements.breed.value
    const age = e.target.elements.age.value
    
    
    const user = {username,password,email,breed,age}

    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"         
      },
      body: JSON.stringify(user)
    })
    .then((resp) => resp.json())
    .then((body) => {
      if(body.user){
        this.setState({currentUser: body.user, token: body.token},
          () => {this.switchPage("home")}
        ) 
      }else{alert("failed, try again pls!")}
    })
    .catch((e) => {alert("failed. try again pls!")})
  }

  login = (e) => {
    e.preventDefault()
    const password = e.target.elements.password.value
    const email = e.target.elements.email.value
    const user = {email, password}

    fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",         
      },
      body: JSON.stringify(user)
    })
    .then((resp) => resp.json())
    .then((body) => {
      if(body.user){
        this.setState({currentUser: body.user,token: body.token},
          () => {this.switchPage("home")}
        ) 
      }else{alert("failed, try again pls!")}
    })
    .catch((e) => {alert("failed. try again pls!")})
  }

  logout = () => {
    fetch("http://localhost:3000/users/logout", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": "Bearer "+this.state.token         
      }
    })
    .then((x) => {this.logoutFromFrontend()})
    .catch((e) => {alert("failed. try again pls!")})
  }

  logoutFromFrontend = () => {
    this.setState(
      {
        currentUser:null,
        allUsers:null,
        swipeUsers: null,
        page: 'login',
        openChatUser: null,
        currentChatMessages: null,
        matches: null, 
        token: null
      }
    )
  }



  getAllUsers = () => {
    const currentUser = {currentUser: this.state.currentUser}

    fetch("http://localhost:3000/getAllUsers", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json", 
          "Authorization": "Bearer "+this.state.token        
      },
      body: JSON.stringify(currentUser)
    })
    .then((resp) => resp.json())
    .then((body) => this.setState({allUsers: body}))
    .catch((e) => {console.log("failed to get all users")})
  }

  openChat = (user, toggleNewMsg) => {
    this.setState({openChatUser: user, currentChatMessages: null},
      () => {this.getCurrentChatMessages()}
    ) 
    if (toggleNewMsg){
      const newAllUsers = this.state.allUsers.map((iUser) => {
        if(iUser === user){
          iUser.newMessage = false
          return iUser}else{
          return iUser
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
    const currentUser = this.state.currentUser
    const chatPartner = this.state.openChatUser
    const chatInfo = {currentUser, chatPartner}
    
    fetch("http://localhost:3000/currentMessages", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",   
          "Authorization": "Bearer "+this.state.token      
      },
      body: JSON.stringify(chatInfo)
    })
    .then((resp) => resp.json())
    .then((body) => this.setState({currentChatMessages: body}))
    .catch((e) => {console.log("failed to get current chat msgs. try again pls!")})
  }

  sendMessage = (e) => {
    e.preventDefault()

    const message = e.target.elements.message.value
    const sender = this.state.currentUser
    const reciever = this.state.openChatUser

    const messageInfo = {message, sender, reciever}
    
    socket.emit("newMessage", messageInfo)
  }


  


  getSwipeUsers = () => {
    const currentUser = {currentUser: this.state.currentUser}

    fetch("http://localhost:3000/getSwipeUsers", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json", 
          "Authorization": "Bearer "+this.state.token        
      },
      body: JSON.stringify(currentUser)
    })
    .then((resp) => resp.json())
    .then((body) => this.setState({swipeUsers: body}))
    .catch((e) => {console.log("failed to get swipe users")})
  }

  dislike = (user) => {
    const sender = this.state.currentUser._id
    const reciever = user._id
    const like = {sender,reciever}

    fetch("http://localhost:3000/dislikes", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",   
          "Authorization": "Bearer "+this.state.token      
      },
      body: JSON.stringify(like)
    })
    .then((resp) => resp.json())
    .then((body) => {
      const newSwipeUsers = this.state.swipeUsers.filter((sUser) => {
          if(sUser._id === body.reciever){return false}else{return true}
        })
      this.setState({swipeUsers: newSwipeUsers})
    })
    .catch((e) => {console.log('e',e)})
  }

  like = (user) => {
    const sender = this.state.currentUser._id
    const reciever = user._id
    const like = {sender,reciever}

    fetch("http://localhost:3000/likes", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",   
          "Authorization": "Bearer "+this.state.token      
      },
      body: JSON.stringify(like)
    })
    .then((resp) => resp.json())
    .then((body) => {
      this.removeFromSwipUsers(body)
      this.runNewMatchSocket(body)
    })
    .catch((e) => {console.log('e',e)})
  }
  
      removeFromSwipUsers = (body) => {
        const newSwipeUsers = this.state.swipeUsers.filter((sUser) => {
          if(sUser._id === body.reciever){return false}else{return true}
        })
        this.setState({swipeUsers: newSwipeUsers})
      }
    
      runNewMatchSocket = (like) => {
        
        if (like.match){
          console.log('run new match socket')
          this.newMatchDetected()
          socket.emit('newMatch',like.match)
        }
      }

      newMatchDetected = (match) => {
        alert("you have a new match")
        this.getMyMatches()
      }



  getMyMatches = () => {

    fetch("http://localhost:3000/myMatches", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json", 
          "Authorization": "Bearer "+this.state.token        
      }
    })
    .then((resp) => resp.json())
    .then((body) => this.setState({matches: body}))
    .catch((e) => {console.log("failed to get matches",e)})
  }

  render () {
    return (
      <div class = "container">
        <h1>check</h1>
        {this.navBar()}
        {this.whichPage()}
      </div>
    )
  }
}

export default App;
