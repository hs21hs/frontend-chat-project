import React, {Component} from 'react';
import Message from './message';
class Chat extends Component {


    displayMessages = () => {
        if (this.props.state.selectedChatMessages){
            return this.props.state.selectedChatMessages.map((msg) => {
               
                return <Message text = {msg.text} />
            })
            
        }
    }

  render () {
    return (
        <div>
            <h1>this is ur chat with {this.props.state.selectedChat}</h1>
            {this.displayMessages()}
        </div>
       
    )
  }
}

export default Chat;
