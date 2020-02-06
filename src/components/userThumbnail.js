import React, {Component} from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class UserThumbnail extends Component {

  userProfilCard = () => {
    
      return(
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={this.props.state.currentUser.image_url}/>
          <Card.Body>
            <Card.Title>{this.props.state.currentUser.username}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">age:{this.props.state.currentUser.age}, breed:{this.props.state.currentUser.breed}</Card.Subtitle>
            <Card.Text>
              Bio: Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </Card.Text>
            {/* <Button variant="primary">filter</Button>
            <Button variant="primary">edit</Button> */}
          </Card.Body>
        </Card>
      )
}
  render () {
    return (
      this.userProfilCard()
    )
  }
}

export default UserThumbnail;

{/* <div>
      <img class = "userThumbnailImg" src = {this.props.state.currentUser.image_url} alt =""/>
      <p>{this.props.state.currentUser.username}, {this.props.state.currentUser.age}</p>
      <p>{this.props.state.currentUser.breed}, {this.props.state.currentUser.age}</p>
    </div> */}