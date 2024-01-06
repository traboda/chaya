'use client';
import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';

import Radio, { RadioColor, RadioSize } from './Radio';
import Label from './Label';

export type RadioGroupProps<Type> = {
  value: Type,
  options: {
    value: Type,
    label: string,
    isDisabled?: boolean,
  }[],
  onChange?: (values: Type) => void,
  color?: RadioColor, 
  size?: RadioSize, 
  isDisabled?: boolean,
  alignment?: 'horizontal' | 'vertical',
  isRequired?: boolean,
  label?: string,
  optionClassName?: string
};

const RadioGroup = <Type extends string | number>({
  value, options, color = 'primary', size = 'md', isDisabled = false, alignment = 'vertical',
  isRequired = false, label, optionClassName, onChange = () => {},
}: RadioGroupProps<Type>) => {

  const radioRefs = useRef<(React.RefObject<HTMLInputElement>)[]>([]);

  useEffect(() => {
    radioRefs.current = options.map(() => React.createRef());
  }, [options]);

  const handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (isDisabled)
      return;
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        const nextElement = radioRefs.current[(index + 1) % options.length].current;
        nextElement?.focus();
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        const prevIndex = index === 0 ? options.length - 1 : index - 1;
        const prevElement = radioRefs.current[prevIndex].current;
        prevElement?.focus();
        break;
      case 'Enter':
        event.preventDefault();
        const option = options[index];
        onChange(option.value);
        break;
      case 'Home':
        event.preventDefault();
        const firstElement = radioRefs.current[0].current;
        firstElement?.focus();
        break;
      case 'End':
        event.preventDefault();
        const lastElement = radioRefs.current[options.length - 1].current;
        lastElement?.focus();
        break;
      case 'Tab':
        if (event.shiftKey && index === 0) {
          event.preventDefault();
          const lastElement = radioRefs.current[options.length - 1].current;
          lastElement?.focus();
        }
        break;
      default:
        break;
    }
  };

  return (
    <React.Fragment>
      {label && (
      <Label
        className={clsx([isDisabled && 'dsr-opacity-70', 'dsr-mb-2'])}
        children={label}
        isRequired={isRequired}
      />
      )}
      <div
        role="group"
        className={clsx([
          'radio-group dsr-flex',
          alignment === 'vertical' ? 'dsr-flex-col dsr-gap-2' : 'dsr-flex-row dsr-gap-4',
        ])}
      >
        {options.map((option, index) => (
          <Radio
            tabIndex={0}
            ref={radioRefs.current[index]}
            className={optionClassName}
            key={index}
            value={option.value}
            label={option.label}
            color={color}
            size={size}
            onKeyDown={(e) => handleKeydown(e, index)}
            onChange={() => onChange(option.value)}
            isSelected={value === option.value}
            isDisabled={isDisabled || option.isDisabled}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default RadioGroup;