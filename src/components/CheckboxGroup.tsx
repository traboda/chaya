'use client';
import React, { useEffect, useRef, KeyboardEvent } from 'react';
import clsx from 'clsx';

import Checkbox, { CheckboxColor, CheckboxSize } from './Checkbox';
import Label from './Label';

export type CheckboxGroupProps<Type> = {
  value: Type[],
  options: {
    value: Type,
    label: string,
    isDisabled?: boolean,
  }[],
  onChange?: (values: Type[]) => void,
  color?: CheckboxColor,
  size?: CheckboxSize,
  isDisabled?: boolean,
  id?: string,
  alignment?: 'horizontal' | 'vertical',
  isRequired?: boolean,
  label?: string,
  optionClassName?: string,
  minSelections?: number,
};

const CheckboxGroup = <Type extends string | number>({
  value, options, onChange = () => {}, color = 'primary', size = 'md', isDisabled = false, alignment = 'vertical',
  isRequired = false, label, optionClassName, id, minSelections = 1,
}: CheckboxGroupProps<Type>) => {

  const checkboxRefs = useRef<(React.RefObject<HTMLInputElement>)[]>([]);
  const [hiddenInputValue, setHiddenInputValue] = React.useState<string>('');

  useEffect(() => {
    setHiddenInputValue(value && value.length >= minSelections ? value.join(',') : '');
  }, [value]);

  useEffect(() => {
    checkboxRefs.current = options.map(() => React.createRef());
  }, [options]);

  const handleKeyDown = (event: KeyboardEvent<HTMLLabelElement>, index: number) => {
    if (isDisabled)
      return;
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
      case 'Tab':
        if (!event.shiftKey && index === options.length - 1) {
          // If we're at the last checkbox, let the Tab key behave normally.
          break;
        }
        event.preventDefault();
        const nextElement = checkboxRefs.current[(index + 1) % options.length].current;
        nextElement?.focus();
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        const prevIndex = index === 0 ? options.length - 1 : index - 1;
        const prevElement = checkboxRefs.current[prevIndex].current;
        prevElement?.focus();
        break;
      case 'Enter':
        event.preventDefault();
        const option = options[index];
        onChange(value && value.includes(option.value) ?
          value.filter(value => value !== option.value) :
          [...value, option.value]);
        break;
      case 'Home':
        event.preventDefault();
        const firstElement = checkboxRefs.current[0].current;
        firstElement?.focus();
        break;
      case 'End':
        event.preventDefault();
        const lastElement = checkboxRefs.current[options.length - 1].current;
        lastElement?.focus();
        break;
      default:
        break;
    }

    // Handle Shift+Tab separately
    if (event.shiftKey && event.key === 'Tab') {
      if (index === 0) {
        // If we're at the first checkbox, let Shift+Tab behave normally.
        return;
      }
      event.preventDefault();
      const prevIndex = index === 0 ? options.length - 1 : index - 1;
      const prevElement = checkboxRefs.current[prevIndex].current;
      prevElement?.focus();
    }
  };

  return (
    <React.Fragment>
      {label && (
        <Label
          htmlFor={id}
          className={isDisabled ? 'opacity-70' : ''}
          children={label}
          isRequired={isRequired}
        />
      )}
      <div
        id={id}
        role="group"
        className={clsx([
          'checkbox-group flex',
          isRequired && 'relative',
          alignment === 'vertical' ? 'flex-col gap-2' : 'flex-row flex-wrap gap-4',
        ])}
      >
        {options?.length > 0 && options.map((option, index) => (
          <Checkbox
            tabIndex={0}
            ref={checkboxRefs.current[index]}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={optionClassName}
            key={index}
            value={option.value}
            label={option.label}
            isChecked={value && value.includes(option.value)}
            isDisabled={isDisabled || option.isDisabled}
            color={color}
            size={size}
            onChange={() => {
              onChange(value && value.includes(option.value) ?
                value.filter(value => value !== option.value) :
                [...value, option.value]);
            }}
          />
        ))}
        {isRequired && <input type="text" tabIndex={-1} className="absolute top-0 left-0 h-1 opacity-0" required value={hiddenInputValue} />}
      </div>
    </React.Fragment>
  );
};

export default CheckboxGroup;