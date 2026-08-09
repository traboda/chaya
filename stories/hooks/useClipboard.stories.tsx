import React from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import useClipboard from '../../src/hooks/useClipboard';

const meta: Meta = {
  title: 'Hooks/useClipboard',
};

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const [copiedText, copy, isSupported] = useClipboard();
    const sampleTexts = ['Hello, World!', 'chaya-ui', 'npm install chaya-ui'];

    return (
      <div className="flex flex-col gap-4">
        <div
          className={`rounded px-4 py-2 text-white ${isSupported() ? 'bg-green-500' : 'bg-red-500'}`}
        >
          {isSupported() ? 'clipboard is supported' : 'clipboard is not supported'}
        </div>
        <div>
          <strong>Click to copy:</strong>
          <div className="mt-2 flex gap-2">
            {sampleTexts.map((text) => (
              <button
                key={text}
                onClick={() => copy(text)}
                className="rounded border px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {text}
              </button>
            ))}
          </div>
        </div>
        <div>
          <strong>Copied value:</strong> {copiedText ?? 'Nothing is copied yet!'}
        </div>
      </div>
    );
  },
};
