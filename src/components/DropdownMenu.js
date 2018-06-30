import styled from 'styled-components';
import {
  COLORS_OBJ, COLORS_TEXT, HAS_BORDER_RADIUS, HAS_SHADOW, MEDIA, DARKEN,
} from '../StyleGuide';

const DropdownMenu = styled.div`
  position: absolute;
  top: 148px;
  width: 156px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 2px solid ${COLORS_OBJ.secondary.high};
  ${HAS_BORDER_RADIUS};
  ${HAS_SHADOW};

  button {
    border: none;
    border-radius: 0;
    transition: none;
    color: ${COLORS_OBJ.secondary.high};

    :hover {
      background-color: ${DARKEN('#FFFFFF')};
      color: ${COLORS_TEXT.bgLight.high};
    }
  }

  ${MEDIA.tablet} {
    top: 824px;
  }
`;

export default DropdownMenu;
