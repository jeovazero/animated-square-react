import React from 'react';
import ReactDom from 'react-dom';
import AnimatedSquare from './AnimatedSquare';
import styled from 'styled-components';
import { animated, Transition } from 'react-spring'

const arrows = ['', '⇐', '⇑',	'⇒',	'⇓'];
class App extends React.Component{
  state = {
    index: 0,
    pos: {
      x: 0,
      y: 0
    }
  }

  start = () => { console.log('start') }
  resting = () => { console.log('rest'); this.setState({index: 0}) }

  move = (axis, shift) => () =>
    this.setState( ({pos}) => ({pos: {...pos, [axis]: pos[axis] + shift, }})); 
  
  keyHandler = (e) => {
    switch(e.keyCode){
      case 37: this.setState({index: 1}); this.move('x', -100)(); break;
      case 38: this.setState({index: 2}); this.move('y', -100)(); break;
      case 39: this.setState({index: 3}); this.move('x', 100)(); break;
      case 40: this.setState({index: 4}); this.move('y', 100)(); break;
    }
  }

  componentDidMount = () => {
    document.addEventListener('keydown', this.keyHandler)
  }

  render(){
    return (
        <div className={this.props.className}>
          <AnimatedSquare pos={this.state.pos}> </AnimatedSquare>
          <Transition
            native
            items={this.state.index}
            enter={{ opacity: 1, position: 'absolute' }}
            leave={{ opacity: 0, position: 'absolute' }}
            onRest={() => (this.resting())}>
            { index =>
                (props =>
                  <animated.div style={{...props, fontSize: '2em'}}>
                    {arrows[index]}
                  </animated.div>
                )
            }
          </Transition>
        </div>
    );
  }
}

const StyledApp = styled(App)`
  margin: auto;
  padding: 50px;
`;

ReactDom.render(
  <StyledApp />,
  document.getElementById("root")
);