import React, {Component} from 'react';

class UserThumbnail extends Component {

  
  render () {
    return (
    <div>
      <img class = "userThumbnailImg" src = {this.props.state.currentUser.image_url} alt =""/>
      <p>{this.props.state.currentUser.username}, {this.props.state.currentUser.age}</p>
      <p>{this.props.state.currentUser.breed}, {this.props.state.currentUser.age}</p>
    </div>
    )
  }
}

export default UserThumbnail;