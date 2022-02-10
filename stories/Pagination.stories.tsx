import React, {useState} from 'react';

import { Meta, Story, addDecorator } from '@storybook/react';
import { Pagination } from '../src';
import ThemeContext from "../src/ThemeProvider";
addDecorator((story) => (
    <ThemeContext>
        {story()}
    </ThemeContext>
));

const meta: Meta = {
    title: 'Basic Elements/Pagination',
    component: Pagination,
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;

const Template: Story = args => {
    const [page, setPage] = useState(args.page ?? 1)
    const [itemsPerPage, setItemsPerPage] = useState(20);
    return (
        <div className="flex flex-col justify-center items-center bg-gray-100 p-30" style={{minHeight: '35vh'}}>
            <Pagination
                page={page}
                setPage={setPage}
                itemsPerPage={itemsPerPage}
                hideItemsPerPage={args.hideItemsPerPage}
                setItemsPerPage={setItemsPerPage}
                totalCount={args.totalCount}
                {...args}
            />
        </div>
    )
};

export const Default = Template.bind({});

Default.args = {
    totalCount: 200,
    hideItemsPerPage: true,
    btnClassName: 'bg-blue-900 text-white font-bold',
    activeBtnClassName: 'border-2 border-blue-900 text-blue-900 hover:bg-gray-300'
}