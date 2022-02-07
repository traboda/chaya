import React from "react";
import styled from '@emotion/styled';

type Card = {
    children: (React.ReactNode|React.ReactChildren);
    title?: string,
    description?: string,
    iconClassName?: string,
    background?: string,
    className?: string,
}

type CardContainer = {
    background?: string
}

const CardContainer = styled('div')<CardContainer>`
  padding: 1rem;
  background: ${({ background, theme }) => background ? background : theme.isDarkTheme ? 'rgba(237, 237, 237, 0.1)' : 'rgba(237, 237, 237, 0.75)' };
  border-radius: 8px;
  height: 100%;
`;

const Card = ({
  title, description, iconClassName, background, className, children
}: Card) => {

    return (
        <CardContainer background={background} className={className}>
            {(title || description) &&
            <div className="px-2 pt-2">
                {title &&
                <h3 className="text-2xl mb-1 font-semibold">
                    {iconClassName && <i className={iconClassName} />}
                    {title}
                </h3>}
                {description && <p className="text-lg opacity-90 mb-2">{description}</p>}
            </div>}
            {children}
        </CardContainer>
    );

};

export default Card;