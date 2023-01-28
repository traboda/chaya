import React, { FormEvent, useState } from 'react';
import clsx from 'clsx';

import SimpleSelect, { SimpleSelectOptionType } from './SimpleSelect';
import Button from './Button';
 
type SelectorButtonProps = {
  name: string,
  id?: string,
  className?: string,
  options: SimpleSelectOptionType,
  onSubmit?: (value: string | number) => void,
  disabled?: boolean,
  labels?: {
    button: string,
  }
};

const defaultLabels = {
  button: 'Go',
};

const SelectorButton = ({
  name, id, className = '', options, disabled = false, onSubmit: onSubmitProp = () => {}, labels: initialLabels,
}: SelectorButtonProps) => {

  const labels = { ...defaultLabels, ...initialLabels };

  const [value, setValue] = useState<string | number>('');

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmitProp(value);
  };

  return (
      <form
          id={id}
          className={clsx([
            className,
            'dsr-flex dsr-items-stretch w-full',
          ])}
          onSubmit={onSubmit}
      >
          <SimpleSelect
              value={value}
              onChange={setValue}
              name={name}
              options={options}
              disabled={disabled}
              required
              className="dsr-rounded-r-none"
          />
          <Button
              variant="solid"
              size="md"
              className="dsr-flex-shrink-0 dsr-rounded-l-none"
              type="submit"
              disabled={disabled}
          >
              {labels?.button}
          </Button>
      </form>
  );

};

export default SelectorButton;