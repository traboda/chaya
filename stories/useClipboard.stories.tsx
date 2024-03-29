import React from 'react';
import { Meta, Story } from '@storybook/react';

import { useClipboard } from '../src';

const meta: Meta = {
  title: 'Hooks/useClipboard',
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story = () => {
  const [value, copy, isSupported] = useClipboard();
  return (
    <div className="dflex justify-center items-center flex-col" style={{ minHeight: '40vh' }}>
      <div className="mb-6">
        {isSupported() ?
          <div className="bg-green-500 text-white font-bold rounded-lg py-0 px-3">
            clipboard is supported
          </div> :
          <div className="bg-red-500 text-white font-bold rounded-lg py-0 px-3">
            Clipboard is not supported!!
          </div>
                }
      </div>
      <div className="flex mb-6">
        <h1>Click to copy:</h1>
        <button
          className="bg-blue-900 py-0 px-3 rounded-lg text-white font-bold mx-3"
          onClick={() => copy('ABCD')}
        >
          ABCD
        </button>
        <button
          className="bg-yellow-900 py-0 px-3 rounded-lg text-white font-bold mx-3"
          onClick={() => copy('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')}
        >
          Lorem ipsum
        </button>
        <button
          className="bg-red-900 py-0 px-3 rounded-lg text-white font-bold mx-3"
          onClick={() => copy('123')}
        >
          123
        </button> 
      </div>
      <p>
        Copied value:
        {value ?? 'Nothing is copied yet!'}
      </p>
    </div>
  );
};

export const Default = Template.bind({});