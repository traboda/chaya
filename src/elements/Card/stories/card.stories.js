import React from 'react';

import Card from '../index';
import StoryPreviewContainer from '../../../utils/StoryPreviewContainer';

export default {
  title: "Elements/Card",
  component: Card,
  argTypes: {
    bg: { control: 'color' },
    p: { control: { type: 'range', min: 0, max: 5, step: 1 } },
    m: { control: { type: 'range', min: 0, max: 5, step: 1 } },
    shadow: { control: { type: 'range', min: 1, max: 3, step: 1 } },
    px: { control: { type: 'range', min: 0, max: 5, step: 1 } },
    py: { control: { type: 'range', min: 0, max: 5, step: 1 } },
    mx: { control: { type: 'range', min: 0, max: 5, step: 1 } },
    my: { control: { type: 'range', min: 0, max: 5, step: 1 } },
  },
};


const Template = (args) => <StoryPreviewContainer>
  <Card {...args} />
</StoryPreviewContainer>;

export const SimpleCard = Template.bind({});
SimpleCard.args = {
  children: <h3>Simple Card</h3>,
  bg: '#fff', p:2, px: null, py: null
};
SimpleCard.storyName = 'Simple Card';

export const ShadowCard = Template.bind({});
ShadowCard.args = {
  children: <h3>Simple Card</h3>,
  bg: '#fff', p:2, px: null, py: null, shadow: 2, round: 2
};
ShadowCard.storyName = 'w/ Shadow';
