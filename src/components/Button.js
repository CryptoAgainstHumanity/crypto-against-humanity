import styled from 'styled-components';
import {
  COLORS_OBJ, HAS_BORDER_RADIUS,
} from '../StyleGuide';

// Default is secondary, for primary button use <Btn primary></Btn>

const Btn = styled.button`
  padding: 0.5em 1em;
  background-color: transparent;
  border: 2px solid ${COLORS_OBJ.primary.high};
  ${HAS_BORDER_RADIUS};

  font-size:16px;
  font-weight: bold;

  background-color: ${props => props.primary ? COLORS_OBJ.primary.high : 'none'};
  color: ${props => props.primary ? 'white' : COLORS_OBJ.primary.high}

  :hover {
    border-color: ${props => props.primary ? '#C24245' : COLORS_OBJ.primary.high};
    background-color: ${props => props.primary ? '#C24245' : COLORS_OBJ.primary.high};
    color: white;
  }

  :focus {
    outline: none;
  }

  // Animation for hover, source: Bootstrap 4
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
`;

export default Btn;
