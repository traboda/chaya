import React from "react";
import styled from '@emotion/styled';

type Card = {
    children: (React.ReactNode|React.ReactChildren);
    variant?: 'shaded'|'outline';
    title?: string,
    description?: string,
    titleClassName?: string,
    iconClassName?: string,
    iconRenderer?: React.ReactElement,
    background?: string,
    id?: string,
    className?: string,
}

type CardContainer = {
    background?: string
}

const CardContainer = styled('div')<CardContainer>`
  h3 {
    color: ${({ theme }) => theme.secondary};
  }
  &.card-shaded {
    background: ${({ background, theme }) =>
        background ? background :
        theme.isDarkTheme ? 'hsla(0, 0%, 90%, 0.15)' : 'hsla(0, 0%, -20%, 0.05)'
    };
  }
  &.card-outline {
    border: 1px solid ${({ theme }) => theme.isDarkTheme ? 'hsla(0, 0%, 100%, 0.15)' : 'hsla(0, 0%, 0%, 0.15)'};
  }
`;

const Card = ({
    id, children, title, description, variant = 'shaded',
    className = '', titleClassName = '', iconClassName = '', iconRenderer = null,
    background,
}: Card) =>  (
    <CardContainer id={id} background={background} className={`card card-${variant} rounded-lg p-4 h-full ${className}`}>
        <div className="px-2 pt-2">
            {title &&
            <h3 className={`text-3xl mb-2 font-semibold ${titleClassName}`}>
                {iconClassName && <i className={`${iconClassName} mr-2`} />}
                {iconRenderer}
                {title}
            </h3>}
            {description && <p className="text-lg opacity-90 mb-2">{description}</p>}
            {children}
        </div>
    </CardContainer>
);


export default Card;
