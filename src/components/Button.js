import styled from 'styled-components';
import {
  COLORS_OBJ
} from '../Styles';

const Btn = styled.button`
  border-radius: 5px;
  padding: 0.5em 1em;
  background: transparent;
  border: 2px solid ${COLORS_OBJ.primary.high};

  font-size:16px;
  font-weight: bold;

  background-color: ${props => props.primary ? COLORS_OBJ.primary.high : 'none'};
  color: ${props => props.primary ? 'white' : COLORS_OBJ.primary.high}

  :hover {
    border-color: none;
    background-color: #d94a4d;
    color: white;
  }

  :focus {
    outline: none;
  }
`;

export default Btn;
