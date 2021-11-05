import { CSSProperties } from "react";
import Select, { components } from 'react-select';
import { useTheme } from '@emotion/react';
import CreatableSelect from 'react-select/creatable';
import AsyncCreatableSelect from 'react-select/async-creatable';
import AsyncSelect from 'react-select/async';
import classNames from 'classnames';

import ToolTip from './ToolTip';

type SelectorProps = {
    loadOptions?: any;
    isAsync?: boolean;
    required?: boolean;
    labels?: {
        title?: string,
        helpText?: string,
        placeholder?: string
    };
    options: {
        label?: string,
        value?: string
    }[],
    styles?: CSSProperties,
    dropDownIcon?: string,
    value: string,
    onChange?: (state: any) => void,
    components?: any,
    isCreatableAsync?: boolean
    isCreatable?: boolean
    disabled?: boolean
}

const Selector = (props: SelectorProps) => {

    const theme = useTheme();

    const getObjectByValue = (v: any) => {
        if (typeof v !== 'object') {
            if (props?.options?.length > 0)
                return props.options.filter((i) => i.value === v)[0];
        }
        return v;
    };

    const styles = {
        menuPortal: (base: any) => ({
            ...base,
            zIndex: 9999
        }),
        menu: (provided: any) => ({
            ...provided,
            zIndex: 9000,
            background: `${theme.background}`,
        }),
        control: (provided: any, state: any) => ({
            ...provided,
            borderRadius: '8px',
            border: state.isFocused ? `2px solid ${theme.secondary}` : '2px solid hsla(0,0%,40%,.7)',
            background: `${theme.background}`,
            color: `${theme.color}!important`,
            boxShadow: 'none',
            '&:hover': {
                border: '2px solid hsla(0,0%,80%,.8)',
            },
        }),
        valueContainer: (provided: any) => ({
            ...provided,
            padding: '0.5rem',
            margin: 0,
            height: '100%',
            display: 'flex',
            input: {
                background: `${theme.background}`,
                color: `${theme.color}!important`,
            },
        }),
        multiValue: (provided: any) => ({
            ...provided,
            background: `${theme.secondary}`,
            color: `${theme.secondaryTextColor}`,
            fontSize: '1.2rem'
        }),
        singleValue: (provided: any) => ({
            ...provided,
            color: `${theme.color}!important`,
            fontSize: '1.2rem',
        }),
        menuList: (provided: any) => ({
            ...provided,
            background: '#111',
            color: 'white',
            zIndex: 9000
        }),
        option: (styles: any, { isFocused, isSelected }: any) => ({
            ...styles,
            backgroundColor: isSelected ? `${theme.primary}` : isFocused ? 'hsla(0,0%,50%,.5)' : `${theme.background}`,
            color: isSelected ? `${theme.primaryTextColor}` : isFocused ? `${theme.color}` : `${theme.color}`,
            width: 'auto',
            display: 'flex',
            minHeight: '20px'
        }),
        ...props.styles,
    };

    // @ts-ignore
    return <div className="relative w-full py-1">
        {props?.labels &&
        <div className="flex flex-wrap mb-2 mx-0">
            {props.labels?.title &&
            <div className="w-4/5">
                <label className="opacity-80" style={{ fontSize: '1.2rem' }}>
                    {props.labels.title}
                    {props?.required && <span className="pl-2" style={{ color: '#F99' }}>*</span>}
                </label>
            </div>}
            {props.labels.helpText &&
            <div className="w-1/5 flex items-center justify-end px-1">
                <ToolTip
                    placement="top"
                    overlay={props.labels.helpText}
                >
                    <i
                        style={{ fontSize: '1.35rem', opacity: 0.8, fontWeight: 300 }}
                        className="far fa-info-circle"
                    />
                </ToolTip>
            </div>}
        </div>}
        {props?.isAsync ?
            <AsyncSelect
                cacheOptions
                loadOptions={props?.loadOptions} // @ts-ignore
                styles={styles}
                {...props}
                components={{
                    DropdownIndicator: (p) =>
                        <components.DropdownIndicator {...p}>
                            <i
                                className={classNames('mr-2',
                                    props?.dropDownIcon ?? 'fa fa-chevron-down'
                                )}
                            />
                        </components.DropdownIndicator>,
                    ...props.components
                }}
                onChange={props.onChange}
                value={props.value}
            /> :
            props.isCreatableAsync ?
                <AsyncCreatableSelect
                    placeholder={props?.labels?.placeholder}
                    {...props}
                    components={{
                        DropdownIndicator: (p) =>
                            <components.DropdownIndicator {...p}>
                                <i
                                    className={classNames('mr-2',
                                        props?.dropDownIcon ? props?.dropDownIcon : 'fa fa-chevron-down'
                                    )}
                                />
                            </components.DropdownIndicator>,
                        ...props.components
                    }}
                    styles={styles}
                    value={getObjectByValue(props.value)}
                /> :
                props?.isCreatable ?
                    <CreatableSelect
                        placeholder={props?.labels?.placeholder}
                        {...props}
                        components={{
                            DropdownIndicator: (p) =>
                                <components.DropdownIndicator {...p}>
                                    <i
                                        className={classNames('mr-2',
                                            props?.dropDownIcon ? props?.dropDownIcon : 'fa fa-chevron-down'
                                        )}
                                    />
                                </components.DropdownIndicator>,
                            ...props.components
                        }}
                        styles={styles}
                        value={getObjectByValue(props.value)}
                    /> :
                    <Select
                        placeholder={props?.labels?.placeholder}
                        {...props}
                        components={{
                            DropdownIndicator: (p) =>
                                <components.DropdownIndicator {...p}>
                                    <i
                                        className={classNames('mr-2',
                                            props?.dropDownIcon ? props?.dropDownIcon : 'fa fa-chevron-down'
                                        )}
                                    />
                                </components.DropdownIndicator>,
                            ...props.components
                        }}
                        styles={styles}
                        value={getObjectByValue(props.value)}
                    />}
        {!props.disabled && (
            <input
                tabIndex={-1}
                autoComplete="off"
                style={{ opacity: 0, height: 0, margin: 0, position: 'absolute', bottom: 0, left: 0 }}
                value={props?.value}
                required={props?.required}
            />
        )}
    </div>;
};

export default Selector;
