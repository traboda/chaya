import React from 'react';

import { Meta, Story, addDecorator } from '@storybook/react';
import { CircularProgress } from '../src';
import ThemeContext from "../src/ThemeProvider";
addDecorator((story) => (
    <ThemeContext>
        {story()}
    </ThemeContext>
));

const meta: Meta = {
    title: 'Basic Elements/Circular Progress',
    component: CircularProgress,
};

export default meta;

const Template: Story = args => (
        <div className='flex justify-center bg-gray-200 items-center' style={{minHeight: '400px'}}>
            <CircularProgress {...args} />
        </div>
);

export const Default = Template.bind({});

Default.args = {
    percent: 40,
    label: 'test',
    progressBarWidth: 5,
    progressBarColor: '#84E2E2',
    innerCircleColor: '#1F245B',
    progressBackgroundColor: '#35527A',
    labelClassName: 'font-md font-bold',
    animate: false
}