import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Button, HoverCard } from '../../../src';

const meta: Meta = {
  title: 'Components/Overlays/HoverCard',
  component: HoverCard,
  parameters: {
    backgrounds: {},
    controls: { expanded: true },
  },
};

export default meta;


const Card = () => (
  <figure className="rounded-lg p-8">
    <img
      className="w-24 h-24 rounded-full mx-auto"
      src="https://fakeface.rest/face/view"
      alt=""
      width="384"
      height="512"
    />
    <div className="pt-6 text-center space-y-4">
      <blockquote>
        <p className="text-lg font-medium">
          “Lorem ipsum dolor sit amet, ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.”
        </p>
      </blockquote>
      <figcaption className="font-medium">
        <div className="text-primary">
          Jane Doe
        </div>
        <div className="text-color opacity-50">
          Staff Engineer, Algolia
        </div>
      </figcaption>
    </div>
  </figure>

);

const Template: Story = args => (
  <div className="fixed top-1/2 left-0 w-full h-full">
    <div className="fixed top-0 left-0">
      <HoverCard cardRenderer={<Card />} {...args}>
        <Button className="text-white">Hover Top-Left</Button>
      </HoverCard>
    </div>
    <div className="fixed top-0 right-0">
      <HoverCard cardRenderer={<Card />} {...args}>

        <button className="text-white">Hover Here</button>
      </HoverCard>
    </div>
    <div className="fixed bottom-0 right-0">
      <HoverCard cardRenderer={<Card />} {...args}>
        <button>Hover Here</button>
      </HoverCard>
    </div>
    <div className="fixed bottom-0 left-0">
      <HoverCard
        className="text-white !bg-amber-300"
        children={<div className="text-white">Hover Here</div>}
        cardRenderer={<Card />}
        {...args}
      />
    </div>
    <div className="fixed top-3/4 left-1/2">
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
