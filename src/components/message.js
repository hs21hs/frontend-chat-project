import React, {Component} from 'react';

class Message extends Component {

  
  render () {
    return (
    <div>
  <h1>msg {this.props.message.text}</h1>
    </div>
    )
  }

}

export default Message;