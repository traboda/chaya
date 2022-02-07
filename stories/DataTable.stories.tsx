import React from 'react';

import { addDecorator, Meta, Story } from '@storybook/react';
import { DataTable } from '../src';

import ThemeContext from "../src/ThemeProvider";
addDecorator((story) => (
    <ThemeContext>
        {story()}
    </ThemeContext>
));

const meta: Meta = {
    title: 'DataTable',
    component: DataTable,
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

const ITEMS = [
    {
        "id": "55",
        "name": "Attack matter ball budget pattern.",
        "points": 150,
        "difficultyLevel": {
            "label": "Beginner",
            "level": 1
        },
        "category": {
            "id": "11",
            "name": "Hardware",
            "slug": "hardware"
        }
    },
    {
        "id": "54",
        "name": "Low fall nor until receive.",
        "points": 150,
        "difficultyLevel": {
            "label": "Medium",
            "level": 3
        },
        "category": {
            "id": "11",
            "name": "Hardware",
            "slug": "hardware"
        }
    },
    {
        "id": "53",
        "name": "Everybody simple also.",
        "points": 150,
        "difficultyLevel": {
            "label": "Beginner",
            "level": 1
        },
        "category": {
            "id": "13",
            "name": "Pentesting",
            "slug": "pentesting"
        }
    },
    {
        "id": "52",
        "name": "Summer these group.",
        "points": 150,
        "difficultyLevel": {
            "label": "Expert",
            "level": 5
        },
        "category": {
            "id": "12",
            "name": "Reversing",
            "slug": "reversing"
        }
    },
    {
        "id": "51",
        "name": "News recent third environment.",
        "points": 150,
        "difficultyLevel": {
            "label": "Expert",
            "level": 5
        },
        "category": {
            "id": "14",
            "name": "Programming",
            "slug": "programming"
        }
    },
    {
        "id": "50",
        "name": "Support offer concern parent.",
        "points": 150,
        "difficultyLevel": {
            "label": "Easy",
            "level": 2
        },
        "category": {
            "id": "12",
            "name": "Reversing",
            "slug": "reversing"
        }
    },
    {
        "id": "49",
        "name": "Become hit order field indicate.",
        "points": 150,
        "difficultyLevel": {
            "label": "Easy",
            "level": 2
        },
        "category": {
            "id": "11",
            "name": "Hardware",
            "slug": "hardware"
        }
    },
    {
        "id": "48",
        "name": "Want win third myself.",
        "points": 150,
        "difficultyLevel": {
            "label": "Hard",
            "level": 4
        },
        "category": {
            "id": "15",
            "name": "Cryptography",
            "slug": "cryptography"
        }
    },
    {
        "id": "47",
        "name": "Level miss food plant back.",
        "points": 150,
        "difficultyLevel": {
            "label": "Medium",
            "level": 3
        },
        "category": {
            "id": "13",
            "name": "Pentesting",
            "slug": "pentesting"
        }
    },
    {
        "id": "46",
        "name": "Meet politics look fire usually.",
        "points": 150,
        "difficultyLevel": {
            "label": "Beginner",
            "level": 1
        },
        "category": {
            "id": "14",
            "name": "Programming",
            "slug": "programming"
        }
    }
]

export default meta;

const Template: Story = args => (
    <DataTable
        customTopBarRenderer={() => <div>Custom top bar</div>}
        items={ITEMS}
        maxHeight="380px"
        properties={[
            {
                'id': 'name',
                'label': 'Name',
                'space': '6',
                'fontSize': '1.5rem',
                'link': (i) => `/challenge/${i.id}`,
                'value': (i) => <div>
                    {i?.isSolved && <i className="fa fa-check text-green-500 mr-2" />}
                    {i.name}
                </div>,
                'className': 'rajdhani',
                'allowSort': true,
            },
            {
                'id': 'category',
                'label': 'Category',
                'value': (i) => i.category?.name,
                'className': 'rajdhani',
                'allowSort': true,
            },
            {
                'id': 'difficultyLevel',
                'label': 'Difficulty',
                'className': 'rajdhani',
                'value': (i) => i?.difficultyLevel?.label,
                'allowSort': true,
            },
            {
                'id': 'points',
                'label': 'Points',
                'fontSize': '1.75rem',
                'className': 'rajdhani',
                'value': (i) => `${i?.points ? i.points : i?.challenge?.points}`,
                'allowSort': true,
            },
            {
                'id': 'difficultyLevel',
                'label': 'Difficulty',
                'className': 'rajdhani',
                'value': (i) => i?.difficultyLevel?.label,
                'allowSort': true,
            },
            {
                'id': 'points',
                'label': 'Points',
                'fontSize': '1.75rem',
                'className': 'rajdhani',
                'value': (i) => `${i?.points ? i.points : i?.challenge?.points}`,
                'allowSort': true,
            },
            {
                'id': 'difficultyLevel',
                'label': 'Difficulty',
                'className': 'rajdhani',
                'value': (i) => i?.difficultyLevel?.label,
                'allowSort': true,
            },
            {
                'id': 'points',
                'label': 'Points',
                'fontSize': '1.75rem',
                'className': 'rajdhani',
                'value': (i) => `${i?.points ? i.points : i?.challenge?.points}`,
                'allowSort': true,
            },
        ]}
        {...args}
    />
);

export const Default = Template.bind({});

Default.args = {};