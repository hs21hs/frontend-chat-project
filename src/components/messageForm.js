import React, {Component} from 'react';



class MessageForm extends Component {

  render () {
    return (
    <div>
        <form onSubmit = {(e) => {this.props.sendMessage(e)}}>
            <input name = "message"></input>
            <button type = "submit"> send message</button>
        </form>
    </div>
    )
  }
}

export default MessageForm;
