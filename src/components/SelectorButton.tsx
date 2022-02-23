import React, {useState} from "react";
import SimpleSelect, { SimpleSelectOptionType } from "./SimpleSelect";
import Button from "./Button";

type SelectorButton = {
    name: string,
    className?: string,
    options: SimpleSelectOptionType,
    onSubmit?: (value: string) => void,
    labels?: {
        button: string,
    }
};

const defaultLabels = {
    button: 'Go'
};

const SelectorButton = ({ name, className, options, onSubmit = () => {}, labels }: SelectorButton) => {

    const _labels = {...defaultLabels, labels};

    const [value, setValue] = useState<string>(null);

    const _onSubmit = (e) => {
        e.preventDefault();
        onSubmit(value);
    };

    return (
        <form className={`flex items-center ${className}`} onSubmit={_onSubmit}>
            <SimpleSelect
                value={value}
                onChange={setValue}
                name={name}
                options={options}
                required
            />
            <Button
                variant="solid"
                className="ml-2 mr-0 h-full"
                type="submit"
            >
                {_labels?.button}
            </Button>
        </form>
    );

};

export default SelectorButton;