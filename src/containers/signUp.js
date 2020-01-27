import React, {Component} from 'react';

class SignUp extends Component {

  render () {
    return (
    <div>
        <h1>sign up page</h1>
        <form onSubmit = {(e) => {this.props.signUp(e)}}>
            <input name = "username" placeholder = "username"></input>
            <button type = "submit"> signUp</button>
        </form>
    </div>
    )
  }
}

export default SignUp;