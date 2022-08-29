import React, { useEffect, useState } from 'react';

import {addDecorator, Meta, Story} from '@storybook/react';
import { TagSelector } from "../src";
import ThemeContextDecorator from "../src/themeDecorator";

addDecorator(ThemeContextDecorator);

const meta: Meta = {
    title: 'User Inputs/Tag Selector',
    component: TagSelector,
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;

const Template: Story = args => {
    const [value, setValue] = useState(args.value);

    useEffect(() => {
        setValue(args.value);
    }, [args.value])

    return (
        // @ts-ignore
        <TagSelector {...args} value={value} onChange={setValue} />
    );
};

export const Default = Template.bind({});

Default.args = {
    value: null,
    options: [
        {
            label: 'Item 1',
            value: 'tab 1'
        },
        {
            label: 'Item 2',
            value: 'tab 2'
        },
        {
            label: 'Item 3',
            value: 'tab 3'
        },
        {
            label: 'Item 4',
            value: 'tab 4'
        }
    ]
};