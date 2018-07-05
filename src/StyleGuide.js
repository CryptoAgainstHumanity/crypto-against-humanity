// Constants to be used for styling components across application
import styled from 'styled-components';

// Dimensions

export const CONTENT_WIDTH = '888px';

// Colors
export const COLORS_OBJ = {
  primary : {
    red: '#D94A4D',
    green: '#4CB191',
  },
  secondary : {
    high: '#333333',
    medium: '#757575',
    low: '#A1A1A1',
  },
  background : '#e9ebee',
};

export const COLORS_TEXT = {
  bgLight : {
    high: COLORS_OBJ.secondary.high,
    medium: COLORS_OBJ.secondary.medium,
    low: COLORS_OBJ.secondary.low,
  },
  bgDark : {
    high: '#FFFFFF',
    medium: '#D6D6D6',
    low: '#A1A1A1',
  },
};

// Returns a string with hex value darker by a constant than input hex color
export const DARKEN = (color) => {

  // Test input is hex value
  if ((color[0] !== '#') || (color.length !== 7)) {
    console.error('DARKEN requires a 7 char hex value as input');
  }

  const rInput = color.substr(1,2);
  const gInput = color.substr(3,2);
  const bInput = color.substr(5,2);

  const addedBlackOpacity = 0.1;

  const darkenHex =(primaryColor) => {
    const intInput = parseInt(primaryColor, 16);
    const intOutput = Math.floor(intInput * (1-addedBlackOpacity));
    const hexOutput = intOutput.toString(16);
    return String(hexOutput);
  }

  return ('#' + darkenHex(rInput) + darkenHex(gInput) + darkenHex(bInput));
}

// Fonts

export const FONT = {
  heading: 'Arial, sans-serif',
  body: 'Arial. sans-serif',
}

// Borders-raduis, Shadows,

export const HAS_BORDER_RADIUS = 'border-radius: 5px';
export const HAS_SHADOW = 'box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.2)';

// Opacity for different background and emphasis types

export const OPACITY = {
  bgLight : {
    high: 0.87,
    medium: 0.60,
    low: 0.38,
  },
  bgDark : {
    high: 1.00,
    medium: 0.80,
    low: 0.54,
  },
}

// Typography
export const H1 = styled.h1`
  font-size: 32px;
  font-family: ${FONT.heading};
  font-weight: bold;
  color: ${props => props.bgDark ? COLORS_TEXT.bgDark.high : COLORS_TEXT.bgLight.high};
  margin: 0;
  `;

export const H2 = styled.h2`
  font-size: 24px;
  font-family: ${FONT.heading};
  font-weight: bold;
  color: ${props => props.bgDark ? COLORS_TEXT.bgDark.high : COLORS_TEXT.bgLight.high};
  margin: 0;
  `;

export const H3 = styled.h3`
  font-size: 20px;
  font-family: ${FONT.heading};
  font-weight: bold;
  color: ${props => props.bgDark ? COLORS_TEXT.bgDark.high : COLORS_TEXT.bgLight.high};
  margin: 0;
  `;

export const H4 = styled.h4`
  font-size: 16px;
  font-family: ${FONT.heading};
  font-weight: bold;
  color: ${props => props.bgDark ? COLORS_TEXT.bgDark.high : COLORS_TEXT.bgLight.high};
  margin: 0;
  `;

export const LABEL = styled.p`
  font-size: 16px;
  font-family: ${FONT.body};
  font-weight: normal;
  color: ${props => props.bgDark ? COLORS_TEXT.bgDark.low : COLORS_TEXT.bgLight.low};
  margin-bottom: 8px;
`;

export const LOADING = styled.p`
  font-size: 16px;
  font-family: ${FONT.body};
  font-weight: normal;
  color: ${props => props.bgDark ? COLORS_TEXT.bgDark.low : COLORS_TEXT.bgLight.low};
  margin-bottom: 8px;
`;

export const PARAGRAPH = styled.p`
  font-size: 16px;
  font-family: ${FONT.body};
  font-weight: normal;
  color: ${props => props.bgDark ? COLORS_TEXT.bgDark.medium : COLORS_TEXT.bgLight.medium};
`;

// Media Templates

const SIZES = {
  desktop: 992,
  tablet: 768,
  phone: 425,
}

export const MEDIA = {
  desktop: `@media only screen and (max-width: ${SIZES.desktop}px)`,
  tablet: `@media only screen and (max-width: ${SIZES.tablet}px)`,
  phone: `@media only screen and (max-width: ${SIZES.phone}px)`,
}

// Iterate through the sizes and create a media template
// export const MEDIA = Object.keys(sizes).reduce((acc, label) => {
//   acc[label] = (...args) => css`
//     @media (max-width: ${sizes[label] / 16}em) {
//       ${css(...args)}
//     }
//   `

//   return acc
// }, {})
