import { useEffect, useState } from 'react';
import shortid from 'shortid'

const emptyFunc = () => {};

type TextInput = {
    label: string
    name: string
    id?: string
    placeholder?: string
    type?: ('email' | 'number' | 'password' | 'text' | 'textarea' | 'url')
    value: (string | number)
    required?: boolean
    disabled?: boolean
    inputClassName?: string
    inputStyle?: any
    rows?: number
    charLimit?: number
    errorText?: string
    description?: string
    hideLabel?: boolean
    alwaysShowLabel?: boolean
    spellCheck?: ('off' | 'on')
    autoComplete?: ('off' | 'on' | 'email' | 'current-password' | 'username')
    autoCorrect?: ('off' | 'on')
    autoCapitalize?: ('off' | 'on')
    onFocus?: () => void
    onBlur?: () => void
    onKeyDown?: (e: any) => void,
    onChange?: (value: any) => void
    className?: string
    style?: any
    autoFocus?: boolean,
    postfixRenderer?: any
};


const TextInput = ({
   id, label, name, placeholder, value: val, charLimit = 0,
   className, style, hideLabel = false,
   required = false, disabled = false, autoFocus = false,
   spellCheck, autoComplete, autoCorrect, autoCapitalize,
   inputStyle, inputClassName, type, errorText, description, postfixRenderer,
   onChange = emptyFunc, onFocus = emptyFunc, onBlur = emptyFunc, onKeyDown = emptyFunc
}: TextInput) => {

    const inputID = id && id.length > 1 ? id : `${name}-input-${shortid.generate()}`;

    const [isTyping, setTyping] = useState(false);

    const [value, setValue] = useState(val !== null ? val : '');
    useEffect(() => {
        setValue(val);
    }, [val]);

    const handleChange = (e: any) => {
        const value = e.currentTarget.value;
        if (charLimit == null || (value.length <= charLimit)) {
            if (typeof onChange === 'function')
                if (type === 'number')
                    onChange(parseInt(value));
                else
                    onChange(value);
            setValue(value);
        }
    };

    const handleFocus = () => {
        if (typeof onFocus === 'function')
            onFocus();
        setTyping(true);
    };

    const handleBlur = () => {
        if (typeof onBlur === 'function')
            onBlur();
        setTyping(false);
    };

    const props = {
        'aria-label': label,
        'aria-required': required,
        id: inputID,
        value,
        placeholder: placeholder || label,
        spellCheck,
        autoComplete,
        autoCorrect,
        autoCapitalize,
        autoFocus: autoFocus ? 'true' : null,
        required: required,
        disabled: disabled,
        onFocus: handleFocus,
        onBlur: handleBlur,
        onChange: handleChange,
        type,
        style: inputStyle,
    };

    return <div className={className} style={style}>
        <div className="w-full py-1">
            {(!hideLabel) &&
            <div className="flex flex-wrap mb-2 px-1 mx-0">
                <div className="w-2/3 px-0">
                    <label htmlFor={inputID} aria-hidden={false}>
                        {label}
                        {required && <span className="required-marker">*</span>}
                    </label>
                </div>
                {((typeof value !== 'number' && value?.length > 0) && isTyping && charLimit > 0) &&
                <div className="w-1/3 opacity-80 px-1 flex items-end justify-end">
                    {value?.length}/{charLimit}
                </div>}
            </div>}
            <div className="relative">
                {/* @ts-ignore */}
                <input
                    {...props}
                    className={inputClassName}
                    onKeyDown={onKeyDown}
                />
                {postfixRenderer && <div>{postfixRenderer}</div>}
            </div>
            {errorText &&
            <div className="text-red-400 mt-1">
                {errorText}
            </div>}
            {description &&
            <div className="mt-2" style={{opacity: 0.75, fontSize: '10px'}}>
                {description}
            </div>}
        </div>
    </div>;

};

export default TextInput;
