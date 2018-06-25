import styled from 'styled-components';
import {
  COLORS_OBJ, COLORS_TEXT, HAS_BORDER_RADIUS, HAS_SHADOW, MEDIA, DARKEN,
} from '../StyleGuide';

const DropdownMenu = styled.div`
  position: absolute;
  top: 136px;
  width: 96px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 2px solid ${COLORS_OBJ.secondary.medium};
  ${HAS_BORDER_RADIUS};
  ${HAS_SHADOW};

  button {
    border: none;
    border-radius: 0;
    transition: none;
    color: ${COLORS_TEXT.bgLight.medium};

    :hover {
      background-color: ${DARKEN('#FFFFFF')};
      color: ${COLORS_TEXT.bgLight.high};
    }
  }

  ${MEDIA.tablet} {
    top: 734px;
  }
`;

export default DropdownMenu;
