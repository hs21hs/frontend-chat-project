import React, {Component} from 'react';



class MessageForm extends Component {

  render () {
    return (
    <div>
        <form onSubmit = {(e) => {this.props.sendMessage(e)}}>
            <input name = "message"></input>
            <select name = "select">
                <option value = {this.props.state.user1_id}>user 1</option>
                <option value = {this.props.state.user2_id}>user 2</option>
                <option value = {this.props.state.user3_id}>user 3</option>
            </select>
            <button type = "submit"> send message</button>
        </form>
    </div>
    )
  }
}

export default MessageForm;
