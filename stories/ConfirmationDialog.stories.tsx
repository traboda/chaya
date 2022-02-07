import React from 'react';

import { Meta, Story } from '@storybook/react';
import { ConfirmationDialog } from '../src';
import ThemeContext from "../src/ThemeProvider";

const meta: Meta = {
    title: 'Confirmation Dialog',
    component: ConfirmationDialog,
};

export default meta;

const Template: Story = args => {

    const [isOpen, setIsOpen] = React.useState(args.isOpen);

    React.useEffect(() => {
        setIsOpen(args.isOpen);
    }, [args.isOpen]);

    return (
        <ThemeContext>
            <button onClick={() => setIsOpen(true)}>Open</button>
            <ConfirmationDialog
                isOpen={isOpen}
                onCancel={() => setIsOpen(false)}
                onConfirm={() => setIsOpen(false)}
                {...args}
            />
        </ThemeContext>
    );
}

export const Default = Template.bind({});

Default.args = {
    isOpen: true
};

