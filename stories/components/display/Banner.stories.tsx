import React from 'react';
import { Meta, StoryObj } from '@storybook/react';

import { Banner, BannerProps } from '../../../src';

const meta: Meta<BannerProps> = {
  title: 'Components/Display/Banner',
  component: Banner,
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

export default meta;

type Story = StoryObj<BannerProps>;

export const Primary: Story = {
  args: {
    variant: 'float',
    position: 'inline',
    learnMore: {
      link: '',
      text: 'Learn More',
    },
    className: 'w-full',
    allowDismissal: true,
    icon: 'ri-home-line',
    text: 'This is example text for the banner. Give your own text here.',
  },
};

export const CardVariant: Story = {
  args: {
    variant: 'card',
    learnMore: {
      link: '',
      text: 'Learn More',
    },
    className: 'w-full',
    allowDismissal: true,
    icon: 'ri-home-line',
    text: 'This is example text for the banner. Give your own text here.',
  },
};

export const FullWidthVariant: Story = {
  args: {
    variant: 'full-width',
    learnMore: {
      link: '',
      text: 'Learn More',
    },
    className: 'w-full',
    allowDismissal: true,
    icon: 'ri-home-line',
    text: 'This is example text for the banner. Give your own text here.',
  },
};


// const Template: Story<BannerProps> = args => (
//   <div style={{ maxWidth: '100%', height: '1000px' }}>
//     <Banner {...args} >
//       <button className="bg-indigo-500 px-5 py-2 text-white rounded-md hover:bg-indigo-700 focus:outline-none">Button</button>
//     </Banner>
//   </div>
// );
//
// export const Default = Template.bind({});
//
// Default.args = {
//   variant: 'full-width',
//   position: 'bottom',
//   learnMore: {
//     link: '',
//     text: 'Learn More',
//   },
//   className: 'w-full',
//   allowDismissal: true,
//   icon: 'chevronUp',
//   color: 'danger',
//   text: 'This is example text for the banner. Give your own text here.',
// };