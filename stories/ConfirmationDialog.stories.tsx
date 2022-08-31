import React from 'react';

import { Meta, Story, addDecorator } from '@storybook/react';
import { ConfirmationDialog } from '../src';
import ThemeContextDecorator from "../src/themeDecorator";

addDecorator(ThemeContextDecorator);

const meta: Meta = {
    title: 'Overlays/Confirmation Dialog',
    component: ConfirmationDialog,
};

export default meta;

const Template: Story = args => {

    const [isOpen, setIsOpen] = React.useState(args.isOpen);

    React.useEffect(() => {
        setIsOpen(args.isOpen);
    }, [args.isOpen]);

    return (
        <div>
            <button onClick={() => setIsOpen(true)}>Open</button>
            <ConfirmationDialog
                isOpen={isOpen}
                onCancel={() => setIsOpen(false)}
                onConfirm={() => setIsOpen(false)}
                {...args}
            />
        </div>
    );
}

export const Default = Template.bind({});

Default.args = {
    isOpen: true
};

