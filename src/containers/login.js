import React, {Component} from 'react';

class Login extends Component {

  render () {
    return (
    <div>
        <h1>login page</h1>
        <form onSubmit = {(e) => {this.props.login(e)}}>
            <input name = "username" placeholder = "username"></input>
            <button type = "submit"> login</button>
        </form>
    </div>
    )
  }
}

export default Login;