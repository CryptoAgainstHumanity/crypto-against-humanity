import styled from 'styled-components';
import { CONTENT_WIDTH } from '../StyleGuide';


const ContainerColumn = styled.div`
  margin: auto;
  width: ${CONTENT_WIDTH};
  padding: 40px;

  display: flex;
  flex-direction: column;
  align-items: center;

  >:not(:first-child) {
    margin-top: 16px;
  }
`;

export default ContainerColumn;