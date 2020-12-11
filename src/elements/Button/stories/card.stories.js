import React from 'react';

import Button from '../index';
import StoryPreviewContainer from '../../../utils/StoryPreviewContainer';

export default {
  title: "Elements/Button",
  component: Button,
  argTypes: {
    theme: { control: { type: 'select', options: ['dark', 'light', 'color'] } },
    p: { control: { type: 'range', min: 0, max: 5, step: 1 } },
    m: { control: { type: 'range', min: 0, max: 5, step: 1 } },
    shadow: { control: { type: 'range', min: 1, max: 3, step: 1 } },
    px: { control: { type: 'range', min: 0, max: 5, step: 1 } },
    py: { control: { type: 'range', min: 0, max: 5, step: 1 } },
    mx: { control: { type: 'range', min: 0, max: 5, step: 1 } },
    my: { control: { type: 'range', min: 0, max: 5, step: 1 } },
    round: { control: { type: 'range', min: 0, max: 5, step: 1 } },
  },
};


const Template = (args) => {
  return <StoryPreviewContainer theme={args.theme}>
    <Button {...args} />
  </StoryPreviewContainer>;
}

export const SimpleButton = Template.bind({});
SimpleButton.args = {
  theme: 'dark', variant: 'primary', text: "Click Me", p: 3, px: null, py: null, round:2, shadow: 2
};
SimpleButton.storyName = 'Button';
