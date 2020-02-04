import React, {Component} from 'react';
import Message from '../components/message';
import UserThumbnail from '../components/userThumbnail';
import SwipeCard from '../components/swipeCard';

class SwipePage extends Component {

    componentDidMount(){
        this.props.getSwipeUsers()
        this.props.getMyMatches()
    }

    showUsers = () => {
        if (this.props.state.swipeUsers){
            return <SwipeCard state = {this.props.state} dislike = {this.props.dislike} like = {this.props.like}/>
        }
    }

  render () {
    return (
    <div>
        swipe page
        {this.showUsers()}
    </div>
    )
  }
}

export default SwipePage;