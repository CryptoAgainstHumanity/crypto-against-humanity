import styled from 'styled-components';
import {
  COLORS_OBJ, COLORS_TEXT, MEDIA,
} from '../StyleGuide';
import Btn from './Button'

const NavBar = styled.ul`
  flex: 0 1 1160px;

  display: flex;
  align-items: center;

  height: 100%;
  margin: 0;
  padding: 0 8px;

  ${MEDIA.tablet} {
    flex-direction: column;
    align items: center;
    padding: 16px;
  }

  // logo
  div {
    margin-right: auto;

    ${MEDIA.tablet} {
      margin-right: 0;
      margin-bottom: 8px;
    }

    a {
    font-size: 28px;
    color: ${COLORS_TEXT.bgDark.high};
    letter-spacing: 0.8px;
    text-decoration: none;
    white-space: nowrap;

    ${MEDIA.phone} {
      font-size: 24px;
    }

    }
  }

  // navLinks
  li {
    padding: 0;
    list-style: none;

    a{
      color: ${COLORS_TEXT.bgDark.medium};
      opacity: 1;
      text-decoration: none;
      white-space: nowrap;

      :hover, .active {
        color: ${COLORS_TEXT.bgDark.high};
        opacity: 1.00;
      }
    }
  }

  // all except logo and create-card btn
  >li:not(:first-child):not(:last-child) {
    margin-right: 16px;
    font-size: 16px;

    ${MEDIA.tablet} {
      display: none;
    }
  }
`;

export default NavBar;
