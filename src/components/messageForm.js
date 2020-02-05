import React, {Component} from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class MessageForm extends Component {

  styledForm = () => {
    return(
      <Form>
        <div>
        <Form.Control type="text" placeholder="type message" name = "message"/>
        <Button variant="outline-secondary" size = "sm" onClick = {(e) => {this.props.sendMessage(e)}}>send message </Button>
        </div>
      </Form>
    )
  }
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
