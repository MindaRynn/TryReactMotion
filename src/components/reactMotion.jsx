import React from 'react';
import styled from 'styled-components';
import {Motion, TransitionMotion, spring} from 'react-motion';

var baseAngle = 215;
var angleSteps = 360 / 20;
var ang = [0,0,0,0,0,0,0];

const willLeave = () => ({
  borderWidth: 0
})

class WithReactMotion extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      defaultStyles: [
        { key: 'i1', style: {left: 0, top: 0}},
        { key: 'i2', style: {left: 0, top: 0}},
        { key: 'i3', style: {left: 0, top: 0}},
        { key: 'i4', style: {left: 0, top: 0}},
        { key: 'i5', style: {left: 0, top: 0}},
        { key: 'i6', style: {left: 0, top: 0}},
        { key: 'i7', style: {left: 0, top: 0}}
        ],
      styles: [
        { key: 'i1', style: {left: 0, top: 0}},
        { key: 'i2', style: {left: 0, top: 0}},
        { key: 'i3', style: {left: 0, top: 0}},
        { key: 'i4', style: {left: 0, top: 0}},
        { key: 'i5', style: {left: 0, top: 0}},
        { key: 'i6', style: {left: 0, top: 0}},
        { key: 'i7', style: {left: 0, top: 0}}
        ]
    }

    this._updateListPositions = this._updateListPositions.bind(this);
    this._next = this._next.bind(this);
    this._back = this._back.bind(this);
  }

  componentDidMount() {
    this._updateListPositions();
  }

  _next(){
    baseAngle += angleSteps;
    this._updateListPositions()
  }

  _back(){
    baseAngle -= angleSteps;
    this._updateListPositions()
  }

  _updateListPositions() {
    let { styles } = this.state;
    let newStyles = styles.map((cur, index) => {
        var angle = baseAngle + (index * angleSteps);
        var centerX = (window.innerWidth/2) - (250/4);
        var centerY = 1100;
        var distance = 1000;
        var x = distance * Math.cos(angle * (Math.PI / 180));
        var y = distance * Math.sin(angle * (Math.PI / 180));
        
        ang[index] = (-3+index)*angleSteps;

        console.log(`rotate(${ang[index]}deg)`)

        return { key: `i${index+1}`, style: {left: centerX+x, top: centerY+y, transform: `rotate(${ang[index]}deg)`}};
    });
    this.setState({defaultStyles: styles, styles: newStyles});
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
        <TransitionMotion
                defaultStyles={this.state.defaultheStyles}
                styles={this.state.styles}
                willLeave={willLeave}>
            {(styles) => (
            <Ul>
                { styles.map(({key, style}, index) => (
                <Li key={key} style={{...style}}>
                    <img src={require(`../assets/images/book${index+1}.jpg`)} alt="" />
                </Li>
                ))}
            </Ul>
            )}
        </TransitionMotion>
        </Container>
        <ButtonContainer>
          <button onClick={this._back}>Prev</button>
          <button onClick={this._next}>Next</button>
        </ButtonContainer>
      </div>
    );
  }
}

export default WithReactMotion;
