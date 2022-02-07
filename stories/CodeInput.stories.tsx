import React, { useEffect, useState } from 'react';

import { addDecorator, Meta, Story } from '@storybook/react';
import { CodeInput } from '../src';
import ThemeContext from "../src/ThemeProvider";
addDecorator((story) => (
    <ThemeContext>
        {story()}
    </ThemeContext>
));

const meta: Meta = {
    title: 'Code Input',
    component: CodeInput,
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;

const Template: Story = args => {
    const [value, setValue] = useState(args.value ?? '');

    useEffect(() => {
        setValue(args.value);
    }, [args.value]);

    return (
        // @ts-ignore
        <CodeInput {...args} value={value} onChange={setValue} />
    );
}

export const Default = Template.bind({});

Default.args = {
    items: [
        {
            title: 'Item 1',
            text: 'This is a text'
        },
        {
            title: 'Item 21',
            text: 'This is a text'
        },
        {
            title: 'Item 31',
            text: 'This is a text'
        },
        {
            title: 'Item 41',
            text: 'This is a text'
        }
    ]
};