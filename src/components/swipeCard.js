import React, {Component} from 'react';

class SwipeCard extends Component {

  showCard = () => {
    if (this.props.state.swipeUsers.length > 0){
      return(
        <div class = "row swipeCard">
        <img class = "swipeCardImg" src = {this.props.state.swipeUsers[0].image_url} alt =""/>
        <div>
          <p>name:{this.props.state.swipeUsers[0].username}</p>
          <p>age:{this.props.state.swipeUsers[0].age}</p>
          <p>breed:{this.props.state.swipeUsers[0].breed}</p>
        </div>
        <div>
          <button onClick = {() => {this.props.like(this.props.state.swipeUsers[0])}}>like</button>
          <button onClick = {() => {this.props.dislike(this.props.state.swipeUsers[0])}}>dislike</button>
        </div>
        
      </div>
      )
    }else{return(<p>out of users to swipe!</p>)}
  }

  render () {
    return (
      <div>
        {this.showCard()}
      </div>
    )
  }
}

export default SwipeCard;