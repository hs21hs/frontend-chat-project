import React, {Component} from 'react';
import Message from '../components/message';
import UserThumbnail from '../components/userThumbnail';
import SwipeCard from '../components/swipeCard';

class SwipePage extends Component {

    componentDidMount(){
        this.props.getSwipeUsers()
        
    }

    showUsers = () => {
        if (this.props.state.swipeUsers){
            if (this.props.state.swipeUsers.length>0){
                return <SwipeCard state = {this.props.state} dislike = {this.props.dislike} like = {this.props.like}/>
            }else{
                return <p>out of users to swipe</p>
            }
        }
    }

  render () {
    return (
    <div>
        <h1>swipe page</h1>
        {this.showUsers()}
    </div>
    )
  }
}

export default SwipePage;