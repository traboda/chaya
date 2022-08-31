import React from 'react';

import { Meta, Story, addDecorator } from '@storybook/react';

import { Avatar } from '../src';
import ThemeContextDecorator from "../src/themeDecorator";

addDecorator(ThemeContextDecorator);

const meta: Meta = {
    title: 'Basic Elements/Avatar',
    component: Avatar,
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;

const Template: Story = args => (
    <div className="flex flex-col justify-center items-center bg-gray-100 p-30" style={{minHeight: '35vh'}}>
        {/*// @ts-ignore*/}
        <Avatar {...args}/>
    </div>
);

export const Username_Only = Template.bind({
    args: {
        size: "70",
        alt: "Lorem Ipsum"
    }
});

Username_Only.args = {
    size: "70",
    alt: "Lorem Ipsum"
};

export const with_Profile_Image = Template.bind({});

with_Profile_Image.args = {
    size: 70,
    alt: "Lorem Ipsum",
    src: "https://images.unsplash.com/photo-1443926818681-717d074a57af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
}