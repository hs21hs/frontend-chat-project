import React, {Component} from 'react';
import MatchThumbnail from '../components/matchThumbnail'

class MatchesPage extends Component {

  componentDidMount(){
    this.props.getMyMatches()
  }

  createMatchThumbnails = () => {
        
    if (this.props.state.matches){
        return this.props.state.matches.map((user) => {
            return <MatchThumbnail user = {user}  key = {user._id}/>
        })
    }
}

  render () {
    return (
    <div>
        <h1>MatchesPage</h1>
        {this.createMatchThumbnails()}
    </div>
    )
  }

}

export default MatchesPage;