import React, {Component} from 'react';
import MatchThumbnail from '../components/matchThumbnail'
import MatchChat from '../containers/matchChat'
import SwipeCard from '../components/swipeCard'

class MatchesPage extends Component {

  componentDidMount(){
    
  }

  createMatchThumbnails = () => {
    if (this.props.state.currentMatchChatUser && this.props.state.matchChatUserProfilePage){
      return <SwipeCard showCard = {true} state = {this.props.state} backToMatchChat = {this.props.backToMatchChat}/>
    }else if (this.props.state.currentMatchChatUser){
      return <MatchChat user = {this.props.state.currentMatchChatUser} state = {this.props.state} backToMatchThumbnails = {this.props.backToMatchThumbnails} getMatchChatMessages = {this.props.getMatchChatMessages} sendMessage = {this.props.sendMessage} openMatchChatUsersProfilePage = {this.props.openMatchChatUsersProfilePage} clearMatchChatMessages = {this.props.clearMatchChatMessages}/>
    }else if (this.props.state.matches){

        return (
          <div>
            <h2> click to chat with one of your matches</h2>
            {this.props.state.matches.map((user) => {
              return <MatchThumbnail user = {user}  key = {user._id} openMatchChat = {this.props.openMatchChat}/>
            })}
          </div>
        )
        
    }
}

  render () {
    return (
    <div>
        <h1>Matches Page</h1>
        {this.createMatchThumbnails()}
    </div>
    )
  }

}

export default MatchesPage;