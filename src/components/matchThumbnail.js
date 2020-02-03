import React, {Component} from 'react';

class MatchThumbnail extends Component {

  
  render () {
    return (
    <div>
      <button onClick = {() => {this.props.openMatchChat(this.props.user)}}> name: {this.props.user.username} </button> 
    </div>
    )
  }
}

export default MatchThumbnail;