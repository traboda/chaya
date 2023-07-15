import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Button, HoverCard } from '../../../index';

const meta: Meta = {
  title: 'Overlays/HoverCard',
  component: HoverCard,
  parameters: {
    backgrounds: {},
    controls: { expanded: true },
  },
};

export default meta;


const Card = () => (
  <figure className="dsr-rounded-lg dsr-p-8">
    <img
      className="dsr-w-24 dsr-h-24 dsr-rounded-full dsr-mx-auto"
      src="https://fakeface.rest/face/view"
      alt=""
      width="384"
      height="512"
    />
    <div className="dsr-pt-6 dsr-text-center dsr-space-y-4">
      <blockquote>
        <p className="dsr-text-lg dsr-font-medium">
          “Lorem ipsum dolor sit amet, ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.”
        </p>
      </blockquote>
      <figcaption className="dsr-font-medium">
        <div className="dsr-text-primary">
          Jane Doe
        </div>
        <div className="dsr-text-color dsr-opacity-50">
          Staff Engineer, Algolia
        </div>
      </figcaption>
    </div>
  </figure>

);

const Template: Story = args => (
  <div className="dsr-fixed dsr-top-1/2 dsr-left-0 dsr-w-full dsr-h-full">
    <div className="dsr-fixed dsr-top-0 dsr-left-0">
      <HoverCard cardRenderer={<Card />} {...args}>
        <Button className="text-white">Hover Top-Left</Button>
      </HoverCard>
    </div>
    <div className="dsr-fixed dsr-top-0 dsr-right-0">
      <HoverCard cardRenderer={<Card />} {...args}>

        <button className="text-white">Hover Here</button>
      </HoverCard>
    </div>
    <div className="dsr-fixed dsr-bottom-0 dsr-right-0">
      <HoverCard cardRenderer={<Card />} {...args}>
        <button>Hover Here</button>
      </HoverCard>
    </div>
    <div className="dsr-fixed dsr-bottom-0 dsr-left-0">
      <HoverCard
        className="dsr-text-white !dsr-bg-amber-300"
        children={<div className="text-white">Hover Here</div>}
        cardRenderer={<Card />}
        {...args}
      />
    </div>
    <div className="dsr-fixed dsr-top-3/4 dsr-left-1/2">
      <HoverCard
        children={<div className="text-white">Hover Here</div>}
        cardRenderer={<Card />}
        {...args}
      />
    </div>

  </div>
);

export const Default = Template.bind({});

Default.args = {};
