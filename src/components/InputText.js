import styled from 'styled-components';
import {
  COLORS_OBJ, COLORS_TEXT, HAS_BORDER_RADIUS,
} from '../StyleGuide';

const InputText = styled.input`
  padding: 4px 12px;
  width: auto;
  border: 1px solid ${COLORS_OBJ.secondary.low};
  ${HAS_BORDER_RADIUS};
  background-color: white;
  color: ${COLORS_TEXT.bgLight.medium};

  font-weight: normal;
  font-size: 16px;

  ::placeholder: {
    color: ${COLORS_TEXT.bgLight.low};
    font-weight: normal;
  }

`;

export default InputText;