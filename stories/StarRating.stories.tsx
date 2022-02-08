import React, { useEffect, useState } from 'react';

import { addDecorator, Meta, Story } from '@storybook/react';
import { StarRating } from '../src';

import ThemeContext from "../src/ThemeProvider";
addDecorator((story) => (
    <ThemeContext>
        {story()}
    </ThemeContext>
));

const meta: Meta = {
    title: 'User Inputs/Star Rating',
    component: StarRating,
    argTypes: {
        children: {
            control: {
                type: 'text',
            },
        },
    },
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;

// @ts-ignore
const Template: Story = args => {
    const [value, setValue] = useState(args.value);
    useEffect(() => setValue(args.value), [args.value]);

    return <StarRating {...args} value={value} onChange={setValue} />;
}

export const Basic = Template.bind({});

Basic.args = {
    value: 0,
    size: 50,
    tooltipDefaultText: 'This is the default text',
    tooltipArray: ['Very easy', 'Easy', 'Medium', 'Hard', 'Very Hard']
};

export const DarkTheme: Story = (args) => {
    const [value, setValue] = useState(args.value);
    useEffect(() => setValue(args.value), [args.value]);

    return (
        <ThemeContext isDarkTheme>
            <div className="bg-gray-900 p-4 h-36">
                {/*// @ts-ignore*/}
                <StarRating {...args} value={value} onChange={setValue} />
            </div>
        </ThemeContext>
    );
}

DarkTheme.args = {
    value: 0,
    size: 50,
    tooltipDefaultText: 'This is the default text',
    tooltipArray: ['Very easy', 'Easy', 'Medium', 'Hard', 'Very Hard']
};

