import React from 'react';
import styled from 'styled-components';
import $ from "jquery";

var baseAngle = 215;
var angleSteps = 360 / 20;
var ang = [0,0,0,0,0,0,0];

class CssAnimation extends React.Component {
  constructor(props, context) {
    super(props, context);

    this._updateListPositions = this._updateListPositions.bind(this);
    this._next = this._next.bind(this);
    this._back = this._back.bind(this);
  }

  componentDidMount() {
    this._updateListPositions(0)
  }

  _next(){
    baseAngle += angleSteps;
    this._updateListPositions(angleSteps)
  }

  _back(){
    baseAngle -= angleSteps;
    this._updateListPositions(-1*angleSteps)
  }

  _updateListPositions(rot) {
    $('#circle-list li').each(function(index, element)
    {
      var angle = baseAngle + (index * angleSteps);
      var centerX = (window.innerWidth/2) - (250/4);
      var centerY = 1100;
      var distance = 1000;
      var x = distance * Math.cos(angle * (Math.PI / 180));
      var y = distance * Math.sin(angle * (Math.PI / 180));
      $(element).css({left:centerX+x, top:centerY+y});
      if(rot===0){
        ang[index] = (-3+index)*angleSteps;
      } else {
        ang[index] = ang[index] + rot;
      }
      
      $(element).css({WebkitTransform: `rotate(${ang[index]}deg)`});
    });
  }

  render() {
  let Container = styled.div `
    display: flex;
    justify-content: center;
  `

  let ButtonContainer = styled.div `
    display: block;
  `

  let Ul = styled.ul `
    width:100%;
    height:500px;
    position:relative;
    padding:0;
    list-style:none;
  `

  let Li = styled.li `
    display:block;
    position:absolute;
    background:#ccc;
    font-family:arial;
    color:#666;
    width:30px;
    height:30px;
    line-height:30px;
    text-align:center;
    margin:-15px 0 0 -15px;
    -webkit-border-radius: 15px;
    -moz-border-radius: 15px;
    border-radius: 15px;
    transition: all 0.5s ease-in-out;
    
    img {
      width: 250px;
    }
  `

    return (
      <div className="App">
        <Container>
          <Ul id='circle-list'>
            <Li><img src={require('../assets/images/book1.jpg')} alt="" /></Li>
            <Li><img src={require('../assets/images/book2.jpg')} alt="" /></Li>
            <Li><img src={require('../assets/images/book3.jpg')} alt="" /></Li>
            <Li><img src={require('../assets/images/book4.jpg')} alt="" /></Li>
            <Li><img src={require('../assets/images/book5.jpg')} alt="" /></Li>
            <Li><img src={require('../assets/images/book6.jpg')} alt="" /></Li>
            <Li><img src={require('../assets/images/book7.jpg')} alt="" /></Li>
          </Ul>
        </Container>
        <ButtonContainer>
          <button onClick={this._back}>Prev</button>
          <button onClick={this._next}>Next</button>
        </ButtonContainer>
      </div>
    );
  }
}

export default CssAnimation;
