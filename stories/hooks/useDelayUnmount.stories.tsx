import React, { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react-vite';

import useDelayUnmount from '../../src/hooks/useDelayUnmount';

const meta: Meta = {
  title: 'Hooks/useDelayUnmount',
};

export default meta;

type Story = StoryObj;

const DelayUnmountDemo = () => {
  const [isMounted, setIsMounted] = useState(true);
  const shouldRender = useDelayUnmount(isMounted, 500);

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={() => setIsMounted((prev) => !prev)}
        className="w-fit rounded border px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        {isMounted ? 'Unmount' : 'Mount'} (500ms delay)
      </button>
      <div className="flex gap-4 text-sm">
        <span>
          isMounted: <strong>{String(isMounted)}</strong>
        </span>
        <span>
          shouldRender: <strong>{String(shouldRender)}</strong>
        </span>
      </div>
      {shouldRender && (
        <div
          className="rounded border bg-blue-100 p-4 dark:bg-blue-900"
          style={{
            opacity: isMounted ? 1 : 0,
            transition: 'opacity 500ms',
          }}
        >
          This element unmounts after a 500ms delay, allowing exit animations to complete.
        </div>
      )}
    </div>
  );
};

export const Default: Story = {
  render: () => <DelayUnmountDemo />,
};
