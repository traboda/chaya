import React, { useEffect, useState } from 'react';

import { addDecorator, Meta, Story } from '@storybook/react';
import { PinInput } from '../src';
import ThemeContext from "../src/ThemeProvider";
addDecorator((story) => (
    <ThemeContext>
        {story()}
    </ThemeContext>
));

const meta: Meta = {
    title: 'Pin Input',
    component: PinInput,
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
        <div style={{ width: '450px' }}>
            {/*// @ts-ignore*/}
            <PinInput {...args} value={value} onChange={setValue} />
        </div>
    );
}

export const Default = Template.bind({});