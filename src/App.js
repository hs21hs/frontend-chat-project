import React, {Component} from 'react';
import SignUp from './containers/signUp';
import Login from './containers/login';
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
    currentMatchChatUser: null,
    matchChatUserProfilePage: null,
    currentMatchChatMessages: null,
    matches: null, 
    token: null
  }
  
  componentDidMount(){
    {this.socketF(this.newMatchDetected)}
   
  }

  socketF = (newMatchDetected) =>{

    socket.on("newMatch",
      (match) => {  
        if(this.state.currentUser){
          if (match.userOne === this.state.currentUser._id || match.userTwo === this.state.currentUser._id){
            console.log('you are part of the match!')
            newMatchDetected()
          }
        }
      }
    )

    socket.on("newMessage",
      (msg) => {  
        console.log('new msg from socket',msg)
        if(this.state.currentUser){
          if (msg.reciever === this.state.currentUser._id){
            if(this.state.currentMatchChatUser){
              if (msg.sender === this.state.currentMatchChatUser._id){
                this.getMatchChatMessages()
              }else{
                this.setMatchesNewMsgTrue(msg)
              }
            }else{
              this.setMatchesNewMsgTrue(msg)
            }
          }
        }
       }
    )

  }

  whichPage = () => {
    if (this.state.page === "signUp"){return <SignUp signUp = {this.signUp} state = {this.state}/>}
    if (this.state.page === "login"){return <Login login = {this.login} state = {this.state}/>}
    if (this.state.page === "profilePage"){return <ProfilePage state = {this.state} />}
    if (this.state.page === "swipePage"){return <SwipePage state = {this.state} getSwipeUsers = {this.getSwipeUsers} dislike = {this.dislike} like = {this.like} getMyMatches = {this.getMyMatches}/>}
    if (this.state.page === "matchesPage"){return <MatchesPage state = {this.state} getMyMatches = {this.getMyMatches} openMatchChat = {this.openMatchChat} backToMatchThumbnails = {this.backToMatchThumbnails} getMatchChatMessages = {this.getMatchChatMessages} sendMessage = {this.sendMatchChatMessage} openMatchChatUsersProfilePage = {this.openMatchChatUsersProfilePage} backToMatchChat = {this.backToMatchChat}/>}
  }

  navBar = () => {
    if(this.state.page === "login" || this.state.page === "signUp"){
      return(
        <div class = "row mr">
          <Button variant="secondary" onClick = {() => {this.switchPage("login")}} >login</Button>
          <Button variant="secondary" onClick = {() => {this.switchPage("signUp")}} >sign up</Button>
        </div>
      )
    }else{
      return(
        <div class = "row">
          <Button variant="secondary" onClick = {() => {this.logout()}} >logout</Button>
          <Button variant="secondary" onClick = {() => {this.switchPage("profilePage")}} >profilePage</Button>
          <Button variant="secondary" onClick = {() => {this.switchPage("swipePage")}} >swipePage</Button>
          {this.matchesPageButton()}
        </div>
      )
    }
  }

  matchesPageButton = () => {
    if(this.state.matches){
      let newMsg = false
      let newMatch = false

      this.state.matches.forEach((user) => {
        if(user.newMessage){newMsg = true}
        if(user.openedMatch === false ){newMatch = true}
      })
      console.log("nmu",newMsg)
      if(newMsg && !newMatch){
        return <Button variant="secondary" onClick = {() => {this.switchPage("matchesPage")}} >matchesPage(new msg)</Button>
      }else if(!newMsg && newMatch){
        return <Button variant="secondary" onClick = {() => {this.switchPage("matchesPage")}} >matchesPage(new match!)</Button>
      }else if(newMsg && newMatch){
        return <Button variant="secondary" onClick = {() => {this.switchPage("matchesPage")}} >matchesPage(new match! & new msg)</Button>
      }else{
        return <Button variant="secondary" onClick = {() => {this.switchPage("matchesPage")}} >matchesPage</Button>
      }
    }else{
      return <Button variant="secondary" onClick = {() => {this.switchPage("matchesPage")}} >matchesPage</Button>
    }
    
  }

  setCurrentMatchChatUserToNull = () => {
    this.setState({currentMatchChatUser:null})
    this.setState({matchChatUserProfilePage: null})
  }

  switchPage = (page) => {
    this.setCurrentMatchChatUserToNull()
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
          () => {this.switchPage("swipePage")}
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
          () => {this.switchPage("swipePage")}
        ) 
      }else{alert("failed, try again pls!")}
    })
    .catch((e) => {alert("failed. try again pls!")})
  }
