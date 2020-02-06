import React, {Component} from 'react';
import Message from '../components/message';
import UserThumbnail from '../components/userThumbnail';

class ProfilePage extends Component {

  render () {
    return (
    <div>
       <h1>Your Profile Page</h1>
       <div >
            <UserThumbnail state = {this.props.state} />
       </div>
       <div>
           
       </div>
    </div>
    )
  }
}

export default ProfilePage;

