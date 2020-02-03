import React, {Component} from 'react';

class MatchThumbnail extends Component {

  showThumbnails = () => {
    if(this.props.user.newMessage === true){
      return <button onClick = {() => {this.props.openMatchChat(this.props.user)}}> name: {this.props.user.username} NEW MSG!</button>
    }else{
      return <button onClick = {() => {this.props.openMatchChat(this.props.user)}}> name: {this.props.user.username} </button>
    }
  }
  
  render () {
    return (
    <div>
      {this.showThumbnails()} 
    </div>
    )
  }
}

export default MatchThumbnail;