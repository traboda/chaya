import React from 'react'

import { Meta, Story, addDecorator } from '@storybook/react';
import { useBoolean } from '../src';
import ThemeContext from "../src/ThemeProvider";
addDecorator((story) => (
    <ThemeContext>
        {story()}
    </ThemeContext>
));

const meta: Meta = {
    title: 'Hooks / useBoolean',
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;

const Template: Story = () => {

    const { value, setValue, setTrue, setFalse, toggle } = useBoolean(false)
    const customToggle = () => setValue(x => !x)

    return (
            <div className='flex flex-col justify-center items-center bg-gray-100 py-10' style={{minHeight: '40vh'}}>
                <div className='pb-6'>
                    <p>Value:
                        <span className='ml-2 text-3xl bg-indigo-600 text-white py-1 px-2 rounded font-bold'>
                            {value.toString()}
                        </span>
                    </p>
                </div>
                <button className='bg-green-600 font-bold py-0 px-3 text-white rounded m-2' onClick={setTrue}>set true</button>
                <button className='bg-green-700 font-bold py-0 px-3 text-white rounded m-2' onClick={setFalse}>set false</button>
                <button className='bg-green-800 font-bold py-0 px-3 text-white rounded m-2' onClick={toggle}>toggle</button>
                <button className='bg-green-900 font-bold py-0 px-3 text-white rounded m-2' onClick={customToggle}>custom toggle</button>
            </div>
    )
}

export const Default = Template.bind({});