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
        maxWidth: {
            control: {
                type: 'range',
                min: 0,
                max: 1000,
                step: 10,
            },
        },
        minHeight: {
            control: {
                type: 'range',
                min: 0,
                max: 500,
                step: 10,
            },
        },
        maxHeight: {
            control: {
                type: 'range',
                min: 0,
                max: 500,
                step: 10,
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

const Template: Story = args => {

    const [isOpen, setIsOpen] = React.useState(args.isOpen);

    React.useEffect(() => {
        setIsOpen(args.isOpen);
    }, [args.isOpen]);

    return (
        <ThemeContext>
            <button onClick={() => setIsOpen(true)}>
                open
            </button>
            {Array(8).fill(lorem).map(l => <p>{l}</p>)}
            {/* @ts-ignore */}
            <Modal
                {...args}
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false)
                }}
            >
                <p>{lorem}</p>
            </Modal>
        </ThemeContext>
    );
}

export const Default = Template.bind({});

Default.args = {
    isOpen: true,
    onClose: () => {},
    title: 'Create Challenge',
    contentClassName: 'p-4'
};

export const WithButtons = Template.bind({});

WithButtons.args = {
    isOpen: true,
    onClose: () => {},
    title: 'Create Challenge',
    contentClassName: 'p-4',
    primaryButton: {
        text: 'Create',
        onClick: () => {
            console.log('create')
        }
    },
    secondaryButton: {
        text: 'Cancel',
        onClick: () => {
            console.log('cancel')
        }
    }
};

