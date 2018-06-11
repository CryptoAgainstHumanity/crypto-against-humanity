import styled from 'styled-components';
import {
  MEDIA, CONTENT_WIDTH
} from '../StyleGuide';

const ContainerRow = styled.div`
  margin: auto;
  width: ${CONTENT_WIDTH};
  padding: 40px 0;

  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: flex-start;

  ${MEDIA.tablet} {
    flex-flow: column;
    align-items: center;
  }

  >div:not(:first-child) {
    margin-left: 40px;

    ${MEDIA.tablet} {
      margin-left: 0px;
      margin-top: 40px;
    }
  }
`;

export default ContainerRow;