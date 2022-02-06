import React from 'react';

import { Meta, Story } from '@storybook/react';
import { Modal } from '../src';
import ThemeContext from "../src/ThemeProvider";

const meta: Meta = {
    title: 'Modal',
    component: Modal,
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

const lorem = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad architecto aut consequuntur dignissimos, distinctio
            ea error magnam molestias nam quaerat qui quia ullam voluptate. Aperiam eaque est facere facilis incidunt ipsum
            iste itaque magnam minus nisi, nobis non nulla reiciendis suscipit tempore, temporibus ut veniam voluptatem?
            Aliquid explicabo, fuga iusto nam porro temporibus tenetur velit! Dicta, quis sint! Commodi consequatur cum
            deleniti dolores, quam reiciendis. Accusamus amet cum debitis, eos eum ipsam itaque modi quis repellendus
            voluptas! Consequatur, deleniti dolore eius eligendi eos excepturi fugit illum magnam molestias mollitia natus
            nemo non pariatur provident quas, reiciendis saepe similique temporibus veritatis.`;

const Template: Story = args => (
    <ThemeContext>
        {Array(8).fill(lorem).map(l => <p>{l}</p>)}

        {/* @ts-ignore */}
        <Modal {...args}>
            <h1>Hello World</h1>
            <p>{lorem}</p>
        </Modal>
    </ThemeContext>
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
    isOpen: true,
    contentClassName: 'p-4'
};
