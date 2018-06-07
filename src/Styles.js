// Constants to be used for styling components across application

import styled, {css} from 'styled-components';

// Colors
export const COLORS_OBJ = {
  primary : {
    high: '#D94A4D',
  },
  secondary : {
    high: '#323639',
    medium: '#323639',
    low: '#323639',
  },
};

export const COLORS_TEXT = {
  bgLight : {
    high: '#D94A4D',
    medium: '#323639',
    low: '#323639',
  },
  bgDark : {
    high: 'white',
    medium: '#D6D6D6',
    low: '#323639',
  },
};

// Shadows

export const HAS_SHADOW = "box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.2)";

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
  font-family: Arial;
  color: ${props => props.bgDark ? 'white' : 'black'};
  opacity: ${props => props.bgDark ? OPACITY.bgDark.high : OPACITY.bgLight.high};
  `;

export const H2 = styled.h2`
  font-size: 24px;
  font-family: Arial;
  color: ${props => props.bgDark ? 'white' : 'black'};
  opacity: ${props => props.bgDark ? OPACITY.bgDark.high : OPACITY.bgLight.high};
  `;

export const H3 = styled.h3`
  font-size: 16px;
  font-family: Arial;
  font-weight: normal;
  color: ${props => props.bgDark ? 'white' : 'black'};
  opacity: ${props => props.bgDark ? OPACITY.bgDark.high : OPACITY.bgLight.high};
  `;

export const H4 = styled.h4`
  font-size: 16px;
  font-family: Arial;
  color: #000000;
  text-align: left;
  `;

// Media Templates

const SIZES = {
  desktop: 992,
  tablet: 768,
  phone: 376
}

const mediaQuery = '@media only screen and (max-width: 768px)';

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
