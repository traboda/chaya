import React from 'react';

import { Meta, Story, addDecorator } from '@storybook/react';
import { PageHeader, Button } from '../src';
import ThemeContextDecorator from "../src/themeDecorator";

addDecorator(ThemeContextDecorator);

const meta: Meta = {
    title: 'Layouts/Page Header',
    component: PageHeader,
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;

const Template: Story = args => (<PageHeader {...args} />);

export const Default = Template.bind({});

Default.args = {
    title: 'Hello World!',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad architecto aut consequuntur dignissimos.',
    breadcrumbItems: [
        {
            title: 'Page 1',
            link: '#/page1',
        },
        {
            title: 'Page 2',
            link: '#/page1/page2',
        }
    ]
};

const Custom_Template: Story = args => (<PageHeader {...args} />);

export const Custom_Desgin = Custom_Template.bind({});

Custom_Desgin.args = {
    title: 'Edit Profile',
    description: 'Update your profile details.',
    breadcrumbItems: [
        {
            title: 'Profile',
            link: '#/profile',
        },
        {
            title: 'Edit',
            link: '#/profile/edit',
        }
    ],
    className: 'bg-blue-700 text-white rounded-xl',
    headingClassName: 'border-l-8 border-green-400 pl-4',
    customRender: () => (
        <div className='flex flex-row items-center mt-8'>
            <div className='bg-white m-2 rounded py-1 cursor-pointer px-3 text-blue-900 font-bold border-2 border-blue-900'>Item 1</div>-
            <div className='bg-white m-2 rounded py-1 cursor-pointer px-3 text-blue-900 font-bold border-2 border-blue-900'>Item 2</div>-
            <div className='bg-white m-2 rounded py-1 cursor-pointer px-3 text-blue-900 font-bold border-2 border-blue-900'>Item 3</div>
        </div>),
    sidebarRenderer: () => (
        <div>
            <Button>Siderbar Button</Button>
        </div>)
};