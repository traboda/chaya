import React from 'react';
import { Meta, Story } from '@storybook/react';

import { useClipboard } from '../index';

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
    <div className="ddsr-flex dsr-justify-center dsr-items-center dsr-flex-col" style={{ minHeight: '40vh' }}>
      <div className="dsr-mb-6">
        {isSupported() ?
          <div className="dsr-bg-green-500 dsr-text-white dsr-font-bold dsr-rounded-lg dsr-py-0 dsr-px-3">
            clipboard is supported
          </div> :
          <div className="dsr-bg-red-500 dsr-text-white dsr-font-bold dsr-rounded-lg dsr-py-0 dsr-px-3">
            Clipboard is not supported!!
          </div>
                }
      </div>
      <div className="dsr-flex dsr-mb-6">
        <h1>Click to copy:</h1>
        <button
          className="dsr-bg-blue-900 dsr-py-0 dsr-px-3 dsr-rounded-lg dsr-text-white dsr-font-bold dsr-mx-3"
          onClick={() => copy('ABCD')}
        >
          ABCD
        </button>
        <button
          className="dsr-bg-yellow-900 dsr-py-0 dsr-px-3 dsr-rounded-lg dsr-text-white dsr-font-bold dsr-mx-3"
          onClick={() => copy('Lorem ipsum dolor sit amet, consectetur adipiscing elit.')}
        >
          Lorem ipsum
        </button>
        <button
          className="dsr-bg-red-900 dsr-py-0 dsr-px-3 dsr-rounded-lg dsr-text-white dsr-font-bold dsr-mx-3"
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