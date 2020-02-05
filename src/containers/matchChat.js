import React, {Component} from 'react';
import Message from '../components/message'
import MessageForm from '../components/messageForm'
import Button from 'react-bootstrap/Button'
import Figure from 'react-bootstrap/Figure'

class MatchChat extends Component {

  componentDidMount(){
    this.props.getMatchChatMessages()
  }

  displayMessages = () => {
    if (this.props.state.currentMatchChatMessages){
        return this.props.state.currentMatchChatMessages.map((message) => {
            return <Message message = {message} key = {message._id} />
        })
    }
  }

  render () {
    return (
    <div>

      <Button variant="outline-secondary" size = "sm" onClick = {() => {this.props.backToMatchThumbnails()}}>back </Button>
      <br/>
      <br/>
      
      <h2> chat window with {this.props.user.username} </h2>
      <Figure>
        <Figure.Image
        width={50}
        height={50}
        alt="50x50"
        src={this.props.user.image_url}
        />
      </Figure>
      <Button variant="outline-secondary" size = "sm" onClick = {() => {this.props.openMatchChatUsersProfilePage()}}>click to see their profile </Button>
      {this.displayMessages()}
      <MessageForm state = {this.props.state} sendMessage = {this.props.sendMessage}/>
      
    </div>
    )
  }
}

export default MatchChat;