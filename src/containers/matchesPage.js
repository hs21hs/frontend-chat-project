import React, {Component} from 'react';
import ChatThumbnail from '../components/chatThumbnail'

class MatchesPage extends Component {

  componentDidMount(){
    this.props.getMyMatches()
  }
  
  createMatchThumbnails = () => {
        
    if (this.props.state.matches.length > 0){
        return this.props.state.matches.map((user) => {
            return <ChatThumbnail user = {user}  key = {user._id}/>
        })
    }
}

  render () {
    return (
    <div>
        <h1>MatchesPage</h1>
    </div>
    )
  }

}

export default MatchesPage;