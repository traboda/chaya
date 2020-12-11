import React from 'react';

import TextInput from '../index';
import StoryPreviewContainer from '../../../utils/StoryPreviewContainer';

export default {
  title: "Elements/TextInput",
  component: TextInput,
  argTypes: {
    theme: { control: { type: 'select', options: ['dark', 'light', 'color'] } },
  },
};


const Template = (args) => {
  return <StoryPreviewContainer theme={args.theme}>
    <TextInput {...args} />
  </StoryPreviewContainer>;
}

export const SimpleTextInput = Template.bind({});
SimpleTextInput.args = {
  theme: 'dark',
  placeholder: "Enter Your Name",
  label: "Name"
};
SimpleTextInput.storyName = 'TextInput';
