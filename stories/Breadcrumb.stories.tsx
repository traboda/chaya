import React from 'react';

import { Meta, Story, addDecorator } from '@storybook/react';
import { Breadcrumb } from '../src';
import ThemeContext from "../src/ThemeProvider";
addDecorator((story) => (
    <ThemeContext>
        {story()}
    </ThemeContext>
));
const meta: Meta = {
    title: 'Breadcrumb',
    component: Breadcrumb,
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;

const Template: Story = args => (
    <div className="flex flex-col justify-center items-center bg-gray-100 p-30" style={{minHeight: '95vh'}}>
        <Breadcrumb {...args}/>
    </div>
);

export const Default = Template.bind({});

Default.args = {
    items: [
        {link:"#/",title:"home"},
        {link:"#/abc",title:"abc"},
        {link:"#/abc/efg",title:"efg"}
    ]
}

export const with_Link_Wrapper = Template.bind({});

with_Link_Wrapper.args = {
    items: [
        {link:"#/123",title:"123"},
        {link:"#/123/abc",title:"abc"},
        {link:"#/123/abc/efg",title:"efg"}
    ],
    linkWrapper: (link,component) => (
        <a href={link}>
            <div className="bg-blue-800 border-2 border-green-600 font-bold text-white rounded-xl px-3 py-0 inline-flex">
                {component}
            </div>
        </a>
    )
}