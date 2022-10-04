import React from 'react';
import { Meta, Story, addDecorator } from '@storybook/react';
import { Breadcrumb } from '../src';
import ThemeContextDecorator from "../src/themeDecorator";

addDecorator(ThemeContextDecorator);

const meta: Meta = {
    title: 'Basic Elements/Breadcrumb',
    component: Breadcrumb,
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;

const Template: Story = args => (
    <div className="flex flex-col justify-center items-center bg-gray-100 p-30" style={{minHeight: '25vh'}}>
        {/*// @ts-ignore*/}
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