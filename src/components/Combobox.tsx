import React, { useState, KeyboardEvent } from 'react';
import { Command } from 'cmdk';
import clsx from 'clsx';

import Card from './Card';


export type ComboboxType = {
  value: string,
  onChange: (value: string) => void,
  options: {
    label: string,
    value: string
  }[],
};

const Combobox = ({
  value, onChange, options,
}: ComboboxType) => {

  const [keyword, setKeyword] = useState<string>('');
  const [selection, setSelection] = useState<string>('');

  return (
    <Command
      value={value}
      onValueChange={onChange}
      onKeyDown={(e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          onChange(selection);
        }
      }}
    >
      <Card className="!dsr-p-0">
        <div className="dsr-p-2 dsr-border-b dsr-border-b-gray-200">
          <Command.Input
            autoFocus
            value={keyword}
            onValueChange={setKeyword}
            className="dsr-bg-transparent dsr-text-color dsr-outline-0"
          />
        </div>
        <Command.List>
          <Command.Group>
            {options.map((option) => (
              <Command.Item
                key={option.value}
                value={option.value}
                onSelect={setSelection}
                className={clsx([
                  'dsr-p-2 dsr-text-color dsr-outline-0 dsr-bg-transparent hover:dsr-bg-gray-100/20 active:dsr-gray-100/20 aria-selected:dsr-bg-gray-100/20 aria-selected:dsr-text-accent-foreground',
                ])}
              >
                {option.label}
              </Command.Item>
            ))}
          </Command.Group>

        </Command.List>
      </Card>


    </Command>
  );

};

export default Combobox;