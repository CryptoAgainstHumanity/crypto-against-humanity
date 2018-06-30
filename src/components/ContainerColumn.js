import styled from 'styled-components';
import { CONTENT_WIDTH, MEDIA } from '../StyleGuide';


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

  >* {
    text-align: center;
  }

  ${MEDIA.tablet} {
    width: auto;
  }
`;

export default ContainerColumn;