import React, {useState} from "react";
import styled from "@emotion/styled";
import Button, { ButtonProps } from "./Button";

type Alert = {
  type?: "success" | "info" | "warning" | "danger";
  className?: string,
  title?: string
  description?: string;
  iconClassName?: string,
  allowDismissal?: boolean,
  onDismiss?: () => void,
  primaryButton?: ButtonProps,
  secondaryButton?: ButtonProps,
};

type AlertContainer = {
    type: "success" | "info" | "warning" | "danger";
}

const AlertContainer = styled('div')<AlertContainer>`
  background-color: ${props => props.type === "success" ? "#dff0d8" : props.type === "info" ? "#d9edf7" : props.type === "warning" ? "#fcf8e3" : "#f2dede"};
  color: ${props => props.type === "success" ? "#3c763d" : props.type === "info" ? "#31708f" : props.type === "warning" ? "#8a6d3b" : "#a94442"};
`;


const Alert = ({
    type = 'info', className = '', title, description, iconClassName, allowDismissal = false, onDismiss = () => {},
    primaryButton, secondaryButton,
}: Alert) => {

    const [hide, setHide] = useState(false);

    return !hide ? (
        <AlertContainer type={type} className={`${description ? 'px-3 py-4' : 'px-3 py-2'} relative rounded-lg ${className}`}>
            {allowDismissal && (
                <div className="absolute top-0 right-0 pr-3">
                    <button
                        title="dismiss"
                        className="font-mono outline-none font-bold text-2xl"
                        onClick={() => { setHide(true); onDismiss() }}
                    >
                        x
                    </button>
                </div>
            )}
            {title &&
            <h4 className={`${description ? 'text-xl font-semibold' : 'text-lg'}`}>
                {iconClassName && <i className={iconClassName} />}
                {title}
            </h4>}
            {description && <p className="text-lg mt-2">{description}</p>}
            {(primaryButton || secondaryButton) && (
                <div className="flex items-center py-2">
                    {primaryButton &&
                    <div className="mr-2">
                        <Button
                            {...primaryButton}
                            variant="primary"
                            px={3} py={1}
                            className="text-base"
                        />
                    </div>}
                    {secondaryButton &&
                    <div>
                        <Button
                            {...secondaryButton}
                            variant="secondary"
                            px={3} py={1}
                            className="text-base"
                        />
                    </div>}
                </div>
            )}
        </AlertContainer>
    ) : <div />;
}

export default Alert;