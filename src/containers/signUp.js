import React, {Component} from 'react';

class SignUp extends Component {

  render () {
    return (
    <div>
        <h1>sign up page</h1>
        <form onSubmit = {(e) => {this.props.signUp(e)}}>
            <input name = "email" placeholder = "email"></input>
            <input name = "password" placeholder = "password" type = "password"></input>
            <input name = "username" placeholder = "dogs name"></input>
            <input name = "breed" placeholder = "breed"></input>
            <input name = "age" placeholder = "age"></input>
            <button type = "submit"> signUp</button>
            
        </form>
    </div>
    )
  }
}

export default SignUp;