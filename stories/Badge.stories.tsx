import React from 'react';

import { Meta, Story, addDecorator } from '@storybook/react';
import { Badge } from '../src';
import ThemeContext from "../src/ThemeProvider";

addDecorator((story) => (
    <ThemeContext>
        {story()}
    </ThemeContext>
));

const meta: Meta = {
    title: 'Basic Elements/Badge',
    component: Badge,
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;

const Template: Story = args => (
    <div className="flex justify-center items-center">
        <Badge {...args}/>
    </div>
);

export const Default = Template.bind({});


const Vars: Story = args => (
    <div className="flex flex-col justify-center items-center gap-4 py-4">
        <div className="flex gap-2">
            <Badge {...args} variant="solid" color="primary"/>
            <Badge {...args} variant="solid" color="secondary"/>
            <Badge {...args} variant="solid" color="success"/>
            <Badge {...args} variant="solid" color="warning"/>
            <Badge {...args} variant="solid" color="danger"/>
            <Badge {...args} variant="solid" color="contrast"/>
            <Badge {...args} variant="solid" color="shade"/>
        </div>
        <div className="flex gap-2">
            <Badge {...args} variant="outline" color="primary"/>
            <Badge {...args} variant="outline" color="secondary"/>
            <Badge {...args} variant="outline" color="success"/>
            <Badge {...args} variant="outline" color="warning"/>
            <Badge {...args} variant="outline" color="danger"/>
            <Badge {...args} variant="outline" color="contrast"/>
            <Badge {...args} variant="outline" color="shade"/>
        </div>

        <div className="flex gap-2">
            <Badge {...args} variant="minimal" color="primary"/>
            <Badge {...args} variant="minimal" color="secondary"/>
            <Badge {...args} variant="minimal" color="success"/>
            <Badge {...args} variant="minimal" color="warning"/>
            <Badge {...args} variant="minimal" color="danger"/>
            <Badge {...args} variant="minimal" color="contrast"/>
            <Badge {...args} variant="minimal" color="shade"/>
        </div>

    </div>
);

export const ColorVariants = Vars.bind({});

ColorVariants.args = {
    text: "Hey",
    style: {margin: '5px'}
};


const DarkVars: Story = args => (
    <ThemeContext isDarkTheme>
        <div className="bg-gray-900 flex justify-center items-center p-4 h-72">
            <div className="flex flex-col justify-center items-center gap-4 py-4">
                <div className="flex gap-2">
                    <Badge {...args} variant="solid" color="primary"/>
                    <Badge {...args} variant="solid" color="secondary"/>
                    <Badge {...args} variant="solid" color="success"/>
                    <Badge {...args} variant="solid" color="warning"/>
                    <Badge {...args} variant="solid" color="danger"/>
                    <Badge {...args} variant="solid" color="contrast"/>
                    <Badge {...args} variant="solid" color="shade"/>
                </div>
                <div className="flex gap-2">
                    <Badge {...args} variant="outline" color="primary"/>
                    <Badge {...args} variant="outline" color="secondary"/>
                    <Badge {...args} variant="outline" color="success"/>
                    <Badge {...args} variant="outline" color="warning"/>
                    <Badge {...args} variant="outline" color="danger"/>
                    <Badge {...args} variant="outline" color="contrast"/>
                    <Badge {...args} variant="outline" color="shade"/>
                </div>

                <div className="flex gap-2">
                    <Badge {...args} variant="minimal" color="primary"/>
                    <Badge {...args} variant="minimal" color="secondary"/>
                    <Badge {...args} variant="minimal" color="success"/>
                    <Badge {...args} variant="minimal" color="warning"/>
                    <Badge {...args} variant="minimal" color="danger"/>
                    <Badge {...args} variant="minimal" color="contrast"/>
                    <Badge {...args} variant="minimal" color="shade"/>
                </div>

            </div>
        </div>
    </ThemeContext>
);

export const DarkThemeVariants = DarkVars.bind({});


DarkThemeVariants.args = {
    text: "Hello",
    style: {margin: '5px'}
};


const SizeVars: Story = args => (
    <div className="flex flex-col justify-center items-center gap-4 py-4" style={{ minHeight: '25vh' }}>
        <div>
            <Badge {...args} size="xs" />
            <Badge {...args} size="sm" />
            <Badge {...args} size="md" />
            <Badge {...args} size="lg" />
            <Badge {...args} size="xl" />
        </div>
    </div>
);

export const SizeVariants = SizeVars.bind({});


SizeVariants.args = {
    text: "New",
    style: {margin: '5px'}
};