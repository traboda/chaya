import styled from '@emotion/styled';
import Color from 'color';

type Card = {
  background?: string
}

const Card = styled('div')<Card>`
  padding: 1.35rem;
  background: ${({ theme, background }) => background ? background :
      (Color(theme.background).isDark() ?
      Color(theme.background).darken(0.3).hex() :
      Color(theme.background).lighten(0.3).hex()) || 'rgba(0, 0, 30, 0.25)'
  };
  border-radius: 8px;
  height: 100%;
`;

export default Card;