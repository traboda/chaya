import React, { useEffect, useState } from 'react';

import { addDecorator, Meta, Story } from '@storybook/react';
import { Drawer } from '../src';
import ThemeContext from "../src/ThemeProvider";
addDecorator((story) => (
    <ThemeContext>
        {story()}
    </ThemeContext>
));

const meta: Meta = {
    title: 'Drawer',
    component: Drawer,
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

const Template: Story = args => {
    const [isOpen, setIsOpen] = useState(args.isOpen);

    useEffect(() => {
        setIsOpen(args.isOpen);
    }, [args.isOpen]);

    return (
        <div>
            {Array(8).fill(lorem).map(l => <p>{l}</p>)}

            {/* @ts-ignore */}
            <Drawer {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
                {Array(1).fill(lorem).map(l => <p>{l}</p>)}
            </Drawer>
        </div>
    );
}

export const Default = Template.bind({});

Default.args = {};
