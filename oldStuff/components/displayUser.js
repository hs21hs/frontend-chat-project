import React, {Component} from 'react';

class DisplayUser extends Component {

  render () {
    return (
        <h1>{this.props.state.user} is signed in</h1>
    )
  }
}

export default DisplayUser;
