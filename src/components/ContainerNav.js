import styled from 'styled-components';
import {
  COLORS_OBJ, MEDIA,
} from '../StyleGuide';

const ContainerNav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  background-color: ${COLORS_OBJ.secondary.high};

  ${MEDIA.tablet} {
    height: auto;
  }
`;

export default ContainerNav;