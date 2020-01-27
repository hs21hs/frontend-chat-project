import React, {Component} from 'react';

class Message extends Component {

  
  render () {
    return (
    <div>
      <h1>{this.props.message.sender.username}: {this.props.message.text}</h1>
    </div>
    )
  }

}

export default Message;