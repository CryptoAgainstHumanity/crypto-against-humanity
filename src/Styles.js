// Constants to be used for styling components across application

import styled, {css} from 'styled-components';

// Opacity for different background and emphasis types
export const emphasisLightHigh = 0.87;
export const emphasisLightMedium = 0.60;
export const emphasisLightLow = 0.38;

export const emphasisDarkHigh = 1.00;
export const emphasisDarkMedium = 0.80;
export const emphasisDarkLow = 0.54;

// Typography
export const H1 = styled.h1`
  font-size: 32px;
  font-family: Arial;
  color: ${props => props.bgDark ? 'white' : 'black'};
  opacity: ${props => props.bgDark ? emphasisDarkHigh : emphasisLightHigh};
  `;

export const H2 = styled.h2`
  font-size: 24px;
  font-family: Arial;
  color: ${props => props.bgDark ? 'white' : 'black'};
  opacity: ${props => props.bgDark ? emphasisDarkHigh : emphasisLightHigh};
  `;

export const H3 = styled.h3`
  font-size: 16px;
  font-family: Arial;
  font-weight: normal;
  color: ${props => props.bgDark ? 'white' : 'black'};
  opacity: ${props => props.bgDark ? emphasisDarkHigh : emphasisLightHigh};
  `;

export const H4 = styled.h4`
  font-size: 16px;
  font-family: Arial;
  color: #000000;
  text-align: left;
  `;

// Media Templates

const sizes = {
  desktop: 992,
  tablet: 768,
  phone: 376
}

// Iterate through the sizes and create a media template
export const MEDIA = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `

  return acc
}, {})
