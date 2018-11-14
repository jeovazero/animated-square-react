import React from 'react';
import styled from 'styled-components';
import { animated, Spring, interpolate } from 'react-spring'

const PureSquare = ({className, onClick, style, pos }) => (
  <Spring
    native
    to={pos}>
    { ({x, y}) =>
        <animated.div
          className={className}
          onClick={onClick}
          style={{ ...style, 
            transform: interpolate([x,y], (x, y) => `translate3d(${x}%,${y}%, 0)`)
          }}>
        </animated.div>
      }
  </Spring>
);

const StyledSquare = styled(PureSquare)`
  position: relative;
  background-color: #8c1fd8;
  border-radius: 10px;
  width: ${props => props.size || '100px'};
  height: ${props => props.size || '100px'};
`;

export default StyledSquare;