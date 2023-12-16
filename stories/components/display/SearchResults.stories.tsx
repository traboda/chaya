import React from 'react';
import { Meta, Story } from '@storybook/react';

import { Card, SearchResults, SearchResultsProps } from '../../../src';

const meta: Meta = {
  title: 'Components/Display/SearchResults',
  component: SearchResults,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<SearchResultsProps> = args => (
  <div className="dsr-flex dsr-flex-col dar-justify-center dsr-items-center dsr-p-30">
    <Card>
      <div className="dsr-mb-2">
        Inside a Card
      </div>
      <SearchResults {...args} />
    </Card>
  </div>
);

export const Default = Template.bind({});


Default.args = {
  results: [
    {
      title: 'Traboda Arena',
      description: 'Arena is CTF platform that allows you to create your own CTFs.',
      link: 'https://arena.traboda.com',
      iconRenderer: <img src="https://chaya.traboda.com/chaya-icon.svg" />,
    },
    {
      title: 'Traboda Academy',
      description: 'Academy is hands-on cyber-security learning platform from Traboda',
      link: 'https://academy.traboda.com',
    },
    {
      title: 'Traboda Verifycate',
      description: 'Verifycate is a platform that allows organizers to create & share certificates in bulk.',
      link: 'https://verifycate.traboda.com',
    },
  ],
};

Default.args = {
  results: [
    {
      title: 'Traboda Arena',
      description: 'Arena is CTF platform that allows you to create your own CTFs.',
      link: 'https://arena.traboda.com',
      iconRenderer: <img src="https://chaya.traboda.com/chaya-icon.svg" />,
    },
    {
      title: 'Traboda Academy',
      description: 'Academy is hands-on cyber-security learning platform from Traboda',
      link: 'https://academy.traboda.com',
    },
    {
      title: 'Traboda Verifycate',
      description: 'Verifycate is a platform that allows organizers to create & share certificates in bulk.',
      link: 'https://verifycate.traboda.com',
    },
  ],
};