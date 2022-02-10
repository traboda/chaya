import React, { ChangeEvent, useState } from 'react'

import { Meta, Story, addDecorator } from '@storybook/react';
import { useInterval } from '../src';
import ThemeContext from "../src/ThemeProvider";
addDecorator((story) => (
    <ThemeContext>
        {story()}
    </ThemeContext>
));

const meta: Meta = {
    title: 'Hooks / useInterval',
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;

const Template: Story = () => {

    const [count, setCount] = useState<number>(0)
    const [delay, setDelay] = useState<number>(1000)
    const [isPlaying, setPlaying] = useState<boolean>(false)

    useInterval(
        () => {
            setCount(count + 1)
        },
        // Delay in milliseconds or null to stop it
        isPlaying ? delay : null,
    )

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDelay(Number(event.target.value))
    }

    return (
        <div className='flex flex-col justify-center items-center bg-gray-100 py-10' style={{minHeight: '40vh'}}>
            <div className='pb-6'><h1 className='text-3xl bg-indigo-600 text-white p-3 rounded font-bold'>{count}</h1></div>
            <button className='bg-yellow-500 font-bold py-1 px-3 text-white rounded m-2' onClick={() => setPlaying(!isPlaying)}>
                {isPlaying ? 'pause' : 'play'}
            </button>
            <button className='bg-red-900 font-bold py-1 px-3 text-white rounded m-2' onClick={() => setCount(0)}>
                reset
            </button>
            <p className='bg-green-600 font-bold py-0 px-3 text-white rounded m-2'>
                <label htmlFor="delay">Delay : </label>
                <input
                    className='p-2 ml-2 text-black'
                    type="number"
                    name="delay"
                    onChange={handleChange}
                    value={delay}
                />
            </p>
        </div>
    )
}

export const Default = Template.bind({});