import React, {Component} from 'react';

class ChatThumbnail extends Component {

  showThubmnail = () => {
    if (this.props.user.newMessage === true){
      return <button onClick = {() => this.props.openChat(this.props.user,true) } > NEW MSG!! chat w {this.props.user.username} </button>
    }else{
      return <button onClick = {() => this.props.openChat(this.props.user)} > chat w {this.props.user.username} </button>
    }
  }
  render () {
    return (
    <div>
      {this.showThubmnail()}
    </div>
    )
  }
}

export default ChatThumbnail;