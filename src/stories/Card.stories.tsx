import React from 'react';
import { Meta, Story } from '@storybook/react';

import {
  Card,
  Button,
  TextInput,
  PinInput,
  SearchBox,
  SelectorButton,
  SimpleSelect,
  Switch,
  TagSelector, PageNavigator, Badge,
} from '../index';

const meta: Meta = {
  title: 'Basic Elements/Card',
  component: Card,
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

const Template: Story = args => (
  <Card {...args}>
    {args.children}
    <Card
      description="Set start time and end time for the CTF, which will determine the duration in which the CTF will be active. This is the time when public challenges will be released to participants, when deployments can be accessed and flags can be submitted."
      sidebarRenderer={<Button size="sm" className="dsr-w-full dsr-whitespace-nowrap" leftIcon="info">Learn More</Button>}
      title="Child Title"
    >
      <h1>Child Card (content)</h1>
      <Card className="dsr-mt-4" title="Grand child Title">
        <h1>Grand Child Card (content)</h1>
      </Card>
    </Card>
  </Card>
);

export const Default = Template.bind({});

Default.args = {
  title: 'Hello World',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  className: 'dsr-m-10',
};

const DesignTemplate: Story = args => (
  // @ts-ignore
  <Card {...args}>
    {args.children}
    <Button className="dsr-mt-10" color="primary">Press here</Button>
  </Card>
);

export const ShadedCard = DesignTemplate.bind({});

ShadedCard.args = {
  title: 'Card Design',
  description: 'The following settings can be customized to make the card even more awesome.',
  className: 'dsr-px-20 dsr-py-12 dsr-m-10',
};

export const OutlinedCard = DesignTemplate.bind({});

OutlinedCard.args = {
  title: 'Card Design',
  variant: 'outline',
  description: 'The following settings can be customized to make the card even more awesome.',
  className: 'dsr-px-20 dsr-py-12 dsr-m-10',
};


const HeightPreviewCardTemplate: Story = () => (
  // @ts-ignore
  <div background="#111">
    <div className="dsr-flex dsr-flex-wrap dsr-items-end">
      <div className="dsr-w-1/4 dsr-p-1">
        {/*// @ts-ignore*/}
        <TextInput label="hello" />
      </div>
      <div className="dsr-w-1/4 dsr-p-1">
        {/*// @ts-ignore*/}
        <PinInput labels={{ label: 'hello' }} />
      </div>
      <div className="dsr-w-1/4 dsr-p-1">
        <SearchBox keyword="abc" setKeyword={() => {}} />
      </div>
      <div className="dsr-w-1/4 dsr-p-1">
        <SelectorButton name="hello" options={[{ label: 'hello', value: 'hello' }]} />
      </div>
      <div className="dsr-w-1/4 dsr-p-1">
        {/*// @ts-ignore*/}
        <TextInput label="hello" type="password" />
      </div>
      <div className="dsr-w-1/4 dsr-p-1">
        {/*// @ts-ignore*/}
        <PinInput variant="classic" labels={{ label: 'hello' }} />
      </div>
      <div className="dsr-w-1/4 dsr-p-1">
        <SimpleSelect value="hello" name="hello" options={[{ label: 'hello', value: 'hello' }]} labels={{ label: 'hello' }} />
      </div>
      <div className="dsr-w-1/4 dsr-p-1">
        {/*// @ts-ignore*/}
        <Switch label="hello" />
      </div>
      <div className="dsr-w-1/4 dsr-p-1">
        {/*// @ts-ignore*/}
        <TextInput label="hello" type="textarea" rows={1} />
      </div>
      <div className="dsr-w-1/4 dsr-p-1">
        {/*// @ts-ignore*/}
        <TagSelector labels={{ title: 'hello' }} value="hello" options={[{ label: 'hello', value: 'hello' }, { label: 'bye', value: 'bye' }]} />
      </div>
      <div className="dsr-w-1/4 dsr-p-1">
        {/*// @ts-ignore*/}
        <TextInput label="hello" />
      </div>
      <div className="dsr-w-1/4 dsr-p-1">
        <Button>
          hi elllo
        </Button>
      </div>
      <div className="dsr-w-1/4 dsr-p-1">
        <PageNavigator
          page={1}
          itemsPerPage={30}
          totalCount={100}
          hideItemsPerPage
        />
      </div>
      <div className="dsr-w-1/8 dsr-p-1">
        <Button variant="outline">
          hi elllo
        </Button>
      </div>
      <div className="dsr-w-1/8 dsr-p-1">
        <Badge variant="outline" size="md">
          hi elllo
        </Badge>
      </div>
      <div className="dsr-w-1/4 dsr-p-1">
        {/*// @ts-ignore*/}
        <TextInput label="hello" />
      </div>
      <div className="dsr-w-1/4 dsr-p-1">
        <Card className="dsr-p-2" variant="outline">
          j1
        </Card>
      </div>
    </div>
  </div>
);
export const HeightPreviewCard = HeightPreviewCardTemplate.bind({});

HeightPreviewCard.args = {};
