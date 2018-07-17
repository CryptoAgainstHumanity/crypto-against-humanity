import styled from 'styled-components';
import {
  COLORS_OBJ
} from '../StyleGuide';

const HeaderNotification = styled.div`
  padding: 16px;
  background-color: ${COLORS_OBJ.primary.red};
  color: white;
  font-size: 18px;

  display: flex;
  align-items: center;
  justify-content: center;

  a {
    color: white;
    font-weight: bold;
    text-decoration: underline;

    :hover {
      color: white;
    }
  }
`;

export default HeaderNotification;
