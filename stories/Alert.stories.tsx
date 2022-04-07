import React from 'react';

import { addDecorator, Meta, Story } from '@storybook/react';
import {Alert, Modal} from '../src';
import ThemeContext from "../src/ThemeProvider";
addDecorator((story) => (
    <ThemeContext>
        {story()}
    </ThemeContext>
));

const meta: Meta = {
    title: 'Content Handlers/Alert',
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
        children: 'Renew',
        onClick: () => {
            alert('Renew clicked');
        },
    },
    secondaryButton: {
        children: 'Cancel',
        onClick: () => {
            alert('Cancel clicked');
        },
    },
};

const DarkTemplate: Story = args => (
    <ThemeContext isDarkTheme>
        <div style={{ background: 'black', padding: '2rem' }}>
            <Alert {...args} />
        </div>
    </ThemeContext>
);

export const DarkTheme = DarkTemplate.bind({});

DarkTheme.args = {
    title: 'Your account is about to expire. Renew your subscription now!',
    variant: 'warning',
    allowDismissal: true,
    primaryButton: {
        children: 'Renew',
        onClick: () => {
            alert('Renew clicked');
        },
    },
    secondaryButton: {
        children: 'Cancel',
        onClick: () => {
            alert('Cancel clicked');
        },
    },
};