import styled from 'styled-components';
import {
  FONT, H1, COLORS_OBJ, COLORS_TEXT, HAS_SHADOW,
} from '../StyleGuide';

const Card = styled.div`
	width: ${props => props.bigCard ? 320 : 152}px;
	height: ${props => props.bigCard ? (320*1.25) : (152*1.25)}px;
	padding: ${props => props.bigCard ? 16 : 16}px;
	border-radius: 5px;
	${HAS_SHADOW};

	color: ${props => props.black ? COLORS_TEXT.bgDark.high : COLORS_TEXT.bgLight.high};
	background-color: ${props => props.black ? COLORS_OBJ.secondary.high : 'white'};

	// Format text inside
	font-family: ${FONT.heading};
	font-size: ${props => props.bigCard ? 32 : 20}px;
	font-weight: bold;

	// Handles long words / overflow
	overflow-wrap: break-word;
	hyphens: auto;
  overflow: hidden;
	}
`;

export default Card;
