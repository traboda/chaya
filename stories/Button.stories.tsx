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
    <div className="flex flex-col justify-center items-center gap-4 py-4">
        <div className="flex gap-2">
            <Button {...args} variant="solid" color="primary"/>
            <Button {...args} variant="solid" color="secondary"/>
            <Button {...args} variant="solid" color="success"/>
            <Button {...args} variant="solid" color="warning"/>
            <Button {...args} variant="solid" color="danger"/>
            <Button {...args} variant="solid" color="contrast"/>
            <Button {...args} variant="solid" color="shade"/>
        </div>
        <div className="flex gap-2">
            <Button {...args} variant="outline" color="primary"/>
            <Button {...args} variant="outline" color="secondary"/>
            <Button {...args} variant="outline" color="success"/>
            <Button {...args} variant="outline" color="warning"/>
            <Button {...args} variant="outline" color="danger"/>
            <Button {...args} variant="outline" color="contrast"/>
            <Button {...args} variant="outline" color="shade"/>
        </div>

        <div className="flex gap-2">
            <Button {...args} variant="minimal" color="primary"/>
            <Button {...args} variant="minimal" color="secondary"/>
            <Button {...args} variant="minimal" color="success"/>
            <Button {...args} variant="minimal" color="warning"/>
            <Button {...args} variant="minimal" color="danger"/>
            <Button {...args} variant="minimal" color="contrast"/>
            <Button {...args} variant="minimal" color="shade"/>
        </div>

        <div className="flex gap-2">
            <Button {...args} variant="link" color="primary"/>
            <Button {...args} variant="link" color="secondary"/>
            <Button {...args} variant="link" color="success"/>
            <Button {...args} variant="link" color="warning"/>
            <Button {...args} variant="link" color="danger"/>
            <Button {...args} variant="link" color="contrast"/>
            <Button {...args} variant="link" color="shade"/>
        </div>
    </div>
);

export const ColorVariants = Vars.bind({});


ColorVariants.args = {
    children: "Press here",
};


const DarkVars: Story = args => (
    <ThemeContext isDarkTheme>
        <div className="bg-gray-900 flex justify-center items-center p-4 h-72">
            <div className="flex flex-col justify-center items-center gap-4 py-4">
                <div className="flex gap-2">
                    <Button {...args} variant="solid" color="primary"/>
                    <Button {...args} variant="solid" color="secondary"/>
                    <Button {...args} variant="solid" color="success"/>
                    <Button {...args} variant="solid" color="warning"/>
                    <Button {...args} variant="solid" color="danger"/>
                    <Button {...args} variant="solid" color="contrast"/>
                    <Button {...args} variant="solid" color="shade"/>
                </div>
                <div className="flex gap-2">
                    <Button {...args} variant="outline" color="primary"/>
                    <Button {...args} variant="outline" color="secondary"/>
                    <Button {...args} variant="outline" color="success"/>
                    <Button {...args} variant="outline" color="warning"/>
                    <Button {...args} variant="outline" color="danger"/>
                    <Button {...args} variant="outline" color="contrast"/>
                    <Button {...args} variant="outline" color="shade"/>
                </div>

                <div className="flex gap-2">
                    <Button {...args} variant="minimal" color="primary"/>
                    <Button {...args} variant="minimal" color="secondary"/>
                    <Button {...args} variant="minimal" color="success"/>
                    <Button {...args} variant="minimal" color="warning"/>
                    <Button {...args} variant="minimal" color="danger"/>
                    <Button {...args} variant="minimal" color="contrast"/>
                    <Button {...args} variant="minimal" color="shade"/>
                </div>

                <div className="flex gap-2">
                    <Button {...args} variant="link" color="primary"/>
                    <Button {...args} variant="link" color="secondary"/>
                    <Button {...args} variant="link" color="success"/>
                    <Button {...args} variant="link" color="warning"/>
                    <Button {...args} variant="link" color="danger"/>
                    <Button {...args} variant="link" color="contrast"/>
                    <Button {...args} variant="link" color="shade"/>
                </div>
            </div>
        </div>
    </ThemeContext>
);

export const DarkThemeVariants = DarkVars.bind({});


DarkThemeVariants.args = {
    children: "Press here",
};


const SizeVars: Story = args => (
    <div className="flex flex-col justify-center items-center bg-gray-200 gap-4 py-4" style={{ minHeight: '25vh' }}>
        <div>
            <Button {...args} size="xs" />
            <Button {...args} size="sm" />
            <Button {...args} size="md" />
            <Button {...args} size="lg" />
            <Button {...args} size="xl" />
        </div>
    </div>
);

export const SizeVariants = SizeVars.bind({});


SizeVariants.args = {
    children: "Press here",
};