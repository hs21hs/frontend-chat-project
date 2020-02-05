import React, {Component} from 'react';

class Login extends Component {

  render () {
    return (
    <div>
        <h1>Login Page</h1>
        <form onSubmit = {(e) => {this.props.login(e)}}>
            <input name = "email" placeholder = "email"></input>
            <input name = "password" placeholder = "password" type = "password"></input>
            <button type = "submit"> login</button>
        </form>
    </div>
    )
  }
}

export default Login;