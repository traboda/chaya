import React, {useEffect} from 'react'

import { Meta, Story, addDecorator } from '@storybook/react';
import {useCountdown} from '../src';
import ThemeContext from "../src/ThemeProvider";

addDecorator((story) => (
    <ThemeContext>
        {story()}
    </ThemeContext>
));

const meta: Meta = {
    title: 'Hooks/useCountdown',
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;

const Template: Story = (args) => {

    const [delta, { setDate }] = useCountdown({ date: args.date });

    useEffect(() => {
        setDate(args.date);
    }, [args])

    return (
        <div>
            <div className='pb-6'>
                <div className="text-lg">
                    <span><b className="font-mono text-2xl color-secondary">{delta.days}</b> Days </span>
                    <span><b className="font-mono text-2xl color-secondary">{delta.hours}</b> Hours </span>
                    <span><b className="font-mono text-2xl color-secondary">{delta.minutes}</b> Minutes </span>
                    <span><b className="font-mono text-2xl color-secondary">{delta.seconds}</b> Seconds </span>
                </div>
            </div>
        </div>
    )
}

export const Default = Template.bind({});

Default.args = {
    date: new Date(Date.now() + (1000 * 60 * 60 * 24))
}