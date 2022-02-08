import React, {useState} from 'react';

import { addDecorator, Meta, Story } from '@storybook/react';
import { Dropdown } from '../src';
import ThemeContext from "../src/ThemeProvider";
addDecorator((story) => (
    <ThemeContext>
        {story()}
    </ThemeContext>
));

const meta: Meta = {
    title: 'Dropdown',
    component: Dropdown,
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;

const Template: Story = args => {

    const [isOpen, setIsOpen] = useState(false);

    React.useEffect(() => {
        setIsOpen(args.isOpen);
    }, [args.isOpen]);

    return (
        <div className='bg-gray-200 flex pt-10 items-center flex-col' style={{minHeight: "90vh"}}>
            <button
                onMouseEnter={()=> args.showOnHover && setIsOpen(true)}
                onClick={() => setIsOpen(!isOpen)}
                className='py-1 rounded-md px-3 bg-blue-700 text-white font-bold'
            >
                open
            </button>
            <Dropdown
                isOpen={isOpen}
                onClose={() => {
                    setIsOpen(false)
                }}
                {...args}
            />
        </div>
)};

export const Default = Template.bind({});

Default.args = {
    showOnHover: false,
    className: '',
    items: [
        {
            'icon': 'fa fa-wallet',
            'title': 'Item 1 with click',
            onClick: () => {
                // setIsOpen(false);
            }
        },
        {
            'icon': 'fa fa-edit',
            'title': 'Item 2 with link',
            'link': '#/item/link'
        },
        {
            'icon': 'fa fa-cog',
            'title': 'Item 3 with renderer',
            renderer: () => (
                <div>
                    Custom renderer based component
                </div>
            )
        },
        {
            'icon': 'fa fa-edit',
            'title': 'Item 4 custom styling',
            'className': 'bg-red-300',
            'link': '#/item/link'
        },
    ]
};