//whatever is the landing page needs to mount my matches
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
        currentMatchChatUser: null,
        currentMatchChatMessages: null,
        matches: null, 
        token: null
      }
    )
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

  openMatchChatUsersProfilePage = () => {
    this.setState({matchChatUserProfilePage: true})
  }
  backToMatchChat = () => {
    this.setState({matchChatUserProfilePage: null})
  }

  openMatchChat = (user) => {
    this.setState({currentMatchChatUser: user})
  }

  backToMatchThumbnails = () => {
    this.setState({currentMatchChatUser: null})
  }

  getMatchChatMessages = () => {
    console.log('trying to get match msgs')
    const currentUser = this.state.currentUser
    const chatPartner = this.state.currentMatchChatUser
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
    .then((body) => {
      this.markMsgAndMatchAsOpened(chatPartner,body)      
    })
    .catch((e) => {console.log("failed to get current chat msgs. try again pls!",e)})
  }
        markMsgAndMatchAsOpened = (chatPartner,body) => {
          const newMatchesAr = this.state.matches.map((user) => {
            if (user._id === chatPartner._id){
              user.newMessage = false
              user.openedMatch = true
            }
            return user
          })
          this.setState({matches: newMatchesAr}, () => {
            this.setState({currentMatchChatMessages: body})
          })
        }

    

  // showMatchChat = () => {
  //   if (this.state.matchChatUser){
  //     return <Chat state = {this.state} sendMessage = {this.sendMessage} getCurrentChatMessages = {this.getCurrentChatMessages}/>
  //   }
  // }

  sendMatchChatMessage = (e) => {
    e.preventDefault()

    const text = e.target.elements.message.value
    const sender = this.state.currentUser
    const reciever = this.state.currentMatchChatUser

    const messageInfo = {text, sender, reciever}
    console.log('sending msf', messageInfo)

    fetch("http://localhost:3000/messages", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",   
          "Authorization": "Bearer "+this.state.token      
      },
      body: JSON.stringify(messageInfo)
    })
    .then((resp) => resp.json())
    .then((body) => {
      this.addMsgToChatState(body)
      this.runNewMessageSocket(body)
    })
    .catch((e) => {console.log('e',e)})
  }
    //socket.emit("newMessage", messageInfo)
    addMsgToChatState = (msg) => {
      console.log('addMsgToChatState',msg)
      if (msg.sender === this.state.currentUser._id && msg.reciever === this.state.currentMatchChatUser._id){
        this.getMatchChatMessages()
      }
    }
    
    runNewMessageSocket = (msg) => {
      console.log('frm msg socket', msg)

      socket.emit('newMessage',msg)
    }
  
    newMessageDetected = (message) => {
      alert("you have a new message")
      
    }

    setMatchesNewMsgTrue = (msg) => {
      console.log('ready to set it true', msg)
      if (this.state.matches){
        const newMatchesAr = this.state.matches.map((user) => {
          if (user._id === msg.sender){
            user.newMessage = true
            return user
          }else{
            return user
          }
        })
        this.setState({matches: newMatchesAr})
      }
    }

  render () {
    return (
      <div class = "container">
        {this.navBar()}
        {this.whichPage()}
      </div>
    )
  }
}

export default App;
