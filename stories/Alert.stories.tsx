import React from 'react';

import { addDecorator, Meta, Story } from '@storybook/react';
import {Alert} from '../src';
import ThemeContext from "../src/ThemeProvider";
addDecorator((story) => (
    <ThemeContext>
        {story()}
    </ThemeContext>
));

const meta: Meta = {
    title: 'Alert',
    component: Alert,
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

const Template: Story = args => <Alert {...args} />;

export const Default = Template.bind({});

Default.args = {
    title: 'Your account is about to expire. Renew your subscription now!',
    variant: 'warning',
};


export const WithButton = Template.bind({});

WithButton.args = {
    title: 'Your account is about to expire. Renew your subscription now!',
    variant: 'warning',
    allowDismissal: true,
    primaryButton: {
        text: 'Renew',
        onClick: () => {
            alert('Renew clicked');
        },
    },
    secondaryButton: {
        text: 'Cancel',
        onClick: () => {
            alert('Cancel clicked');
        },
    },
};

