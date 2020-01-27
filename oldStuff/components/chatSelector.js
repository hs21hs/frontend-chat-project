import React, {Component} from 'react';
import Chat from './chat';
class ChatSelector extends Component {

  render () {
    return (
        <div>
             <h1>please select which chat you would like to see</h1>
            <form onSubmit = {(e) => {this.props.selectChat(e)}}>
                <select name = "select">
                    <option value = "user1">user 1</option>
                    <option value = "user2">user 2</option>
                    <option value = "user3">user 3</option>
                </select>
                <button type = "submit"> select chat</button>
            </form>
           
        </div>
       
    )
  }
}

export default ChatSelector;
