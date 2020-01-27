import React, {Component} from 'react';



class SelectUser extends Component {

  render () {
    return (
    <div>
        <button onClick = {() => {this.props.setUser("user1")}}>user1 h</button>
        <button onClick = {() => {this.props.setUser("user2")}}>user2 s </button>
        <button onClick = {() => {this.props.setUser("user3")}}>user3 x</button>
    </div>
    )
  }
}

export default SelectUser;
