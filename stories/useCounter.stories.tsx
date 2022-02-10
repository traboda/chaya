import React from 'react'

import { Meta, Story, addDecorator } from '@storybook/react';
import { useCounter } from '../src';
import ThemeContext from "../src/ThemeProvider";
addDecorator((story) => (
    <ThemeContext>
        {story()}
    </ThemeContext>
));

const meta: Meta = {
    title: 'Hooks / useCounter',
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;

const Template: Story = args => {

    const { count, setCount, increment, decrement, reset } = useCounter(args?.defaultValue || 0)

    const multiplyBy2 = () => setCount(x => x * 2)

    return (
            <div className='flex flex-col justify-center items-center bg-gray-100 py-10' style={{minHeight: '40vh'}}>
                <div className='pb-6'>
                    <p>Count:
                        <span className='ml-2 text-3xl bg-indigo-600 text-white py-1 px-2 rounded font-bold'>
                            {count}
                        </span>
                    </p>
                </div>
                <div>
                    <button className='bg-green-600 font-bold py-0 px-3 text-white rounded m-2' onClick={increment}>+</button>
                    <button className='bg-red-600 font-bold py-0 px-3 text-white rounded m-2' onClick={decrement}>-</button>
                    <button className='bg-blue-600 font-bold py-0 px-3 text-white rounded m-2' onClick={reset}>Reset</button>
                    <button className='bg-yellow-600 font-bold py-0 px-3 text-white rounded m-2' onClick={multiplyBy2}>x2</button>
                </div>
            </div>
    )
}

export const Default = Template.bind({});

Default.args = {
    defaultValue: 20
}