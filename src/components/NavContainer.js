import styled from 'styled-components';
import {
  COLORS_OBJ, COLORS_TEXT, OPACITY, MEDIA,
} from '../StyleGuide';

const NavContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 64px;
  background-color: ${COLORS_OBJ.secondary.high};

  ${MEDIA.tablet} {
    height: auto;
  }
`;

export default NavContainer;