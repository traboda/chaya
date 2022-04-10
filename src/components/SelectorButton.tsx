import React, {useState} from "react";
import SimpleSelect, { SimpleSelectOptionType } from "./SimpleSelect";
import Button from "./Button";

type SelectorButton = {
    name: string,
    className?: string,
    options: SimpleSelectOptionType,
    onSubmit?: (value: string|number) => void,
    disabled?: boolean,
    labels?: {
        button: string,
    }
};

const defaultLabels = {
    button: 'Go'
};

const SelectorButton = ({ name, className = '', options, disabled = false, onSubmit = () => {}, labels }: SelectorButton) => {

    const _labels = {...defaultLabels, labels};

    const [value, setValue] = useState<string|number>(null);

    const _onSubmit = (e) => {
        e.preventDefault();
        onSubmit(value);
    };

    return (
        <form className={`flex items-center ${className}`} onSubmit={_onSubmit}>
            <div className="w-4/5">
                <SimpleSelect
                    value={value}
                    onChange={setValue}
                    name={name}
                    options={options}
                    disabled={disabled}
                    required
                />
            </div>
            <div className="w-1/5 pl-1">
                <Button
                    variant="solid"
                    size="md"
                    className="mr-0 block py-3 w-full h-full"
                    type="submit"
                    disabled={disabled}
                >
                    {_labels?.button}
                </Button>
            </div>
        </form>
    );

};

export default SelectorButton;