import styled from '@emotion/styled';

type Card = {
    background?: string
}

const Card = styled('div')<Card>`
  padding: 1.35rem;
  background: ${({ background }) => background ? background : 'rgba(0, 0, 30, 0.25)'
};
  border-radius: 8px;
  height: 100%;
`;

export default Card;