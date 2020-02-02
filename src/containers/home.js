import React, {Component} from 'react';
import ChatThumbnail from '../components/chatThumbnail';

class Home extends Component {

    componentDidMount() {
        this.props.getAllUsers()
    }

    createChatThumbnails = () => {
        
        if (this.props.state.allUsers){
            return this.props.state.allUsers.map((user) => {
                return <ChatThumbnail user = {user} openChat = {this.props.openChat} key = {user._id}/>
            })
        }
    }

  render () {
    return (
    <div class = "col">
        <h1>home page</h1>
        {this.createChatThumbnails()}
        {this.props.showChat()}
    </div>
    )
  }
}

export default Home;