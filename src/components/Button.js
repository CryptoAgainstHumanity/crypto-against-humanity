import styled from 'styled-components';
import {
  COLORS_OBJ, HAS_BORDER_RADIUS, DARKEN,
} from '../StyleGuide';

// Default is secondary, for primary button use <Btn primary></Btn>

const Btn = styled.button`
  padding: 0.25em 1em;
  background-color: transparent;
  ${HAS_BORDER_RADIUS};

  font-size:16px;
  font-weight: bold;

  border: 2px solid ${COLORS_OBJ.primary.red};
  background-color: ${props => props.primary? COLORS_OBJ.primary.red : 'none'};
  color: ${props => props.primary? 'white' : COLORS_OBJ.primary.red};

  :hover {
    border-color: ${props => props.primary? DARKEN(COLORS_OBJ.primary.red) : COLORS_OBJ.primary.red};
    background-color: ${props => props.primary? DARKEN(COLORS_OBJ.primary.red) : COLORS_OBJ.primary.red};
    color: white;
  }

  :focus {
    outline: none;
  }

  // Animation for hover, source: Bootstrap 4
  // transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
`;

export default Btn;
