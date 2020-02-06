import React, {Component} from 'react';

class Message extends Component {

  render () {
    return (
    <div>
        msg: {this.props.text}
        
    </div>
    )
  }
}

export default Message;
