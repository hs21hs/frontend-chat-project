import React, {Component} from 'react';
import Message from '../components/message';
import MessageForm from '../components/messageForm';

class Chat extends Component {

    displayMessages = () => {
        if (this.props.state.currentChatMessages){
            return this.props.state.currentChatMessages.map((message) => {
                return <Message message = {message} />
            })
        }
    }

  render () {
    return (
    <div>
        <h1>chat window with {this.props.state.openChatUser.username}</h1>
        {this.displayMessages()}
        <MessageForm state = {this.props.state} sendMessage = {this.props.sendMessage}/>
    </div>
    )
  }
}

export default Chat;