import React from 'react';

import { addDecorator, Meta, Story } from '@storybook/react';
import { ProgressBar } from '../src';
import ThemeContext from "../src/ThemeProvider";
addDecorator((story) => (
    <ThemeContext>
        {story()}
    </ThemeContext>
));

const meta: Meta = {
    title: 'Basic Elements/Progress Bar',
    component: ProgressBar,
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;

const Template: Story = args => (
        <div className='bg-gray-200 flex justify-center items-center h-72'>
            <ProgressBar {...args} />
        </div>
);

export const Default = Template.bind({});

Default.args = {
    className: 'w-1/2 border-blue-700 bg-blue-900',
    childClassName: 'bg-red-300 rounded-l',
    minVal: 1,
    maxVal: 100,
    stripsNone: true,
    percent: 30
}