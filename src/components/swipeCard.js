import React, {Component} from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

class SwipeCard extends Component {

  showCard = () => {
    if (this.props.state.swipeUsers.length > 0){
      return(
        <div class = "swipeCard">
        <img class = "swipeCardImg" src = {this.props.state.swipeUsers[0].image_url} alt =""/>
        <div>
          <p>name:{this.props.state.swipeUsers[0].username}</p>
          <p>age:{this.props.state.swipeUsers[0].age}</p>
          <p>breed:{this.props.state.swipeUsers[0].breed}</p>
        </div>
        <div>
          <button onClick = {() => {this.props.like(this.props.state.swipeUsers[0])}}>like</button>
          <button onClick = {() => {this.props.dislike(this.props.state.swipeUsers[0])}}>dislike</button>
        </div>
        
      </div>
      )
    }else{return(<p>out of users to swipe!</p>)}
  }

  styledSwipeCard = () => {

   
    if (this.props.showCard === true && this.props.state.swipeUsers){
      return(
        <> 
          <Button variant="outline-secondary" size = "sm" onClick = {() => {this.props.backToMatchChat()}} >back </Button>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={this.props.state.currentMatchChatUser.image_url}/>
            <Card.Body>
              <Card.Title>name:{this.props.state.currentMatchChatUser.username}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">age:{this.props.state.currentMatchChatUser.age}, breed:{this.props.state.currentMatchChatUser.breed}</Card.Subtitle>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        </>
          )
    }else if(this.props.state.swipeUsers.length > 0){
      return(
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src={this.props.state.swipeUsers[0].image_url}/>
          <Card.Body>
            <Card.Title>name:{this.props.state.swipeUsers[0].username}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">age:{this.props.state.swipeUsers[0].age}, breed:{this.props.state.swipeUsers[0].breed}</Card.Subtitle>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </Card.Text>
            <Button variant="primary" onClick = {() => {this.props.like(this.props.state.swipeUsers[0])}}>like</Button>
            <Button variant="primary" onClick = {() => {this.props.dislike(this.props.state.swipeUsers[0])}}>dislike</Button>
          </Card.Body>
        </Card>
          )
    }
      
  }

  render () {
    return (
      <div>
        {this.styledSwipeCard()}
      </div>
    )
  }
}

export default SwipeCard;