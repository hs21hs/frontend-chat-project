import React, {Component} from 'react';

class SwipeCard extends Component {

  
  render () {
    return (
    <div class = "row swipeCard">
      <img class = "swipeCardImg" src = {this.props.state.swipeUsers[0].image_url} alt =""/>
      <p>name:{this.props.state.swipeUsers[0].username}</p>
      <p>age:{this.props.state.swipeUsers[0].age}</p>
      <p>breed:{this.props.state.swipeUsers[0].breed}</p>
    </div>
    )
  }
}

export default SwipeCard;