import React, { useEffect, useState } from 'react';
import { addDecorator, Meta, Story } from '@storybook/react';
import {Switch} from '../src';
import ThemeContext from "../src/ThemeProvider";

addDecorator((story) => (
    <ThemeContext>
        {story()}
    </ThemeContext>
));

const meta: Meta = {
    title: 'User Inputs/Switch',
    component: Switch,
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;

const Template: Story = args => {
    const [value, setValue] = useState(args.value ?? false);

    useEffect(() => {
        setValue(args.value);
    }, [args.value]);

    return (
        // @ts-ignore
        <Switch {...args} value={value} onChange={setValue} />
    );
}

export const Default = Template.bind({});

Default.args = {
    value: false,
    label: 'Do you want this?',
    required: true
};

export const DarkTheme: Story = (args) => {

    const [value, setValue] = useState(args.value ?? false);

    useEffect(() => {
        setValue(args.value);
    }, [args.value]);

    return (
        <ThemeContext isDarkTheme>
            <div className="bg-gray-900 p-4" style={{ background: 'black', padding: '1rem' }}>
                {/*// @ts-ignore*/}
                <Switch {...args} value={value} onChange={setValue}  />
            </div>
        </ThemeContext>
    );
}

DarkTheme.args = {
    value: true,
    label: 'Do you want this?',
    required: true
};
