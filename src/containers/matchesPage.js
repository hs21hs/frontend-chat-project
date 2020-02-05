import React, {Component} from 'react';
import MatchThumbnail from '../components/matchThumbnail'
import MatchChat from '../containers/matchChat'

class MatchesPage extends Component {

  componentDidMount(){
    
  }

  createMatchThumbnails = () => {
        
    if (this.props.state.currentMatchChatUser){
      return <MatchChat user = {this.props.state.currentMatchChatUser} state = {this.props.state} backToMatchThumbnails = {this.props.backToMatchThumbnails} getMatchChatMessages = {this.props.getMatchChatMessages} sendMessage = {this.props.sendMessage}/>
    }else if (this.props.state.matches){
        return this.props.state.matches.map((user) => {
            return <MatchThumbnail user = {user}  key = {user._id} openMatchChat = {this.props.openMatchChat}/>
        })
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