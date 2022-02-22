import React from 'react';

import { Meta, Story, addDecorator } from '@storybook/react';
import { Button } from '../src';
import ThemeContext from "../src/ThemeProvider";

addDecorator((story) => (
    <ThemeContext>
        {story()}
    </ThemeContext>
));

const meta: Meta = {
    title: 'Basic Elements/Button',
    component: Button,
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

const Template: Story = args => (
    <div className="flex justify-center items-center">
        <Button {...args}/>
    </div>
);

export const Default = Template.bind({});

Default.args = {
    children: "Press here"
};


const Vars: Story = args => (
    <div className="flex flex-col justify-center items-center bg-gray-200 gap-4 py-4" style={{ minHeight: '25vh' }}>
        <div className="flex gap-4">
            <Button {...args} variant="solid" color="primary"/>
            <Button {...args} variant="solid" color="secondary"/>
            <Button {...args} variant="solid" color="success"/>
            <Button {...args} variant="solid" color="warning"/>
            <Button {...args} variant="solid" color="danger"/>
            <Button {...args} variant="solid" color="contrast"/>
        </div>

        <div className="flex gap-4">
            <Button {...args} variant="outline" color="primary"/>
            <Button {...args} variant="outline" color="secondary"/>
            <Button {...args} variant="outline" color="success"/>
            <Button {...args} variant="outline" color="warning"/>
            <Button {...args} variant="outline" color="danger"/>
            <Button {...args} variant="outline" color="contrast"/>
        </div>

        <div className="flex gap-4">
            <Button {...args} variant="minimal" color="primary"/>
            <Button {...args} variant="minimal" color="secondary"/>
            <Button {...args} variant="minimal" color="success"/>
            <Button {...args} variant="minimal" color="warning"/>
            <Button {...args} variant="minimal" color="danger"/>
            <Button {...args} variant="minimal" color="contrast"/>
        </div>

        <div className="flex gap-4">
            <Button {...args} variant="link" color="primary"/>
            <Button {...args} variant="link" color="secondary"/>
            <Button {...args} variant="link" color="success"/>
            <Button {...args} variant="link" color="warning"/>
            <Button {...args} variant="link" color="danger"/>
            <Button {...args} variant="link" color="contrast"/>
        </div>
    </div>
);

export const ColorVariants = Vars.bind({});


ColorVariants.args = {
    children: "Press here",
    className: 'px-4 py-3'
};