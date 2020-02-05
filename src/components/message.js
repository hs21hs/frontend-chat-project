import React, {Component} from 'react';

class Message extends Component {

  
  render () {
    return (
    <div>
      <h2>{this.props.message.sender.username}: {this.props.message.text}</h2>
    </div>
    )
  }

}

export default Message;