import styled from 'styled-components';
import {
  COLORS_TEXT, MEDIA,
} from '../StyleGuide';

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
  >div {
    margin-right: auto;

    ${MEDIA.tablet} {
      margin-right: 0;
      margin-bottom: 8px;
    }

    a {
    font-size: 20px;
    font-weight: bold;
    color: ${COLORS_TEXT.bgDark.high};
    letter-spacing: 0.9px;
    text-decoration: none;
    white-space: nowrap;
    }
  }

  // navLinks
  li {
    padding: 0;
    list-style: none;

    a{
      color: ${COLORS_TEXT.bgDark.low};
      font-weight: bold;
      margin-right: 16px;
      font-size: 16px;
      opacity: 1;
      text-decoration: none;
      white-space: nowrap;

      :hover {
        color: ${COLORS_TEXT.bgDark.high};
        opacity: 1.00;
      }

      .active {
        color: ${COLORS_TEXT.bgDark.high};
      }

      ${MEDIA.tablet} {
      display: none;
      }
    }
  }
`;
export default NavBar;
