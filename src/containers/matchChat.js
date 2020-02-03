import React, {Component} from 'react';
import Message from '../components/message'
import MessageForm from '../components/messageForm'

class MatchChat extends Component {

  componentDidMount(){
    this.props.getMatchChatMessages()
  }

  displayMessages = () => {
    if (this.props.state.currentMatchChatMessages){
        return this.props.state.currentMatchChatMessages.map((message) => {
            return <Message message = {message} key = {message._id} />
        })
    }
  }

  render () {
    return (
    <div>
      <button onClick = {() => {this.props.backToMatchThumbnails()}}>back</button>
      <br/>
      match chat window with {this.props.user.username}
    
      <MessageForm state = {this.props.state} sendMessage = {this.props.sendMessage}/>
      
    </div>
    )
  }
}

export default MatchChat;