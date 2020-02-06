import React, {Component} from 'react';
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Figure from 'react-bootstrap/Figure'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

class MatchThumbnail extends Component {

  showThumbnails = () => {
    if(this.props.user.newMessage === true && this.props.user.openedMatch === true){
      return <Button style = {{width: 200}} variant="outline-secondary" size = "sm" onClick = {() => {this.props.openMatchChat(this.props.user)}}> 
       <Figure>
        <Figure.Image
        width={50}
        height={50}
        alt="50x50"
        src={this.props.user.image_url}
        />
      </Figure> <br></br>
      name: {this.props.user.username}- New Msg!</Button>
    }else if(this.props.user.newMessage !== true && this.props.user.openedMatch === false){
      return <Button style = {{width: 200}} variant="outline-secondary" size = "sm" onClick = {() => {this.props.openMatchChat(this.props.user)}}> 
       <Figure>
        <Figure.Image
        width={50}
        height={50}
        alt="50x50"
        src={this.props.user.image_url}
        />
      </Figure> <br></br>
      name: {this.props.user.username}- New Match!</Button>
    }else if(this.props.user.newMessage === true && this.props.user.openedMatch === false){
      return <Button style = {{width: 200}} variant="outline-secondary" size = "sm" onClick = {() => {this.props.openMatchChat(this.props.user)}}> 
       <Figure>
        <Figure.Image
        width={50}
        height={50}
        alt="50x50"
        src={this.props.user.image_url}
        />
      </Figure> <br></br>
      name: {this.props.user.username}- New msg & New Match!</Button>
    }else{
      return <Button style = {{width: 200}} variant="outline-secondary" size = "sm" onClick = {() => {this.props.openMatchChat(this.props.user)}}> 
      <Figure>
        <Figure.Image
        width={50}
        height={50}
        alt="50x50"
        src={this.props.user.image_url}
        />
      </Figure> <br></br>
      name: {this.props.user.username}</Button>
    }
  }
  
  render () {
    return (
    <div>
      <ButtonGroup aria-label="Basic example">
      {this.showThumbnails()} 
      </ButtonGroup>
      
    </div>
    )
  }
}

export default MatchThumbnail;