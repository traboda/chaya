import styled from '@emotion/styled';

type Card = {
    background?: string
}

const Card = styled('div')<Card>`
  padding: 1.35rem;
  background: ${({ background, theme }) => background ? background : theme.isDarkTheme ? 'rgba(237, 237, 237, 0.25)' : 'rgba(237, 237, 237, 0.75)' };
  border-radius: 8px;
  height: 100%;
`;

export default Card;